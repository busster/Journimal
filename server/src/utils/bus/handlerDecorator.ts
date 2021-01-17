import 'reflect-metadata';

export const EventHandler = (event : any) : ClassDecorator => {
  return (target : any) => {
    Reflect.defineMetadata('event', event, target);
  }
}