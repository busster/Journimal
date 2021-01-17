"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Router from '../router';
// export type IControllerCallback = (req: Request, res: Response, next: NextFunction)  => Promise<void>;
// export interface IControllerBuilder {
//   register(app : any) : void;
//   withGet(path : string, callback : IControllerCallback) : IControllerBuilder;
//   withPost(path : string, callback : IControllerCallback) : IControllerBuilder;
// }
// export class ControllerBuilder implements IControllerBuilder {
//   private path : string;
//   private router : any;
//   constructor (path : string) {
//     this.path = path;
//     this.router = Router.getInstance();
//   }
//   register(app: any): void {
//     app.use(this.path, this.router);
//   }
//   withGet(path: string, callback: IControllerCallback): IControllerBuilder {
//     this.router.get(path, callback);
//     return this;
//   }
//   withPost(path: string, callback: IControllerCallback): IControllerBuilder {
//     this.router.post(path, callback);
//     return this;
//   }
// }
__exportStar(require("./methods"), exports);
__exportStar(require("./decorator"), exports);
//# sourceMappingURL=index.js.map