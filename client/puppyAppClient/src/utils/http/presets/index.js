import { HttpBuilder } from 'http-builder'

let token = null

export const persistAuthorization = (t) => token = t

export const generateDefaultHttpBuilder = () =>
  new HttpBuilder()
    .withAuthorization(token)

export const httpGetBuilder = () =>
  generateDefaultHttpBuilder()
    .asGet()
