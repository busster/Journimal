import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

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
      centerX
    >
      <ScrollView style={styles.actions}>
        <Button variation="minimal" text="W" />
        <Button variation="minimal" text="E" />
        <Button variation="minimal" text="1" />
        <Button variation="minimal" text="2" />
      </ScrollView>
    </PageBack>
  )
}

const styles = StyleSheet.create({
  // body: {
  //   justifyContent: 'flex-end',
  //   ...Spacing.mb1
  // }
})