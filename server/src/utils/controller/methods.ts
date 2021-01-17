export interface RouteDefinition {
  path : string | RegExp;
  httpMethod : HttpVerb;
  methodName : string;
}

enum HttpVerb {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  OPTIONS = 'options',
  PUT = 'put'
}

export const Get = (path? : string | RegExp) : MethodDecorator => helperForRoutes(HttpVerb.GET, path);
export const Post = (path? : string | RegExp) : MethodDecorator => helperForRoutes(HttpVerb.POST, path);
export const Delete = (path? : string | RegExp) : MethodDecorator => helperForRoutes(HttpVerb.DELETE, path);
export const Options = (path? : string | RegExp) : MethodDecorator => helperForRoutes(HttpVerb.OPTIONS, path);
export const Put = (path? : string | RegExp) : MethodDecorator => helperForRoutes(HttpVerb.PUT, path);

const helperForRoutes = (httpVerb : HttpVerb, path : string | RegExp) : MethodDecorator & PropertyDecorator => {
  return (target : any, propertyKey : string) : void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as RouteDefinition[];

    routes.push({
      httpMethod: httpVerb,
      path,
      methodName: propertyKey
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  }
}
