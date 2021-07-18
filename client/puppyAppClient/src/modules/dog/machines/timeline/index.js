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

import { Timeline, Entries } from 'modules/dog/models/timeline'

const fetchEventTypes = (context, event) => getEventTypes()
const fetchTimeline = (context, event) => getTimeline(context.dogId, context.timelineWindow)
const addEventService = (context, { eventType, date }) => saveEvent(context.timeline.id, { type: eventType, date })
const fetchActivityTypes = (context, event) => getActivityTypes()
const addActivityService = (context, { activityType, date }) => startActivity(context.timeline.id, { type: activityType, date })
const completeActivityService = (context, { activeActivity, date }) => completeActivity(context.timeline.id, { activityId: activeActivity.id, date })

const DAYS_OFFSET = 10

const services = {
  fetchEventTypes,
  fetchTimeline,
  addEventService,
  fetchActivityTypes,
  addActivityService,
  completeActivityService
}

const generateDefaultTimeline = () => {
  const newWindow = {
    offset: 0,
    start: moment.utc(moment().subtract(DAYS_OFFSET, 'days').startOf('day').format()),
    end: moment.utc(moment().endOf('day').format())
  }
  console.log(newWindow)
  return newWindow
}

const actions = {
  setTimeline: assign({
    timeline: (context, event) => {
      const timeline = context.timeline
      timeline.entries.addEvents(event.data.events)
      timeline.entries.addActivities(event.data.activities)
      timeline.id = event.data.id
      timeline.activeActivity = event.data.activeActivity
      timeline.dogId = event.data.dogId
      return timeline
    }
  }),
  setEventTypes: assign({
    eventTypes: (context, event) => event.data
  }),
  setActivityTypes: assign({
    activityTypes: (context, event) => event.data
  }),
  resetTimelineWindow: assign({
    timelineWindow: generateDefaultTimeline()
  }),
  resetTimeline: assign({
    timeline: Timeline()
  }),
  updateTimelineWindow: assign({
    timelineWindow: (context, event) => {
      const offset = context.timelineWindow.offset + 1
      const newOffset = DAYS_OFFSET * offset
      const start = moment.utc(moment().subtract(newOffset + DAYS_OFFSET, 'days').startOf('day').format())
      const end = moment.utc(moment().subtract(newOffset, 'days').endOf('day').format())
      return { offset, start, end }
    }
  })
}

const guards = {
  eventTypesLoaded: (context, event) => context.eventTypes.length > 0,
  activityTypesLoaded: (context, event) => context.activityTypes.length > 0
}

const defaultContext = () => ({
  dogId: null,
  timeline: Timeline(),
  timelineEntries: {},
  eventTypes: [],
  activityTypes: [],
  timelineWindow: generateDefaultTimeline()
})

const REFRESH_TIMELINE = {
  target: 'loadTimeline',
  actions: ['resetTimelineWindow', 'resetTimeline']
}

export const createTimelineMachine = (id, dogId) =>
  Machine({
    id,
    context: { ...defaultContext(), dogId },
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
          REFRESH_TIMELINE
        }
      },
      view: {
        on: {
          GO_TO_ENTRY_CREATION: 'loadEventTypes',
          GO_TO_ACTIVITY_CREATION: 'loadActivityTypes',
          REFRESH_TIMELINE,
          LOAD_NEXT: {
            target: 'loadTimeline',
            actions: ['updateTimelineWindow']
          },
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
