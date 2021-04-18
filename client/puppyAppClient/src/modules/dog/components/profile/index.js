import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { PageBack, Button, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

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
      style={styles.body}
      centerX
    >
    </PageBack>
  )
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'flex-end',
    ...Spacing.mb1
  }
})