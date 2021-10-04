import * as React from 'react';
import { View, ViewStyle } from 'react-native';

import { useKey } from './hooks/useKey';
import { Manager, IManagerHandles, IPortalNode } from './Manager';

interface IHostProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface IPortalAction {
  type: 'mount' | 'update' | 'unmount';
  key: string;
  node?: IPortalNode;
}

export interface IProvider {
  mount(children: React.ReactNode): string;
  update(key?: string, children?: React.ReactNode): void;
  unmount(key?: string): void;
}

export const Context = React.createContext<IProvider | null>(null);

export const Host = ({ children, style }: IHostProps): JSX.Element => {
  const managerRef = React.useRef<IManagerHandles>(null);
  const queueRef = React.useRef<IPortalAction[]>([]);
  const { generateKey, removeKey } = useKey();

  React.useEffect(() => {
    while (queueRef.current?.length && managerRef.current) {
      const action = queueRef.current?.pop();

      if (action) {
        switch (action.type) {
          case 'mount':
            managerRef.current?.mount(action.key, action.node);
            break;
          case 'update':
            managerRef.current?.update(action.key, action.node);
            break;
          case 'unmount':
            managerRef.current?.unmount(action.key);
            break;
        }
      }
    }
  }, []);

  const mount = (node: IPortalNode): string => {
    const key = generateKey();

    if (managerRef.current) {
      managerRef.current.mount(key, node);
    } else {
      queueRef.current?.push({ type: 'mount', key, node });
    }

    return key;
  };

  const update = (key: string, node: IPortalNode): void => {
    if (managerRef.current) {
      managerRef.current.update(key, node);
    } else if (queueRef.current) {
      const op = { type: 'mount' as 'mount', key, node };
      const index =
        queueRef.current?.findIndex(
          o => o.type === 'mount' || (o.type === 'update' && o.key === key),
        ) ?? -1;

      if (index > -1) {
        queueRef.current[index] = op;
      } else {
        queueRef.current.push(op);
      }
    }
  };

  const unmount = (key: string): void => {
    if (managerRef.current) {
      managerRef.current.unmount(key);
      removeKey(key);
    } else {
      queueRef.current?.push({ type: 'unmount', key });
    }
  };

  return (
    <Context.Provider value={{ mount, update, unmount }}>
      <View style={[{ flex: 1 }, style]} collapsable={false} pointerEvents="box-none">
        {children}
      </View>
      <Manager ref={managerRef} />
    </Context.Provider>
  );
};
