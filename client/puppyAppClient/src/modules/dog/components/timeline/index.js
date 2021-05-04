import React from 'react';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';

import { PageBack, Button, ButtonFloating, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'
import { paramsRef } from 'modules/core/router/ref'

import { dogMachineName } from 'modules/dog/machines'

import AddEntry from 'modules/dog/components/timeline/addEntry'
import Loading from 'modules/dog/components/loading'
import Entries from 'modules/dog/components/timeline/entries'

export default ({ route, navigation }) => {
  const [state, send] = useService(appService)
  const [dogState, dogSend] = useService(state.context.activeDogMachine)

  console.log('DOG_STATE: ', dogState)

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

  const timelineData = createTimelineData(dogState.context.timelineEntries)

  const routeToHome = () => {
    navigation.goBack()
  }

  const navigateToAddEntry = () => {
    dogSend('GO_TO_ENTRY_CREATION')
  }

  const handleRefreshTimeline = () => {
    dogSend('REFRESH_TIMELINE')
  }

  if (dogState.matches('timeline.view')) {
    return (
      <PageBack
        onBack={routeToHome}
        title={dogState.context.name}
        style={styles.timelinePage}
      >
        <Entries
          timelineData={timelineData}
          onRefresh={handleRefreshTimeline}
          refreshing={dogState.matches('timeline.loadTimeline')}
        />
        <View style={[styles.fab, Spacing.m1]}>
          <ButtonFloating onPress={navigateToAddEntry} text="+" />
        </View>
      </PageBack>
    )
  } else if (dogState.matches('timeline.addEntry')) {
    return <AddEntry />
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