import {IConnectionContext} from './IConnectionContext';

export interface IModule {
    // Create a new instance of this module. Initialize and do things as needed
    init(context : IConnectionContext) : void;
    // We are resuming a persisted state (either in memory or from disk)
    resume(state : any) : void;
    // Unloading this module. Return an optional state to store for reloading
    uninit() : any;
}