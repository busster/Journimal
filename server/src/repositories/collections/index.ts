import { db } from '../index'

export const usersCollection = db.collection('users')
export const packsCollection = db.collection('packs')
export const packMembersCollection = db.collection('packMembers')
export const dogsCollection = db.collection('dogs')
export const dogOwnersCollection = db.collection('dogOwners')
export const timelinesCollection = db.collection('timelines')
export const eventsCollection = db.collection('timelines/events')
export const activitiesCollection = db.collection('timelines/activities')
