import appsettings from '@/appsettings'
import { httpPostBuilder } from '@/utils/http/presets'

const urls = {
  create: `${appsettings.functionApi}/dogs`,
}

export const create = ({ name, dogs }) =>
  httpPostBuilder()
    .withUrl(urls.create)
    .withBody({ name, dogs })
    .send()
