import 'reflect-metadata';

export const Event = (name : string = '') : ClassDecorator => {
  return (target : any) => {
    Reflect.defineMetadata('name', name, target);
  }
}