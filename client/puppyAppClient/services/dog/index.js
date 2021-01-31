import { httpBuilderFactory } from '../utils'
import appsettings from '../../appsettings'

import { ErrorOccurred } from '../../errors'

const urls = {
  createDog: `${appsettings.functionApi}/dogs`
}

// export const getUser = async () => {
//   const res = await httpBuilderFactory
//       .createGetBuilder()
//       .withUrl(urls.getUser)
//       .send()
//     if (res.status === 404) throw UserNotFound
//     else if (!res.ok) throw ErrorOccurred
//     return await res.json()
// }

export const createDog = async ({ name }) => {
  const res = await httpBuilderFactory
      .createPostBuilder()
      .withUrl(urls.createDog)
      .send({ name })
    if (!res.ok) throw ErrorOccurred
    return await res.text()
}
