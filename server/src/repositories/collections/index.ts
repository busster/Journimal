import { db } from '../index'

export const usersCollection = db.collection('users')
export const packsCollection = db.collection('packs')
export const packMembersCollection = db.collection('packMembers')
export const dogsCollection = db.collection('dogs')
export const dogOwnersCollection = db.collection('dogOwners')
