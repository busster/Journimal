"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
// Utils
const router_1 = __importDefault(require("../utils/router"));
// Controllers
const users_1 = __importDefault(require("./users"));
const packs_1 = __importDefault(require("./packs"));
const dogs_1 = __importDefault(require("./dogs"));
// Middlewares
const auth_1 = require("./middlewares/auth");
const router = router_1.default.getInstance();
const controllers = [
    users_1.default,
    packs_1.default,
    dogs_1.default
];
exports.register = (app) => {
    // Middlewares
    router.use(auth_1.authorize);
    // Controllers
    controllers.forEach(controller => {
        const instance = new controller();
        const prefix = Reflect.getMetadata('prefix', controller);
        const routes = Reflect.getMetadata('routes', controller);
        const controllerRouter = router_1.default.getInstance();
        routes.forEach(route => {
            controllerRouter[route.httpMethod](route.path, (req, res, next) => {
                Reflect.get(instance, route.methodName)(req, res, next);
            });
        });
        router.use(prefix, controllerRouter);
    });
    // Add main router to app
    app.use('/', router);
};
//# sourceMappingURL=index.js.map