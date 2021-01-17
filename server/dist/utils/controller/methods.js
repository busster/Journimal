"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Put = exports.Options = exports.Delete = exports.Post = exports.Get = void 0;
var HttpVerb;
(function (HttpVerb) {
    HttpVerb["GET"] = "get";
    HttpVerb["POST"] = "post";
    HttpVerb["DELETE"] = "delete";
    HttpVerb["OPTIONS"] = "options";
    HttpVerb["PUT"] = "put";
})(HttpVerb || (HttpVerb = {}));
exports.Get = (path) => helperForRoutes(HttpVerb.GET, path);
exports.Post = (path) => helperForRoutes(HttpVerb.POST, path);
exports.Delete = (path) => helperForRoutes(HttpVerb.DELETE, path);
exports.Options = (path) => helperForRoutes(HttpVerb.OPTIONS, path);
exports.Put = (path) => helperForRoutes(HttpVerb.PUT, path);
const helperForRoutes = (httpVerb, path) => {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }
        const routes = Reflect.getMetadata('routes', target.constructor);
        routes.push({
            httpMethod: httpVerb,
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};
//# sourceMappingURL=methods.js.map