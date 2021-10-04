import { IProvider } from './Host';
import { IPortalNode } from './Manager';
interface IConsumerProps extends IPortalNode {
    manager: IProvider | null;
}
export declare const Consumer: (props: IConsumerProps) => null;
export {};
