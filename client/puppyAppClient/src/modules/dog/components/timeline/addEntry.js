import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

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

  const icons = [
    // 'mountains',
    'dog-food',
    // 'dog-park',
    'poo',
    // 'dog-walk',
    'fire-hydrant'
  ]

  return (
    <PageBack
      onBack={routeToHome}
      title={dogState.context.name}
      centerX
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.actions}>
        {icons.map(icon => (
          <ButtonIcon width={buttonSize} height={buttonSize} icon={icon} style={{...Spacing.m05}} />
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