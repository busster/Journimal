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
  name: '',
  activeView: null
}



export const createDogMachine = (id, context = defaultContext) =>
  Machine({
    id,
    context,
    initial: 'timeline',
    states: {
      timeline: {},
      profile: {},
      scheduler: {}
    }
  })
