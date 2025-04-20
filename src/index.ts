import createPortalizeHost, {PortalizeHostFactory} from './HostFactory';
import createPortalizedPortal, {
  PortalizePortalComponent,
} from './PortalFactory';

const DEFAULT = 'DEFAULT';

const defaultHost = createPortalizeHost(DEFAULT);
const defaultPortal = createPortalizedPortal(defaultHost.Context, DEFAULT);

export const PortalizeHost = defaultHost.Host;
export const PortalizePortal = defaultPortal;

export function createPortal(hostID: string): {
  Host: PortalizeHostFactory['Host'];
  Portal: PortalizePortalComponent;
} {
  const host = createPortalizeHost(hostID);
  const Portal = createPortalizedPortal(host.Context, hostID);
  return {Host: host.Host, Portal};
}

export type {PortalizePortalComponent};
