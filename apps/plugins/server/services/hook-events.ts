import EventEmitter from 'events';
import {IEvent} from '../models/event';
import Plugin from '../models/plugin';
import {getPluginToken} from './tokens-management';
import {fetchPlugin} from './plugins-call';

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

  Promise.all(awaitedPlugins.map(async plugin => {
    const hooks: { hookUrl: string }[] = [];

    plugin.subscribedEvents.forEach(subscribedEvent => {
      let shouldHook = false;
      if (!subscribedEvent.eventName) {
        subscribedEvent.eventName = '*';
      }
      if (subscribedEvent.source && subscribedEvent.kind && subscribedEvent.eventName) { // plugin filled all values
        if (subscribedEvent.source === platformEvent.source &&
          (subscribedEvent.kind === platformEvent.kind || subscribedEvent.kind === '*') &&
          (subscribedEvent.eventName === '*' || subscribedEvent.eventName === platformEvent.eventName)) {
          shouldHook = true;
        }
      } else if (!subscribedEvent.source && subscribedEvent.kind === platformEvent.kind) { // no source, only kind
        shouldHook = true;
      } else if (!subscribedEvent.kind && subscribedEvent.source === platformEvent.source) { // only by source, no matter the kind
        shouldHook = true;
      }

      if (shouldHook) {
        hooks.push({hookUrl: subscribedEvent.hookUrl})
      }
    })

    if (hooks.length) {
      const accessToken = getPluginToken(plugin)

      hooks.forEach(({hookUrl}) => {
        return fetchPlugin({
          url: hookUrl,
          method: 'POST',
          tenant: plugin.tenant,
          accessToken,
          body: emittedEventContent
        }).catch(() => null);
      })
    }
  })).catch(() => null);
});
