import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

import { PageBack, Button, ButtonFloating, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export default ({ navigation }) => {
  const [state, send] = useService(appService)

  const [dogState, dogSend] = useService(state.context.activeMachine)

  const routeToHome = () => {
    navigation.goBack()
  }

  return (
    <PageBack
      onBack={routeToHome}
      title={dogState.context.name}
      // centerX
      style={styles.timelinePage}
    >
      <ScrollView style={styles.timeline}>
      </ScrollView>
      <View style={[styles.fab, Spacing.m1]}>
        <ButtonFloating text="+" />
      </View>
    </PageBack>
  )
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