import moment from 'moment'

const formatDay = (date) => date.format('ddd, MMMM Do')
const formatMinute = (date) => date.format('h:mm a')

const addEntry = (days, date, entryType, entryData) => {
  const day = formatDay(date)
  const minute = formatMinute(date)

  const { minutes } = days.get(day) || { minutes: new Map() }
  const { events, activities } = minutes.get(minute) || { events: new Map(), activities: new Map() }
  if (entryType === 'event') events.set(entryData.id, entryData)
  else if (entryType === 'activity') activities.set(entryData.id, entryData)
  minutes.set(minute, { date, events, activities })
  days.set(day, { date, minutes })
}

const entriesDef = {
  get: function () { return this.days },
  addDay: function (date) {
    const day = formatDay(date)
    const minutes = this.days.get(day) || new Map()
    this.days.set(day, minutes)
  },
  addEvents: function (events) {
    events.forEach(event => addEntry(this.days, event.date, 'event', event))
  },
  addActivities: function (activities) {
    activities.forEach(activity => {
      addEntry(this.days, activity.startDate, 'activity', activity)
      if (activity.endDate) addEntry(this.days, activity.endDate, 'activity', activity)
    })
  }
}

export const Entries = ({ events = [], activities = [] }) => {
  const days = new Map()
  return Object.assign(Object.create(entriesDef), { days })
}

const timeline = {}

export const Timeline = (args = {}) => Object.assign(Object.create(timeline), args, { entries: Entries(args) })