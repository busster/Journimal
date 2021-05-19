import React from 'react';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import moment from 'moment'

import { PageBack, Button, ButtonFloating, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'
import { paramsRef } from 'modules/core/router/ref'

import { dogMachineName } from 'modules/dog/machines'

import AddEntry from 'modules/dog/components/timeline/addEntry'
import AddActivity from 'modules/dog/components/timeline/addActivity'
import Loading from 'modules/dog/components/loading'
import TimelineView from 'modules/dog/components/timeline/view'

export default ({ route, navigation }) => {
  const [state, send] = useService(appService)
  const [dogState, dogSend] = useService(state.context.activeDogMachine)
  const [timelineState, timelineSend] = useService(dogState.context.timeline)

  console.log('DOG_STATE: ', JSON.stringify(dogState.context, undefined, 2))
  console.log('TIMELINE_STATE: ', JSON.stringify(timelineState.context, undefined, 2))

  const createTimelineData = (timelineEntries) => {
    return Object.keys(timelineEntries).map(day => {
      const { minutes } = timelineEntries[day]
      const data = Object.keys(minutes).map(minute => {
        const { events } = minutes[minute]
        return { minute, events: events.map(({ icon, type }) => ({ icon, type })) }
      })
      return { day, data }
    })
  }

  const timelineData = createTimelineData(timelineState.context.timelineEntries)
  const activeActivity = timelineState.context.timeline.activeActivity

  const routeToHome = () => {
    navigation.goBack()
  }
  const navigateToAddEntry = () => {
    timelineSend('GO_TO_ENTRY_CREATION')
  }
  const navigateToAddActivity = () => {
    timelineSend('GO_TO_ACTIVITY_CREATION')
  }
  const handleRefreshTimeline = () => {
    timelineSend('REFRESH_TIMELINE')
  }
  const cancelAdd = () => {
    timelineSend('CANCEL')
  }
  const handleAddEvent = (eventType) => {
    timelineSend('CREATE_EVENT', { eventType, date: moment.utc() })
  }
  const handleAddActivity = (activityType) => {
    timelineSend('CREATE_ACTIVITY', { activityType, date: moment.utc() })
  }
  const handleCompleteActiveActivity = () => {
    timelineSend('COMPLETE_ACTIVITY', { activeActivity, date: moment.utc() })
  }

  if (timelineState.matches('view')) {
    return (
      <TimelineView
        title={dogState.context.name}
        timelineData={timelineData}
        refreshing={timelineState.matches('loadTimeline')}
        onBack={routeToHome}
        onRefreshTimeline={handleRefreshTimeline}
        onAddEntry={navigateToAddEntry}
        onAddActivity={navigateToAddActivity}
        onCompleteActiveActivity={handleCompleteActiveActivity}
        activeActivity={activeActivity}
      />)
  } else if (timelineState.matches('addEntry')) {
    return (
      <AddEntry
        title="Add Entry"
        eventTypes={timelineState.context.eventTypes}
        onBack={cancelAdd}
        onAddEvent={handleAddEvent}
      />)
  } else if (timelineState.matches('addActivity')) {
    return (
      <AddActivity
        title="Start Activity"
        activityTypes={timelineState.context.activityTypes}
        onBack={cancelAdd}
        onAddActivity={handleAddActivity}
      />)
  } else {
    return <Loading />
  }
}

const styles = StyleSheet.create({
  timelinePage: {
    display: 'flex',
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 1,
  }
})