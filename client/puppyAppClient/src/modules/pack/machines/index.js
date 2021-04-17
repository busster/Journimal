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

export const packMachineName = (packId) => `pack-${packId}`
export const spawnPackMachine = (context, { packId, pack }) =>
  spawn(createPackMachine(packMachineName(packId), pack), { sync: true, name: packMachineName(packId) })