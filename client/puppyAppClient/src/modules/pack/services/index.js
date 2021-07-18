import appsettings from '@/appsettings'
import { httpPostBuilder, httpGetBuilder } from '@/utils/http/presets'

const urls = {
  create: `${appsettings.functionApi}/packs`,
  get: `${appsettings.functionApi}/packs/:id`,
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