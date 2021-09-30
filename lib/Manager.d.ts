import * as React from 'react';
export interface IManagerHandles {
    mount(key: string, children: React.ReactNode): void;
    update(key?: string, children?: React.ReactNode): void;
    unmount(key?: string): void;
}
export interface IPortalNode {
    children: React.ReactNode;
    order?: number;
}
export declare const Manager: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
