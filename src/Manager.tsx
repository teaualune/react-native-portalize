import * as React from 'react';
import { View, StyleSheet } from 'react-native';

export interface IManagerHandles {
  mount(key: string, children: React.ReactNode): void;
  update(key?: string, children?: React.ReactNode): void;
  unmount(key?: string): void;
}

export interface IPortalNode {
  children: React.ReactNode;
  order?: number;
}

interface IPortalState extends IPortalNode {
  key: string;
}

export const Manager = React.forwardRef((_, ref): any => {
  const [portals, setPortals] = React.useState<IPortalState[]>([]);

  React.useImperativeHandle(
    ref,
    (): IManagerHandles => ({
      mount(key: string, node: IPortalNode): void {
        setPortals(prev => {
          const newPortals = [...prev, { key, ...node }].sort(
            (p1, p2) => (p1.order ?? 0) - (p2.order ?? 0),
          );
          return newPortals;
        });
      },

      update(key: string, node: IPortalNode): void {
        setPortals(prev =>
          prev.map(item => {
            if (item.key === key) {
              return { ...item, ...node };
            }
            return item;
          }),
        );
      },

      unmount(key: string): void {
        setPortals(prev => prev.filter(item => item.key !== key));
      },
    }),
  );

  return portals.map(({ key, children }, index: number) => (
    <View
      key={`react-native-portalize-${key}-${index}`}
      collapsable={false}
      pointerEvents="box-none"
      style={StyleSheet.absoluteFill}
    >
      {children}
    </View>
  ));
});
