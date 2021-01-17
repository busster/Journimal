import { db } from '../index'
import { usersCollection, packsCollection, packMembersCollection, dogsCollection, dogOwnersCollection } from '../collections'

import { UserVm } from '../../viewModels/user'

import { UserDoesNotExist } from './errors'

export const getUserByIdService = async (uid : string) : Promise<UserVm> => {
  try {
    const userDoc = await usersCollection.doc(uid).get()

    if (!userDoc.exists) {
      throw UserDoesNotExist
    } else {
      const userDto = userDoc.data();
      const userId = userDoc.id

      const packMemberDocs = await packMembersCollection.where('memberId', '==', userId).get()
      const packMembers = packMemberDocs.docs.map(packMemberDoc => packMemberDoc.data())
      const packs = await Promise.all(packMembers.map(async ({ packId }) => await packsCollection.doc(packId).get()))

      const dogOwnerDocs = await dogOwnersCollection.where('ownerId', '==', userId).get()
      const dogOwners = dogOwnerDocs.docs.map(dogOwnerDoc => dogOwnerDoc.data())
      const dogs = await Promise.all(dogOwners.map(async ({ dogId }) => await dogsCollection.doc(dogId).get()))

      return {
        id: userId,
        name: userDto.name,
        packs: packs.map((packDoc : any) => ({ id: packDoc.id, name: packDoc.data().name })),
        dogs: dogs.map((dogDoc : any) => ({ id: dogDoc.id, name: dogDoc.data().name })),
      }
    }
  } catch (ex) {
    throw UserDoesNotExist
  }
}
