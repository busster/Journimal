import {
  Machine,
  State,
  actions,
  assign,
  send,
  sendParent,
  interpret,
  spawn
} from 'xstate'

const defaultContext = {
  id: null,
  name: ''
}

export const createDogMachine = (id, context = defaultContext) =>
  Machine({
    id,
    context,
    initial: 'profile',
    states: {
      timeline: {},
      profile: {},
      scheduler: {}
    }
  })
