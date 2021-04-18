import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { PageBack, Button, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export default ({ navigation }) => {
  const [state, send] = useService(appService)

  const logout = () => {
    send('LOGOUT')
  }

  const routeToHome = () => {
    navigation.push('HomeRouter')
  }

  const inputWidth = wpw(.8)

  return (
    <PageBack
      onBack={routeToHome}
      title={state.context.user.name}
      style={styles.body}
      centerX
    >
      <Button onPress={logout} width={inputWidth} text="logout"/>
    </PageBack>
  )
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'flex-end',
    ...Spacing.mb1
  }
})