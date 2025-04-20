import React, {useCallback, useImperativeHandle, useState} from 'react';
import {StyleSheet, View} from 'react-native';

export type PortalizeNode = React.PropsWithChildren<{
  order?: number;
}>;

export interface PortalizeManagerHandle {
  mount(key: string, node: PortalizeNode): void;
  update(key: string, node: PortalizeNode): void;
  unmount(key: string): void;
}

interface PortalizeState extends PortalizeNode {
  key: string;
}

export default function Manager(props: {
  ref?: React.ForwardedRef<PortalizeManagerHandle>;
}): React.JSX.Element {
  const [portals, setPortals] = useState<PortalizeState[]>([]);

  useImperativeHandle(
    props.ref,
    useCallback<() => PortalizeManagerHandle>(
      () => ({
        mount(key, node) {
          setPortals(prev => {
            const newPortal: PortalizeState = {
              key,
              children: node.children,
              order: node.order,
            };
            if (prev.length === 0) {
              return [newPortal];
            }
            const retval: PortalizeState[] = [];
            let inserted = false;
            prev.forEach((p, i) => {
              if (inserted) {
                retval.push(p);
              } else {
                if ((newPortal.order ?? 0) < (p.order ?? 0)) {
                  retval.push(newPortal, p);
                  inserted = true;
                } else if (i === prev.length - 1) {
                  retval.push(newPortal);
                } else {
                  retval.push(p);
                }
              }
            });
            return retval;
          });
        },
        update(key, node) {
          setPortals(prev =>
            prev.map(item => {
              if (item.key === key) {
                return {...item, ...node};
              }
              return item;
            }),
          );
        },
        unmount(key) {
          setPortals(prev => prev.filter(item => item.key !== key));
        },
      }),
      [],
    ),
  );

  return (
    <>
      {portals.map((state, index) => (
        <View
          key={`rnp-${index}-${state.key}`}
          collapsable={false}
          pointerEvents="box-none"
          style={StyleSheet.absoluteFill}>
          {state.children}
        </View>
      ))}
    </>
  );
}
