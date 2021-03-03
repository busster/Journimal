import appsettings from '@/appsettings'
import { httpGetBuilder, httpPostBuilder } from '@/utils/http/presets'

const urls = {
  get: `${appsettings.functionApi}/users/:userId`,
  create: `${appsettings.functionApi}/users`,
}

export const get = (userId) => {
  console.log('doing something???', userId)
  try {
    return httpGetBuilder()
      .withSuccessStrategy(res => {
        console.log('---------------succues---------=--------------------')
        console.log(res)
        console.log('------------------------=--------------------')
        return res
      })
      .withFailedStrategy(res => {
        console.log('-------------fail-----------=--------------------')
        console.log(res)
        console.log('------------------------=--------------------')
        return res
      })
      .withUnauthorizedStrategy(res => {
        console.log('-------------unauth-----------=--------------------')
        console.log(res)
        console.log('------------------------=--------------------')
        return res
      })
      .withUrl(urls.get.replace(':userId', userId))
      .send()
  } catch (e) {
    console.log('shit ', e)
  }
}

export const create = ({ name }) =>
  httpPostBuilder()
    .withUrl(urls.create)
    .withBody({ name })
    .send()
