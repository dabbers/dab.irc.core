import { ICloneable } from './ICloneable';
export declare namespace Target {
    interface ITarget extends ICloneable {
        display: string;
        target: string;
        clone(): ITarget;
    }
    function ResolveTarget(target: string, channelPrefixes?: string[]): ITarget;
}
