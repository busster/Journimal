import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
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
}) => (
  <View style={{
      ...styles['page']
    }}
  >
    <View style={styles['page__header']}>
      <View style={{width: 25, height: 25, ...Spacing.m1}}>
        { headerLeft }
      </View>
      <View style={styles['page__titleContainer']}>
        <Text style={[styles['page__title'], Typography.navigationTitle]}>{ title }</Text>
      </View>
      <View style={{width: 25, height: 25, ...Spacing.m1}}>
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
    justifyContent: 'space-between'
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
