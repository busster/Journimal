import { toDate } from '../../utils'
import { timelinesCollection, timelineActivitiesCollection } from '../../collections'
import { Activity } from '../../../domains/activities'

const CouldNotCreateActivity = new Error('Could not create activity')
const CouldNotUpdateActivity = new Error('Could not update activity')
const ActivityDoesNotExist = new Error('Activity does not exist')

export interface ActivityDto {
  type: string;
  startDate: Date;
  endDate: Date;
}

export const mapActivity = (activity : Activity) : ActivityDto => ({
  type: activity.type,
  startDate: activity.startDate.toDate(),
  endDate: activity.endDate ? activity.endDate.toDate() : null
})

export const getActivityById = async (timelineId : string, activityId : string) : Promise<Activity> => {
  const activityDoc = await timelineActivitiesCollection(timelineId).doc(activityId).get()
  if (!activityDoc.exists) throw ActivityDoesNotExist

  const activityData = activityDoc.data()
  return new Activity(activityDoc.id, activityData.type, toDate(activityData.startDate), toDate(activityData.endDate))
}

export const createActivityService = async (timelineId: string, activity: Activity): Promise<void> => {
  const timeline = timelinesCollection.doc(timelineId)
  const activityDoc = timeline.collection('activities').doc()
  activity.id = activityDoc.id

  const activityDto = mapActivity(activity)

  try {
    await timeline.update({ activeActivity: { id: activity.id, ...activityDto } })
    await activityDoc.create(activityDto)
  } catch (ex) {
      throw CouldNotCreateActivity
  }
}

export const updateActivityService = async (timelineId: string, activity: Activity): Promise<void> => {
  const timeline = timelinesCollection.doc(timelineId)
  const activityDoc = timeline.collection('activities').doc(activity.id)

  const activityDto = mapActivity(activity)

  try {
    await activityDoc.update(activityDto)
  } catch (ex) {
      throw CouldNotUpdateActivity
  }
}
