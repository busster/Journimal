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

import { getTimeline, getEventTypes, saveEvent, getActivityTypes, startActivity, completeActivity } from 'modules/dog/services'

const fetchEventTypes = (context, event) => getEventTypes()
const fetchTimeline = (context, event) => getTimeline(context.dogId, context.timelineWindow)
const addEventService = (context, { eventType, date }) => saveEvent(context.timeline.id, { type: eventType, date })
const fetchActivityTypes = (context, event) => getActivityTypes()
const addActivityService = (context, { activityType, date }) => startActivity(context.timeline.id, { type: activityType, date })
const completeActivityService = (context, { activeActivity, date }) => completeActivity(context.timeline.id, { activityId: activeActivity.id, date })

const services = {
  fetchEventTypes,
  fetchTimeline,
  addEventService,
  fetchActivityTypes,
  addActivityService,
  completeActivityService
}

const actions = {
  setTimeline: assign({
    timeline: (context, event) => {
      const { id, dogId, activeActivity } = event.data
      return { id, dogId, activeActivity }
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
  }),
  setActivityTypes: assign({
    activityTypes: (context, event) => event.data
  })
}

const guards = {
  eventTypesLoaded: (context, event) => context.eventTypes.length > 0,
  activityTypesLoaded: (context, event) => context.activityTypes.length > 0
}

const defaultContext = {
  dogId: null,
  timeline: {},
  timelineEntries: {},
  eventTypes: [],
  activityTypes: [],
  timelineWindow: {
    start: moment.utc(moment().startOf('day').format()),
    end: moment.utc(moment().endOf('day').format())
  }
}
export const createTimelineMachine = (id, dogId) =>
  Machine({
    id,
    context: { ...defaultContext, dogId },
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
      couldNotLoadTimeline: {
        on: {
          REFRESH_TIMELINE: 'loadTimeline'
        }
      },
      view: {
        on: {
          GO_TO_ENTRY_CREATION: 'loadEventTypes',
          GO_TO_ACTIVITY_CREATION: 'loadActivityTypes',
          REFRESH_TIMELINE: 'loadTimeline',
          COMPLETE_ACTIVITY: 'completeActivity'
        }
      },
      addEntry: {
        on: {
          CREATE_EVENT: 'createEvent',
          CANCEL: 'view'
        }
      },
      addActivity: {
        on: {
          CREATE_ACTIVITY: 'createActivity',
          CANCEL: 'view'
        }
      },
      createEvent: {
        invoke: {
          id: 'add-event',
          src: 'addEventService',
          onDone: 'loadTimeline',
          onError: 'addEntry'
        }
      },
      createActivity: {
        invoke: {
          id: 'create-activity',
          src: 'addActivityService',
          onDone: 'loadTimeline',
          onError: 'addActivity'
        }
      },
      completeActivity: {
        invoke: {
          id: 'complete-activity',
          src: 'completeActivityService',
          onDone: 'loadTimeline',
          onError: 'loadTimeline'
        }
      },
      loadEventTypes: {
        always: [ { target: 'addEntry', cond: 'eventTypesLoaded' } ],
        invoke: {
          id: 'fetch-event-types',
          src: 'fetchEventTypes',
          onDone: {
            target: 'addEntry',
            actions: ['setEventTypes']
          },
          onError: 'view'
        }
      },
      loadActivityTypes: {
        always: [ { target: 'addActivity', cond: 'activityTypesLoaded' } ],
        invoke: {
          id: 'fetch-activity-types',
          src: 'fetchActivityTypes',
          onDone: {
            target: 'addActivity',
            actions: ['setActivityTypes']
          },
          onError: 'view'
        }
      }
    }
  },
  {
    services,
    actions,
    guards
  })

export const timelineMachineName = (id) => `dog-timeline-${id}`
export const spawnTimelineMachine = (context, { dogId }) =>
  spawn(createTimelineMachine(timelineMachineName(dogId), dogId), { sync: true, name: timelineMachineName(dogId) })
