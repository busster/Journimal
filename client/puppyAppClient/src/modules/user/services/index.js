import appsettings from '@/appsettings'
import { httpGetBuilder } from '@/utils/http/presets'

const urls = {
  get: `${appsettings.functionApi}/users/:userId`,
}

export const get = (userId) => httpGetBuilder()
  .withSuccessStrategy(res => res)
  .withFailedStrategy(res => res)
  .withUrl(urls.get.replace(':userId', userId))
  .send()