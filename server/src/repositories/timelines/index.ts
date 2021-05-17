
import { timelinesCollection } from '../collections'

import { Timeline } from '../../domains/timelines'
import { Event } from '../../domains/events'
import { Activity } from '../../domains/activities'

import { mapActivity, ActivityDto } from './activities/index'

const CouldNotCreateTimeline = new Error('Could not create timeline')
const TimelineAlreadyExists = new Error('Timeline already exists for this dog')
const TimelineDoesNotExist = new Error('Timeline does not exist for this dog')

interface TimelineDto {
  dogId : string
  activeActivity : ActivityDto
}

const mapTimelineForUpdate = (timeline : Timeline) : TimelineDto => ({
  dogId: timeline.dogId,
  activeActivity: timeline.activeActivity ? mapActivity(timeline.activeActivity) : null
})

export const getTimelineByIdQuery = async (timelineId : string) : Promise<Timeline> => {
  const timelineDoc = await timelinesCollection.doc(timelineId).get();
  if (!timelineDoc.exists) throw TimelineDoesNotExist;
  const timelineData = timelineDoc.data()
  const activeActivityData = timelineData.activeActivity;
  const activeActivity = activeActivityData ? new Activity(activeActivityData.id, activeActivityData.type, activeActivityData.startDate, activeActivityData.endDate) : null;
  return new Timeline(timelineDoc.id, timelineData.dogId, activeActivity, [], [])
}

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

export const updateTimelineService = async (timeline: Timeline) : Promise<void> => {
  const timelineDoc = timelinesCollection.doc(timeline.id)
  const timelineDto = mapTimelineForUpdate(timeline)
  const activeActivity = timeline.activeActivity ? { id: timeline.activeActivity.id, ...timelineDto.activeActivity } : null
  await timelineDoc.update({ dogId: timelineDto.dogId, activeActivity })
}
