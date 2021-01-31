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
        src: (context, event) => createUser({ name: event.name }),
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
        src: (context, event) => createPack({ name: event.name, dogs: context.dogs }),
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
  context: {
    dogs: []
  },
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
        src: (context, event) => Promise.all(event.dogs.map(name => createDog({ name }))),
        onDone: {
          target: 'created',
          actions: 'setDogs'
        },
        onError: 'collectData'
      }
    },
    created: {
      type: 'final',
      data: {
        dogs: (context, event) => context.dogs
      }
    }
  }
}, {
  actions: {
    setDogs: assign({ dogs: (context, event) => event.data.map(dog => dog.replace(/.*\/dogs\//, '')) })
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
