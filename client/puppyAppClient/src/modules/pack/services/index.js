import appsettings from '@/appsettings'
import { httpPostBuilder, httpGetBuilder } from '@/utils/http/presets'

const urls = {
  create: `${appsettings.functionApi}/packs`,
  get: `${appsettings.functionApi}/packs/:id`,
  addDogs: `${appsettings.functionApi}/packs/:id/addDogs`,
  createInviteCode: `${appsettings.functionApi}/packs/:id/createInvite`,
}

export const create = ({ name, dogs }) =>
  httpPostBuilder()
    .withUrl(urls.create)
    .withBody({ name, dogs })
    .send()

export const get = ({ id }) =>
  httpGetBuilder()
    .withUrl(urls.get.replace(':id', id))
    .send()

export const addDogs = async ({ id }, { dogsToAdd }) =>
  httpPostBuilder()
    .withUrl(urls.addDogs.replace(':id', id))
    .withBody({ dogs: dogsToAdd })
    .send()

export const createInviteCode = async ({ id }) =>
  httpPostBuilder()
    .withUrl(urls.createInviteCode.replace(':id', id))
    .send()
