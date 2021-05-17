import { db } from '../../index'
import { activityTypesCollection } from '../../collections'

import { ActivityTypeVm } from '../../../viewModels/timeline/activity'

const CouldNotFetchActivityTypes = new Error('Could not fetch activity types')

export const getActivityTypesService = async () : Promise<ActivityTypeVm[]> => {
  try {
    const activityTypes = await activityTypesCollection.get();

    return activityTypes.docs.map(activityType => {
      const activityTypeData = activityType.data()
      return {
        type: activityTypeData.type,
        icon: activityTypeData.icon
      }
    })
  } catch (ex) {
    throw CouldNotFetchActivityTypes
  }
}
