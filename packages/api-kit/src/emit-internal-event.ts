import {service} from './internal-service';

const callPluginsService = service('PLUGINS', {port: 9006});

export interface PlatformEvent {
  tenant: string;
  user?: string;
  source: string;
  kind: string;
  eventName: string;
  description: string;
  metadata: any;
  created?: Date;
}

export function emitPlatformEvent(platformEvent: PlatformEvent) {
  return callPluginsService({
    method: 'POST',
    url: '/internal-api/events',
    data: platformEvent
  })
    .catch()
}
