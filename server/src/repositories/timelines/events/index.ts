import { timelinesCollection } from '../../collections'
import { Event } from '../../../domains/events'

const CouldNotCreateEvent = new Error('Could not create evemt')
const EventDoesNotExist = new Error('Event does not exist for this timeline')


export const createEventService = async (timeLineId: string, event: Event): Promise<void> => {

    const eventDocs = timelinesCollection.doc(timeLineId).collection('events').doc()
    event.id = eventDocs.id
    try {
        await eventDocs.create({ type: event.type, date: event.date })
    } catch (ex) {
        throw CouldNotCreateEvent
    }
}

export const getEventByIdService = async (timeLineId: string, eventId: string): Promise<Event> => {
    try {
        const event = await timelinesCollection.doc(timeLineId).collection('events').doc(eventId).get()
        if (!event.exists) {
            throw EventDoesNotExist
        } else {
            const eventDto = event.data()
            return new Event(eventDto.id, eventDto.type, new Date(eventDto.date))
        }
    } catch (ex) {
        throw EventDoesNotExist
    }
}