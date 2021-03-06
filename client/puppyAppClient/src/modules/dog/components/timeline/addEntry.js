import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import moment from 'moment'

import { PageBack, Button, ButtonIcon, Colors, Spacing, SpacingConstants, Typography, ww } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export default () => {
  const [state, send] = useService(appService)
  const [dogState, dogSend] = useService(state.context.activeDogMachine)

  const buttonSize = (ww() - (SpacingConstants['05'] * 5)) / 5 

  const routeToHome = () => {
    dogSend('CANCEL')
  }

  const handleAddEvent = (eventType) => {
    dogSend('CREATE_EVENT', { eventType, date: moment.utc() })
  }

  const icons = dogState.context.eventTypes

  return (
    <PageBack
      onBack={routeToHome}
      title={dogState.context.name}
      centerX
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.actions}>
        {icons.map(({ type, icon }) => (
          <ButtonIcon key={type} onPress={() => handleAddEvent(type)} width={buttonSize} height={buttonSize} icon={icon} style={{...Spacing.m05}} />
        ))}
      </ScrollView>
    </PageBack>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  actions: {
    width: '100%',
    ...Spacing.p05
  }
  // body: {
  //   justifyContent: 'flex-end',
  //   ...Spacing.mb1
  // }
})