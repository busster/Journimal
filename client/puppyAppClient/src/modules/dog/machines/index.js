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
    type: 'parallel',
    states: {
      timeline: {
        initial: 'view',
        states: {
          view: {},
          addEntry: {}
        }
      },
      profile: {},
      scheduler: {}
    }
  })

export const dogMachineName = (id) => `dog-${id}`
export const spawnDogMachine = (context, { dogId, dog }) =>
  spawn(createDogMachine(dogMachineName(dogId), dog), { sync: true, name: dogMachineName(dogId) })
