import { db } from '../index'
import { dogsCollection, dogOwnersCollection, usersCollection } from '../collections'

import { Dog, DogOwner } from '../../viewModels/dogs'

const DogDoesNotExist = new Error('Dog does not exist')
const Unauthorized = new Error('Unauthorized')

export const getDogByIdService = async (userId : string, dogId : string) : Promise<Dog> => {
  try {
    const dogDoc = await dogsCollection.doc(dogId).get()
    const dogOwnersDocs = await dogOwnersCollection.where('dogId', '==', dogId).get()

    if (!dogDoc.exists) {
      throw DogDoesNotExist
    } else {
      // DOG DATA
      const dogDto = dogDoc.data();

      // DOG OWNER DATA
      const dogOwnerIds : string[] = []
      dogOwnersDocs.forEach(doc => {
        const dogOwnerData = doc.data()
        dogOwnerIds.push(dogOwnerData.ownerId)
      })

      // AUTH
      const isOwner = dogOwnerIds.find(o => o === userId)
      if (!isOwner) throw Unauthorized

      // USER DATA
      const userDocs : any = []
      dogOwnerIds.forEach(async id => {
        userDocs.push(await usersCollection.doc(id).get())
      })
      const dogOwners : DogOwner[] = []
      userDocs.forEach((doc : any) => {
        const userData = doc.data()
        dogOwners.push({ id: userData.id, name: userData.name })
      })

      return {
        id: dogDto.id,
        name: dogDto.name,
        owners: dogOwners
      }
    }
  } catch (ex) {
    throw DogDoesNotExist
  }
}
