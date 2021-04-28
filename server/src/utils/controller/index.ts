import url from 'url'
import { Request, Response, NextFunction } from "express";

export const serverUrl = (req: Request, path: string) => url.format({
  protocol: req.protocol,
  host: req.get('host'),
  pathname: `api/${path}`
})

export * from './methods';
export * from './decorator';

export { Request, Response, NextFunction };
