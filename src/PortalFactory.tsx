import React from 'react';
import Consumer from './Consumer';
import type {PortalizeHostProvider} from './HostFactory';
import type {PortalizeNode} from './Manager';

export type PortalizePortalComponent = React.FC<PortalizeNode>;

export default function createPortalizedPortal(
  Context: React.Context<PortalizeHostProvider | undefined>,
  hostID: string,
): PortalizePortalComponent {
  const Portal = (props: PortalizeNode) => (
    <Context.Consumer>
      {hostProvider => (
        <Consumer hostProvider={hostProvider} order={props.order}>
          {props.children}
        </Consumer>
      )}
    </Context.Consumer>
  );

  Portal.displayName = `PortalizePortal_${hostID}`;

  return Portal;
}
