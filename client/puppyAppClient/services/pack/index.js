import { httpBuilderFactory } from '../utils'
import appsettings from '../../appsettings'

import { ErrorOccurred } from '../../errors'

const urls = {
  createPack: `${appsettings.functionApi}/packs`
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

export const createPack = async ({ name, dogs }) => {
  const res = await httpBuilderFactory
      .createPostBuilder()
      .withUrl(urls.createPack)
      .send({ name, dogs })
    if (!res.ok) throw ErrorOccurred
    return await res.text()
}
