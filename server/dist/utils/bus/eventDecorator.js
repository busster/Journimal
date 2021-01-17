"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
require("reflect-metadata");
exports.Event = (name = '') => {
    return (target) => {
        Reflect.defineMetadata('name', name, target);
    };
};
//# sourceMappingURL=eventDecorator.js.map