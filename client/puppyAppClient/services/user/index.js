import { httpBuilderFactory } from '../utils'
import appsettings from '../../appsettings'

import { ErrorOccurred, UserNotFound } from '../../errors'

const urls = {
  getUser: `${appsettings.functionApi}/users/:userId`,
  createUser: `${appsettings.functionApi}/users`
}

export const getUser = async () => {
  const res = await httpBuilderFactory
      .createGetBuilder()
      .withUrl(urls.getUser)
      .send()
    if (res.status === 404) throw UserNotFound
    else if (!res.ok) throw ErrorOccurred
    return await res.json()
}

export const createUser = async ({ name }) => {
  const res = await httpBuilderFactory
      .createPostBuilder()
      .withUrl(urls.createUser)
      .send({ name })
    if (!res.ok) throw ErrorOccurred
    return await res.json()
}
