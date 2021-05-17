import { timelinesCollection } from '../../collections'
import { Event } from '../../../domains/events'

const CouldNotCreateEvent = new Error('Could not create evemt')
const EventDoesNotExist = new Error('Event does not exist for this timeline')


export const createEventService = async (timeLineId: string, event: Event): Promise<void> => {
  const eventDoc = timelinesCollection.doc(timeLineId).collection('events').doc()
  event.id = eventDoc.id
  try {
      await eventDoc.create({ type: event.type, date: event.date.toDate() })
  } catch (ex) {
      throw CouldNotCreateEvent
  }
}
