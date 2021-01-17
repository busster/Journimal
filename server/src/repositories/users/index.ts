import { db } from '../index'
import { usersCollection } from '../collections'

import { User } from '../../domains/user'

import { UserDoesNotExist, CouldNotCreateUser } from './errors'

export const createUserService = async (user : User) : Promise<void> => {
  try {
    console.log('Saving domain user: ', user)
    await usersCollection
      .doc(user.id)
      .set({
        name: user.name
      })
  } catch (ex) {
    throw CouldNotCreateUser;
  }
}

// GET USER
export const getUserByIdService = async (uid : string) : Promise<User> => {
  try {
    const doc = await usersCollection.doc(uid).get()

    if (!doc.exists) {
      throw UserDoesNotExist
    } else {
      const dto = doc.data();
      return new User(dto.id, dto.name, dto.packs, dto.dogs)
    }
  } catch (ex) {
    throw UserDoesNotExist
  }
}
