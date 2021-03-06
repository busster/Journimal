import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { PageBack, Button, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'
import { paramsRef } from 'modules/core/router/ref'

import { packMachineName } from 'modules/pack/machines'

export default ({ navigation }) => {
  const [state, send] = useService(appService)

  const [packState, packSend] = useService(state.context.activePackMachine)

  const routeToHome = () => {
    navigation.goBack()
  }

  return (
    <PageBack
      onBack={routeToHome}
      title={packState.context.name}
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