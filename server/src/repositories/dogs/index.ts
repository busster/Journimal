import { db } from '../index'
import { dogsCollection, dogOwnersCollection } from '../collections'

import { Dog } from '../../domains/dog'

const DogDoesNotExist = new Error('Dog does not exist')
const CouldNotCreateDog = new Error('Could not create dog')

export const createDogService = async (dog : Dog) : Promise<void> => {
  const dogRef = dogsCollection.doc()
  const dogId = dogRef.id

  // COPY ID FOR EVENT
  dog.id = dogId

  try {
    await dogRef
      .set({
        name: dog.name
      })

      dog.owners.forEach(async owner => {
        await dogOwnersCollection.doc().set({
          dogId,
          ownerId: owner
        })
      })
  } catch (ex) {
    throw CouldNotCreateDog
  }
}

export const getDogByIdService = async (uid : string) : Promise<Dog> => {
  try {
    const dog = await dogsCollection.doc(uid).get()
    const dogOwnersDocs = await dogOwnersCollection.where('dogId', '==', uid).get()

    if (!dog.exists) {
      throw DogDoesNotExist
    } else {
      const dogDto = dog.data();

      const dogOwners : string[] = []
      dogOwnersDocs.forEach(doc => {
        const dogOwnerData = doc.data()
        dogOwners.push(dogOwnerData.ownerId)
      })

      return new Dog(dogDto.id, dogDto.name, dogOwners)
    }
  } catch (ex) {
    throw DogDoesNotExist
  }
}
