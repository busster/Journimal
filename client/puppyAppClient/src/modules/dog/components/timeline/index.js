import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

import { PageBack, Button, ButtonFloating, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'
import { paramsRef } from 'modules/core/router/ref'

import { dogMachineName } from 'modules/dog/machines'

import AddEntry from 'modules/dog/components/timeline/addEntry'

export default ({ route, navigation }) => {
  const [state, send] = useService(appService)
  const [dogState, dogSend] = useService(state.context.activeDogMachine)

  const routeToHome = () => {
    navigation.goBack()
  }

  const navigateToAddEntry = () => {
    dogSend('GO_TO_ENTRY_CREATION')
  }

  if (dogState.matches('timeline.view')) {
    return (
      <PageBack
        onBack={routeToHome}
        title={dogState.context.name}
        style={styles.timelinePage}
      >
        <ScrollView style={styles.timeline}>
        </ScrollView>
        <View style={[styles.fab, Spacing.m1]}>
          <ButtonFloating onPress={navigateToAddEntry} text="+" />
        </View>
      </PageBack>
    )
  } else if (dogState.matches('timeline.addEntry')) {
    return <AddEntry />
  }
}

const styles = StyleSheet.create({
  timelinePage: {},
  timeline: {},
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 1,
  }
})