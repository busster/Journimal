import { firebase } from 'modules/core/database'
import { HttpBuilder } from 'http-builder'

let token = null

const refreshToken = async () => {
  try {
    const refreshedToken = await firebase.auth().currentUser.getIdToken(true)
    token = refreshedToken
    return token
  } catch (e) {
    return false
  }
}

export const persistAuthorization = (t) => token = t

export const generateDefaultHttpBuilder = () =>
  new HttpBuilder()
    .withAuthorization(token)
    .withRefreshTokenStrategy(refreshToken)
    .withFailedStrategy(res => {
      throw new Error(res)
    })

export const httpGetBuilder = () =>
  generateDefaultHttpBuilder()
    .asGet()

export const httpPostBuilder = () =>
  generateDefaultHttpBuilder()
    .asPost()

export const httpGetRawBuilder = () =>
  httpGetBuilder()
    .withSuccessStrategy(res => res)
