import {
  Machine,
  State,
  assign,
  send,
  sendParent,
  interpret,
  spawn
} from 'xstate'

import moment from 'moment'

import { getTimeline, getEventTypes, saveEvent } from 'modules/dog/services'

const fetchEventTypes = (context, event) => getEventTypes()
const fetchTimeline = (context, event) => getTimeline(context.id, context.timelineWindow)
const addEvent = (context, { eventType, date }) => saveEvent(context.timeline.id, { type: eventType, date })

const services = {
  fetchEventTypes,
  fetchTimeline,
  addEvent
}

const actions = {
  setTimeline: assign({
    timeline: (context, event) => {
      const { id, dogId } = event.data
      return { id, dogId }
    },
    timelineEntries: (context, event) => {
      const { events } = event.data

      return events.reduce((acc, n) => {
        const date = n.date
        const day = date.format('ddd, MMMM Do')
        const minute = date.format('h:mm a')
        const { minutes } = acc[day] || { minutes: {} }
        const { events } = minutes[minute] || { events: [] }
        acc[day] = { minutes: { ...minutes, [minute]: { events: [ ...events, n ] } } }
        return acc
      }, {})
    }
  }),
  setEventTypes: assign({
    eventTypes: (context, event) => event.data
  })
}

const defaultContext = {
  id: null,
  name: '',
  timeline: {},
  timelineEntries: {},
  eventTypes: [],
  timelineWindow: {
    start: moment.utc(moment().startOf('day').format()),
    end: moment.utc(moment().endOf('day').format())
  }
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
              GO_TO_ENTRY_CREATION: 'addEntry',
              REFRESH_TIMELINE: 'loadTimeline'
            }
          },
          addEntry: {
            on: {
              CREATE_EVENT: 'addEventService',
              CANCEL: 'view'
            }
          },
          addEventService: {
            invoke: {
              id: 'add-event',
              src: 'addEvent',
              onDone: 'loadTimeline',
              onError: 'addEntry'
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
    services,
    actions
  })

export const dogMachineName = (id) => `dog-${id}`
export const spawnDogMachine = (context, { dogId, dog }) =>
  spawn(createDogMachine(dogMachineName(dogId), dog), { sync: true, name: dogMachineName(dogId) })
