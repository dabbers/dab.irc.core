// Using generics, we can specify what the context object is for this module later. 
// Different systems will use the module and each system will have its own context.
export interface IModule<Ctx> {
    // Create a new instance of this module. Initialize and do things as needed
    init(context : Ctx) : void;
    // We are resuming a persisted state (either in memory or from disk)
    resume(context:Ctx, state : any) : void;
    // Unloading this module. Return an optional state to store for reloading
    uninit() : any;
}