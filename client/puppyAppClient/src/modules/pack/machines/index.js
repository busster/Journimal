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

export const createPackMachine = (id, context = defaultContext) =>
  Machine({
    id,
    context,
    initial: 'members',
    states: {
      members: {}
    }
  })
