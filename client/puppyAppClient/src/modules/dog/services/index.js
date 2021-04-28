import appsettings from '@/appsettings'
import { httpPostBuilder, httpGetBuilder } from '@/utils/http/presets'

const urls = {
  create: `${appsettings.functionApi}/dogs`,
  timeline: `${appsettings.functionApi}/timelines?dogId={dogId}`,
  eventTypes: `${appsettings.functionApi}/timelines/event-types`
}

export const create = ({ name }) =>
  httpPostBuilder()
    .withUrl(urls.create)
    .withBody({ name })
    .send()

export const getTimeline = ({ dogId }) =>
  httpGetBuilder()
    .withUrl(urls.timeline.replace('{dogId}', dogId))
    .send()
  
export const getEventTypes = () =>
  httpGetBuilder()
    .withUrl(urls.eventTypes)
    .send()
