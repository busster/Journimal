import {
  Machine,
  State,
  actions,
  assign,
  send,
  sendParent,
  interpret,
  spawn
} from 'xstate';
import { createUser } from '../../services/user'
import { createDog } from '../../services/dog'
import { createPack } from '../../services/pack'

export const createUserMachine = Machine({
  id: 'createUser',
  initial: 'collectData',
  context: {
    user: null
  },
  states: {
    collectData: {
      on: {
        CREATE: 'create'
      }
    },
    create: {
      invoke: {
        id: 'createUserService',
        src: (context, event) => {
          console.log('create user service', event)
          return createUser({ name: event.name })
        },
        onDone: 'created',
        onError: 'collectData'
      }
    },
    created: {
      type: 'final'
    }
  }
},
{
  actions: {
    setUser: assign({
      user: (context, event) => event.data
    })
  }
})

export const createPackMachine = Machine({
  id: 'createPack',
  initial: 'collectData',
  states: {
    collectData: {
      on: {
        CREATE: 'create'
      }
    },
    create: {
      invoke: {
        id: 'createPackService',
        src: (context, event) => createPack({ name: event.name, dogs: event.dogs }),
        onDone: 'created',
        onError: 'collectData'
      }
    },
    created: {
      type: 'final'
    }
  }
})

export const createDogsMachine = Machine({
  id: 'createPack',
  initial: 'collectData',
  states: {
    collectData: {
      on: {
        CREATE: 'create'
      }
    },
    create: {
      invoke: {
        id: 'createDogsService',
        src: (context, event) => Promise.all(event.dogs.map(dog => createDog({ name: dog.name }))),
        onDone: 'created',
        onError: 'collectData'
      }
    },
    created: {
      type: 'final'
    }
  }
})

export const setupAccountMachine = Machine({
  id: 'setupAccount',
  initial: 'createUser',
  context: {
    dogs: []
  },
  states: {
    createUser: {
      invoke: {
        src: 'createUserMachine',
        onDone: 'createDogs'
      }
    },
    createDogs: {
      invoke: {
        src: 'createDogsMachine',
        onDone: {
          target: 'createPack',
          actions: ['setCreatedDogs']
        }
      }
    },
    createPack: {
      invoke: {
        src: 'createPackMachine',
        data: {
          dogs: (context, event) => context.dogs
        },
        onDone: 'setupComplete'
      }
    },
    setupComplete: {
      type: 'final'
    }
  }
},
{
  actions: {
    setCreatedDogs: assign({ dogs: (context, event) => event.data.dogs }),
  },
  services: {
    createUserMachine,
    createDogsMachine,
    createPackMachine
  }
})
