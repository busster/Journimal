import { Request, Response, NextFunction } from "express";
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

export * from './methods';
export * from './decorator';

export { Request, Response, NextFunction };
