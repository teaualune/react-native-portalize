import {useEffect, useRef} from 'react';
import type {PortalizeHostProvider} from './HostFactory';
import type {PortalizeNode} from './Manager';

interface ConsumerProps extends PortalizeNode {
  hostProvider: PortalizeHostProvider | undefined;
}

export default function Consumer(props: ConsumerProps): null {
  const {hostProvider, ...node} = props;
  const key = useRef<string | undefined>(undefined);
  const mounted = useRef(false);

  useEffect(() => {
    if (key.current) {
      hostProvider?.update(key.current, node);
    }
  }, [hostProvider, node]);

  useEffect(() => {
    if (mounted.current || !hostProvider) return;
    mounted.current = true;
    key.current = hostProvider.mount(node);
  }, [hostProvider, node]);

  useEffect(
    () => () => {
      if (key.current) {
        hostProvider?.unmount(key.current);
      }
    },
    [hostProvider],
  );

  return null;
}
