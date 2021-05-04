
import { timelinesCollection } from '../collections'

import { Timeline } from '../../domains/timelines'
import { Event } from '../../domains/events'
import { Activity } from '../../domains/activities'

const CouldNotCreateTimeline = new Error('Could not create timeline')
const TimelineAlreadyExists = new Error('Timeline already exists for this dog')
const TimelineDoesNotExist = new Error('Timeline does not exist for this dog')

export const createTimelineService = async (timeline: Timeline): Promise<void> => {
  const { dogId } = timeline
  const existingTimeline = await timelinesCollection.where('dogId', '==', dogId).get()
  if (!existingTimeline.empty) throw TimelineAlreadyExists
  const timelineRef = timelinesCollection.doc()
  timeline.id = timelineRef.id
  try {
    await timelineRef
      .set({ dogId })
  } catch (ex) {
    throw CouldNotCreateTimeline
  }
}
