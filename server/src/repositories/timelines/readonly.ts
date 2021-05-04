import moment from 'moment'

import { timelinesCollection, timelineEventsCollection } from '../collections'
import { timestamp } from '../utils'

import { TimelineVm } from '../../viewModels/timeline'
import { EventVm } from '../../viewModels/timeline/event'

import { getEventTypesService } from './events/readonly'

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

  return {
    id: timelineDoc.id,
    dogId: timeline.dogId,
    events
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
      type: eventData.type,
      date: moment(eventData.date.toDate()).format(),
      icon: eventTypeMap[eventData.type]
    }
  })
}
