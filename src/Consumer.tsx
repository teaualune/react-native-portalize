import * as React from 'react';

import { IProvider } from './Host';
import { IPortalNode } from './Manager';

interface IConsumerProps extends IPortalNode {
  manager: IProvider | null;
}

export const Consumer = (props: IConsumerProps): null => {
  const { manager, ...node } = props;
  const key = React.useRef<string | undefined>(undefined);

  const checkManager = (): void => {
    if (!manager) {
      throw new Error('No portal manager defined');
    }
  };

  const handleInit = (): void => {
    checkManager();
    key.current = manager?.mount(node);
  };

  React.useEffect(() => {
    checkManager();
    manager?.update(key.current, node);
  }, [manager, node]);

  React.useEffect(() => {
    handleInit();

    return (): void => {
      checkManager();
      manager?.unmount(key.current);
    };
  }, []);

  return null;
};
