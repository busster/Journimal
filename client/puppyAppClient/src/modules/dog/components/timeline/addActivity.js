import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import moment from 'moment'

import { PageBack, Button, ButtonIcon, Colors, Spacing, SpacingConstants, Typography, ww } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export default ({ title, activityTypes, onBack, onAddActivity }) => {
  const buttonSize = (ww() - (SpacingConstants['05'] * 5)) / 5 

  return (
    <PageBack
      onBack={onBack}
      title={title}
      centerX
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.actions}>
        {activityTypes.map(({ type, icon }) => (
          <ButtonIcon key={type} onPress={() => onAddActivity(type)} width={buttonSize} height={buttonSize} icon={icon} style={{...Spacing.m05}} />
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