
import { timelinesCollection } from '../collections'

import { Timeline } from '../../domains/timelines'
import { Event } from '../../domains/events'
import { Activity } from '../../domains/activities'

const CouldNotCreateTimeline = new Error('Could not create timeline')
const TimelineAlreadyExists = new Error('Timeline already exists for this dog')
const TimelineDoesNotExist = new Error('Timeline does not exist for this dog')


export const createTimelineService = async (timeline: Timeline): Promise<void> => {

    const timelineExists = (await timelinesCollection.where('dogId', '==', timeline.dogId).get()).empty
    if (timelineExists) {
        throw TimelineAlreadyExists
    }
    const timelineRef = timelinesCollection.doc()
    timeline.id = timelineRef.id
    const dogIdForTimeline = timeline.dogId
    try {
        await timelineRef
            .set({ dogId: dogIdForTimeline, events: [], activities: [] })
    } catch (ex) {
        throw CouldNotCreateTimeline
    }
}

export const getTimelineByIdService = async (uid: string): Promise<Timeline> => {
    try {
        const timeline = await timelinesCollection.doc(uid).get()
        if (!timeline.exists) {
            throw TimelineDoesNotExist
        } else {
            const eventDocs = await timelinesCollection.doc(uid).collection('events').get()
            const activitiesDocs = await timelinesCollection.doc(uid).collection('activities').get()
            const timeLineDto = timeline.data();

            const events: Event[] = []
            const activities: Activity[] = []
            eventDocs.forEach(doc => {
                const eventData = doc.data()
                events.push(new Event(eventData.id, eventData.type, new Date(eventData.date)))
            })
            activitiesDocs.forEach(doc => {
                const activitiesData = doc.data()
                activities.push(new Activity(activitiesData.id, activitiesData.type, new Date(activitiesData.startDate), new Date(activitiesData.endDate)))
            })

            return new Timeline(timeLineDto.id, timeLineDto.dogId, activities, events)
        }
    } catch (ex) {
        throw TimelineDoesNotExist
    }

}
export const getTimelineByDogService = async (uid: string): Promise<Timeline> => {
    const timeline = await (await timelinesCollection.where('dogId', '==', uid).get()).docs[0]
    return await getTimelineByIdService(timeline.id);
}
