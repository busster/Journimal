"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
require("reflect-metadata");
exports.EventHandler = (event) => {
    return (target) => {
        Reflect.defineMetadata('event', event, target);
    };
};
//# sourceMappingURL=handlerDecorator.js.map