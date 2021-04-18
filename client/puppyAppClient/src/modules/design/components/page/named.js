import React from 'react'
import { View, StyleSheet, Text, Pressable, StatusBar } from 'react-native'
import { Colors, Typography, Spacing, ArrowLeftIcon } from 'modules/design/styles'

import { styleIfTrue } from 'modules/design/components/utils'

export const PageNamed = ({
  style,
  children,
  centerX,
  centerY,
  title,
  headerLeft,
  headerRight
}) => {
  StatusBar.setBackgroundColor(Colors.Secondary)
  return (
    <View style={{
        ...styles['page']
      }}
    >
      <View style={styles['page__header']}>
        <View style={styles['page__header-side']}>
          { headerLeft }
        </View>
        <View style={styles['page__titleContainer']}>
          <Text style={[styles['page__title'], Typography.navigationTitle]}>{ title }</Text>
        </View>
        <View style={styles['page__header-side']}>
          { headerRight }
        </View>
      </View>
      <View
        style={{
          ...styles['page__body'],
          ...style,
          ...styleIfTrue(centerX, styles['page--centerX']),
          ...styleIfTrue(centerY, styles['page--centerY']),
        }}
      >
        { children }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  'page': {
    flex: 1,
    backgroundColor: Colors.Background
  },
  'page--centerX': {
    alignItems: 'center'
  },
  'page--centerY': {
    justifyContent: 'center'
  },

  'page__header': {
    width: '100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.Secondary
  },
  'page__header-side': {
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...Spacing.m05
  },
  'page__titleContainer': {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'page__title': {
    color: Colors.Accent,
  },
  'page__body': {
    flex: 1,
  }
})
