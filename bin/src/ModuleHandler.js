"use strict";
var ModuleHandler = (function () {
    function ModuleHandler(context) {
        this.modules = {};
        this.moduleStates = {};
        this.context = context;
    }
    ModuleHandler.prototype.load = function (name) {
        if (this.modules[name])
            this.unload(name);
        var module1 = require(name);
        module1.init(this.context);
        return this;
    };
    ModuleHandler.prototype.unload = function (name, persist) {
        if (persist === void 0) { persist = false; }
        if (this.modules[name]) {
            var res = this.modules[name].uninit();
            if (res) {
                this.moduleStates[name] = res;
            }
            delete this.modules[name];
        }
        return this;
    };
    return ModuleHandler;
}());
exports.ModuleHandler = ModuleHandler;
//# sourceMappingURL=ModuleHandler.js.map