import { timelinesCollection } from '../../collections'
import { Activity } from '../../../domains/activities'

const CouldNotCreateActivity = new Error('Could not create activity')
const ActivityDoesNotExist = new Error('Activity does not exist for this timeline')


export const createActivityService = async (timeLineId: string, activity: Activity): Promise<void> => {

    const activitiesDocs = timelinesCollection.doc(timeLineId).collection('activities').doc()
    activity.id = activitiesDocs.id
    try {
        await activitiesDocs.create({ type: activity.type, startDate: activity.startDate, endDate: activity.endDate })
    } catch (ex) {
        throw CouldNotCreateActivity
    }
}

export const getActivityByIdService = async (timeLineId: string, activityId: string): Promise<Activity> => {
    try {
        const activity = await timelinesCollection.doc(timeLineId).collection('activities').doc(activityId).get()
        if (!activity.exists) {
            throw ActivityDoesNotExist
        } else {
            const activityDto = activity.data()
            return new Activity(activityDto.id, activityDto.type, new Date(activityDto.startDate), new Date(activityDto.endDate))
        }
    } catch (ex) {
        throw ActivityDoesNotExist
    }
}
