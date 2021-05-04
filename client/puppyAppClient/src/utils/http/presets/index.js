import { HttpBuilder } from 'http-builder'

let token = null

export const persistAuthorization = (t) => token = t

export const generateDefaultHttpBuilder = () =>
  new HttpBuilder()
    .withAuthorization(token)
    .withFailedStrategy(res => {
      throw new Error(res)
    })

export const httpGetBuilder = () =>
  generateDefaultHttpBuilder()
    .asGet()

export const httpPostBuilder = () =>
  generateDefaultHttpBuilder()
    .asPost()
