import moment from 'moment'

import { timelinesCollection, timelineEventsCollection, timelineActivitiesCollection } from '../collections'
import { timestamp, toDateString } from '../utils'

import { TimelineVm } from '../../viewModels/timeline'
import { EventVm } from '../../viewModels/timeline/event'
import { ActivityVm } from '../../viewModels/timeline/activity'

import { getEventTypesService } from './events/readonly'
import { getActivityTypesService } from './activities/readonly'

const TimelineDoesNotExist = new Error('Timeline does not exist for this dog')

export const getTimelineByDogService = async (dogId: string, startDate: moment.Moment, endDate: moment.Moment): Promise<TimelineVm> => {
  const dogTimelines = await timelinesCollection.where('dogId', '==', dogId).get()

  if (dogTimelines.empty) throw TimelineDoesNotExist

  const timelineDoc = dogTimelines.docs[0]
  const timeline = timelineDoc.data()

  const events = await filterTimelineEventsByIdAndDate(
    timelineDoc.id,
    startDate,
    endDate
  )

  const activities = await filterTimelineActivitiesByIdAndDate(
    timelineDoc.id,
    startDate,
    endDate
  )

  return {
    id: timelineDoc.id,
    dogId: timeline.dogId,
    activeActivity: timeline.activeActivity ? timeline.activeActivity : null,
    events,
    activities
  }
}

export const filterTimelineEventsByIdAndDate = async (timelineId: string, startDate: moment.Moment, endDate: moment.Moment): Promise<EventVm[]> => {
  const events = await timelineEventsCollection(timelineId)
    .where('date', '>=', timestamp(startDate))
    .where('date', '<=', timestamp(endDate))
    .get()

  const eventTypes = await getEventTypesService()
  const eventTypeMap = eventTypes.reduce((acc, n) => {
    acc[n.type] = n.icon
    return acc
  }, {} as {[key: string]: string})

  return events.docs.map(e => {
    const eventData = e.data()

    return {
      id: e.id,
      type: eventData.type,
      date: toDateString(eventData.date),
      icon: eventTypeMap[eventData.type]
    }
  })
}

export const filterTimelineActivitiesByIdAndDate = async (timelineId: string, startDate: moment.Moment, endDate: moment.Moment): Promise<ActivityVm[]> => {
  const startedActivities = await timelineActivitiesCollection(timelineId)
    .where('startDate', '>=', timestamp(startDate))
    .where('startDate', '<=', timestamp(endDate))
    .get()

  const endedActivities = await timelineActivitiesCollection(timelineId)
    .where('endDate', '>=', timestamp(startDate))
    .where('endDate', '<=', timestamp(endDate))
    .get()

  const activityTypes = await getActivityTypesService()
  const activityTypeMap = activityTypes.reduce((acc, n) => {
    acc[n.type] = n.icon
    return acc
  }, {} as {[key: string]: string})

  const activities = [...startedActivities.docs, ...endedActivities.docs].reduce((acc, n) => {
    const activityData = n.data()
    const id = n.id
    const activity = {
      id,
      type: activityData.type,
      startDate: toDateString(activityData.startDate),
      endDate: toDateString(activityData.endDate),
      icon: activityTypeMap[activityData.type]
    }

    acc.set(id, activity)
    return acc
  }, new Map())

  return [...activities.values()]
}
