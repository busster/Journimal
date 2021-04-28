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

import { getTimeline, getEventTypes } from 'modules/dog/services'

const fetchEventTypes = (context, event) => getEventTypes()
const fetchTimeline = (context, event) => getTimeline(context.id)

const defaultContext = {
  id: null,
  name: '',
  timeline: [],
  eventTypes: []
}
export const createDogMachine = (id, dog) =>
  Machine({
    id,
    context: { ...defaultContext, ...dog },
    type: 'parallel',
    states: {
      timeline: {
        initial: 'loadTimeline',
        states: {
          loadTimeline: {
            invoke: {
              id: 'fetch-timeline',
              src: 'fetchTimeline',
              onDone: {
                target: 'view',
                actions: ['setTimeline']
              },
              onError: 'couldNotLoadTimeline'
            }
          },
          couldNotLoadTimeline: {},
          view: {
            on: {
              GO_TO_ENTRY_CREATION: 'addEntry'
            }
          },
          addEntry: {
            on: {
              CANCEL: 'view'
            }
          }
        }
      },
      profile: {},
      scheduler: {},
      loader: {
        initial: 'loadEventTypes',
        states: {
          loadEventTypes: {
            invoke: {
              id: 'fetch-event-types',
              src: 'fetchEventTypes',
              onDone: {
                target: 'loaded',
                actions: ['setEventTypes']
              },
              onError: 'couldNotLoad'
            }
          },
          loaded: {},
          couldNotLoad: {}
        }
      }
    }
  },
  {
    services: {
      fetchEventTypes,
      fetchTimeline
    },
    actions: {
      setTimeline: assign({
        timeline: (context, event) => event.data
      }),
      setEventTypes: assign({
        eventTypes: (context, event) => event.data
      })
    }
  })

export const dogMachineName = (id) => `dog-${id}`
export const spawnDogMachine = (context, { dogId, dog }) =>
  spawn(createDogMachine(dogMachineName(dogId), dog), { sync: true, name: dogMachineName(dogId) })
