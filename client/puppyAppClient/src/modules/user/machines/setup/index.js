import {
  Machine,
  assign
} from 'xstate'

import { create as createUser } from 'modules/user/services'
import { create as createDog } from 'modules/dog/services'
import { create as createPack } from 'modules/pack/services'

export const setupUserMachine = Machine({
  id: 'setupUser',
  initial: 'createUser',
  context: {
    userName: '',
    dogNames: [],
    packName: '',
  },
  states: {
    createUser: {
      on: {
        NEXT: {
          target: 'createDogs',
          actions: ['setUserName']
        }
      }
    },
    createDogs: {
      on: {
        BACK: 'createUser',
        NEXT: {
          target: 'createPack',
          actions: ['setDogNames']
        }
      }
    },
    createPack: {
      on: {
        BACK: 'createDogs',
        DONE: {
          target: 'setupUserService',
          actions: ['setPackName']
        }
      }
    },
    setupUserService: {
      invoke: {
        src: async (context, event) => {
          try {
            await createUser({ name: context.userName })
            const dogUris = await Promise.all(context.dogNames.map(dogName => createDog({ name: dogName })))
            const dogs = dogUris.map(dog => dog.replace(/.*\/dogs\//, ''))
            await createPack({ name: context.packName, dogs })
          } catch (e) {
            throw(e)
          }
        },
        onDone: 'setupComplete',
        onError: 'createPack'
      }
    },
    setupComplete: {
      type: 'final'
    }
  }
},
{
  actions: {
    setUserName: assign({ userName: (context, event) => event.name }),
    setDogNames: assign({ dogNames: (context, event) => event.names }),
    setPackName: assign({ packName: (context, event) => event.name })
  },
  guards: {}
})
