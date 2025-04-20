import React, {createContext, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Manager from './Manager';
import type {PortalizeManagerHandle, PortalizeNode} from './Manager';
import usePortalizeKey from './usePortalizeKey';

const styles = StyleSheet.create({
  container: {flex: 1},
});

type PortalizeAction =
  | {
      type: 'mount';
      key: string;
      node: PortalizeNode;
    }
  | {
      type: 'update';
      key: string;
      node: PortalizeNode;
    }
  | {
      type: 'unmount';
      key: string;
    };

export interface PortalizeHostProvider {
  mount(node: PortalizeNode): string;
  update(key: string, node: PortalizeNode): void;
  unmount(key: string): void;
}

type PortalizeHostComponent = React.FC<React.PropsWithChildren>;

export interface PortalizeHostFactory {
  Context: React.Context<PortalizeHostProvider | undefined>;
  Host: PortalizeHostComponent;
}

export default function createPortalizeHost(
  hostID: string,
): PortalizeHostFactory {
  const Context = createContext<PortalizeHostProvider | undefined>(undefined);
  Context.displayName = `PortalizeContext_${hostID}`;

  const Host: PortalizeHostComponent = props => {
    const managerRef = useRef<PortalizeManagerHandle>(null);
    const queueRef = useRef<PortalizeAction[]>([]);
    const {generateKey, removeKey} = usePortalizeKey();

    useEffect(() => {
      while (queueRef.current?.length && managerRef.current) {
        const action = queueRef.current.pop();
        switch (action?.type) {
          case 'mount':
            managerRef.current.mount(action.key, action.node);
            break;
          case 'update':
            managerRef.current.update(action.key, action.node);
            break;
          case 'unmount':
            managerRef.current.unmount(action.key);
            break;
        }
      }
    }, []);

    const hostProvider = useMemo<PortalizeHostProvider>(() => ({
      mount(node) {
        const key = generateKey();
        if (managerRef.current) {
          managerRef.current.mount(key, node);
        } else {
          queueRef.current?.push({key, node, type: 'mount'});
        }
        return key;
      },
      update(key, node) {
        if (managerRef.current) {
          managerRef.current.update(key, node);
        } else if (queueRef.current) {
          const queue = queueRef.current;
          const action: PortalizeAction = {type: 'mount', key, node};
          const index = queue.findIndex(
            a => a.type === 'mount' || (a.type === 'update' && a.key === key),
          );
          if (index >= 0) {
            queue[index] = action;
          } else {
            queue.push(action);
          }
        }
      },
      unmount(key) {
        if (managerRef.current) {
          managerRef.current.unmount(key);
          removeKey(key);
        } else {
          queueRef.current?.push({type: 'unmount', key});
        }
      },
    }), [generateKey, removeKey]);

    return (
      <Context.Provider value={hostProvider}>
        <View
          style={styles.container}
          collapsable={false}
          pointerEvents="box-none">
          {props.children}
        </View>
        <Manager ref={managerRef} />
      </Context.Provider>
    );
  };

  Host.displayName = `PortalizeHost_${hostID}`;

  return {Context, Host};
}
