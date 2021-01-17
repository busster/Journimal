// Utils
import Router from '../utils/router';

// Controllers
import UsersController from './users';
import PacksController from './packs';
import DogsController from './dogs';

// Middlewares
import { authorize } from './middlewares/auth';
import { RouteDefinition, Request, Response, NextFunction } from '../utils/controller';

const router = Router.getInstance();

const controllers = [
  UsersController,
  PacksController,
  DogsController
]

export const register = (app : any) => {

  // Middlewares
  router.use(authorize)

  // Controllers
  controllers.forEach(controller => {
    const instance = new controller();
    const prefix = Reflect.getMetadata('prefix', controller);
    const routes : RouteDefinition[] = Reflect.getMetadata('routes', controller);
    const controllerRouter = Router.getInstance();

    routes.forEach(route => {
      controllerRouter[route.httpMethod](route.path, (req : Request, res : Response, next : NextFunction) => {
        Reflect.get(instance, route.methodName)(req, res, next);
      })
    })

    router.use(prefix, controllerRouter);
  })

  // Add main router to app
  app.use('/', router)
}
