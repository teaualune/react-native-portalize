import { IProvider } from './Host';
import { IPortalNode } from './Manager';
interface IConsumerProps {
    node: IPortalNode;
    manager: IProvider | null;
}
export declare const Consumer: ({ node, manager }: IConsumerProps) => null;
export {};
