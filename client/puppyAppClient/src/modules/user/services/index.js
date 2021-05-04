import appsettings from '@/appsettings'
import { httpGetBuilder, httpPostBuilder } from '@/utils/http/presets'

const urls = {
  get: `${appsettings.functionApi}/users/:userId`,
  create: `${appsettings.functionApi}/users`,
}

export const get = (userId) =>
  httpGetBuilder()
    .withSuccessStrategy(res => res)
    .withFailedStrategy(res => res)
    .withUnauthorizedStrategy(res => res)
    .withUrl(urls.get.replace(':userId', userId))
    .send()

export const create = ({ name }) =>
  httpPostBuilder()
    .withUrl(urls.create)
    .withBody({ name })
    .send()
