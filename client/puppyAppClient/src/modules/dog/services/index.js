import appsettings from '@/appsettings'
import { httpPostBuilder, httpGetBuilder } from '@/utils/http/presets'

import moment from 'moment'

const urls = {
  create: `${appsettings.functionApi}/dogs`,
  timeline: `${appsettings.functionApi}/timelines?dogId={dogId}&startDate={startDate}&endDate={endDate}`,
  eventTypes: `${appsettings.functionApi}/timelines/event-types`,
  activityTypes: `${appsettings.functionApi}/timelines/activity-types`,
  addEvent: `${appsettings.functionApi}/timelines/{timelineId}/events`,
  addActivity: `${appsettings.functionApi}/timelines/{timelineId}/activities`,
  completeActivity: `${appsettings.functionApi}/timelines/{timelineId}/activity/{activityId}/complete`
}

export const create = ({ name }) =>
  httpPostBuilder()
    .withUrl(urls.create)
    .withBody({ name })
    .send()

export const getTimeline = async (dogId, { start, end }) => 
  httpGetBuilder()
    .withUrl(
      urls.timeline
        .replace('{dogId}', dogId)
        .replace('{startDate}', start.format())
        .replace('{endDate}', end.format())
    )
    .withSuccessStrategy(res => {
      const { id, dogId, events, activeActivity } = res.data
      return {
        id,
        dogId,
        activeActivity,
        events: events.map(({ type, date, icon }) => ({
          type,
          icon,
          date: moment.utc(date).local()
        }))
      }
    })
    .send()
  
export const getEventTypes = () =>
  httpGetBuilder()
    .withUrl(urls.eventTypes)
    .send()

export const getActivityTypes = () =>
httpGetBuilder()
  .withUrl(urls.activityTypes)
  .send()

export const saveEvent = (timelineId, { type, date }) =>
  httpPostBuilder()
    .withUrl(urls.addEvent.replace('{timelineId}', timelineId))
    .withBody({ type, date: date.format() })
    .send()

export const startActivity = (timelineId, { type, date }) =>
  httpPostBuilder()
    .withUrl(urls.addActivity.replace('{timelineId}', timelineId))
    .withBody({ type, startDate: date.format() })
    .send()

export const completeActivity = (timelineId, { activityId, date }) =>
  httpPostBuilder()
    .withUrl(
      urls.completeActivity
        .replace('{timelineId}', timelineId)
        .replace('{activityId}', activityId)
    )
    .withBody({ endDate: date.format() })
    .send()
