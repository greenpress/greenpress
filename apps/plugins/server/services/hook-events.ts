import EventEmitter from 'events';
import {IEvent} from '../models/event';
import Plugin from '../models/plugin';
import fetch from 'node-fetch';

class HooksEmitter extends EventEmitter {
}

const hookEvents = new HooksEmitter();

export function emitPlatformEvent(event: IEvent) {
  hookEvents.emit('hook', event);
}

hookEvents.on('hook', async (platformEvent: IEvent) => {
  const awaitedPlugins = await Plugin.find({
    $and: [
      {tenant: platformEvent.tenant},
      {
        $or: [
          {'subscribedEvents.source': platformEvent.source},
          {'subscribedEvents.kind': platformEvent.kind},
          {'subscribedEvents.eventName': platformEvent.eventName},
        ]
      }
    ]
  }).lean();

  const emittedEventContent = JSON.stringify(platformEvent.toObject());

  awaitedPlugins.forEach(plugin => {
    const headers = {
      'x-tenant': plugin.tenant,
      'x-from': 'greenpress',
      'Authorization': 'Bearer ' + plugin.token,
      "Content-Type": "application/json",
    };
    plugin.subscribedEvents.forEach(subscribedEvent => {
      let shouldHook = false;
      if (!subscribedEvent.eventName) {
        subscribedEvent.eventName = '*';
      }
      if (subscribedEvent.source && subscribedEvent.kind && subscribedEvent.eventName) { // plugin filled all values
        if (subscribedEvent.source === platformEvent.source &&
          subscribedEvent.kind === platformEvent.kind &&
          (subscribedEvent.eventName === '*' || subscribedEvent.eventName === platformEvent.eventName)) {
          shouldHook = true;
        }
      } else if (!subscribedEvent.source && subscribedEvent.kind === platformEvent.kind) { // no source, only kind
        shouldHook = true;
      } else if (!subscribedEvent.kind && subscribedEvent.source === platformEvent.source) { // only by source, no matter the kind
        shouldHook = true;
      }

      if (shouldHook) {
        fetch(subscribedEvent.hookUrl, {
          method: 'POST',
          body: emittedEventContent,
          headers,
        }).catch(() => null);
      }
    })
  })
});
