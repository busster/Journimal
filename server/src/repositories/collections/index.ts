import { db } from '../index'

export const usersCollection = db.collection('users')
export const packsCollection = db.collection('packs')
export const packMembersCollection = db.collection('packMembers')
export const dogsCollection = db.collection('dogs')
export const dogOwnersCollection = db.collection('dogOwners')
export const timelinesCollection = db.collection('timelines')
export const timelineEventsCollection = (timeline: string) => db.collection(`timelines/${timeline}/events`)
export const timelineActivitiesCollection = (timeline: string) => db.collection(`timelines/${timeline}/activities`)
export const eventTypesCollection = db.collection('eventTypes')
export const activityTypesCollection = db.collection('activityTypes')
