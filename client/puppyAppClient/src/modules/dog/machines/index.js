import {
  Machine,
  State,
  assign,
  send,
  sendParent,
  interpret,
  spawn
} from 'xstate'

import { spawnTimelineMachine } from 'modules/dog/machines/timeline'

const services = {}

const actions = {
  spawnTimeline: assign({
    timeline: (context, event) => context.timeline || spawnTimelineMachine(context, { dogId: context.id })
  })
}

const defaultContext = {
  id: null,
  name: '',
  timeline: null
}
export const createDogMachine = (id, dog) =>
  Machine({
    id,
    context: { ...defaultContext, ...dog },
    type: 'parallel',
    states: {
      timeline: {
        entry: ['spawnTimeline']
      },
      profile: {},
      scheduler: {},
      loader: {}
    }
  },
  {
    services,
    actions
  })

export const dogMachineName = (id) => `dog-${id}`
export const spawnDogMachine = (context, { dogId, dog }) =>
  spawn(createDogMachine(dogMachineName(dogId), dog), { sync: true, name: dogMachineName(dogId) })
