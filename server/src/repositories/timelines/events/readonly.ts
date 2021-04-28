import { db } from '../../index'
import { eventTypesCollection } from '../../collections'

import { EventTypeVm } from '../../../viewModels/timeline/event'

const CouldNotFetchEventTypes = new Error('Could not fetch event types')

export const getEventTypesService = async () : Promise<EventTypeVm[]> => {
  try {
    const eventTypes = await eventTypesCollection.get();

    return eventTypes.docs.map(eventType => {
      const eventTypeData = eventType.data()
      return {
        type: eventTypeData.type,
        icon: eventTypeData.icon
      }
    })
  } catch (ex) {
    throw CouldNotFetchEventTypes
  }
}
