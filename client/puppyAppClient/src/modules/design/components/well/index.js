import React from 'react'

import { StyleSheet, ScrollView } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows'

import { wpw } from 'modules/design/utils'
import { Colors } from 'modules/design/styles/colors'
import { Spacing } from 'modules/design/styles/spacing'

export const Well = ({
  children,
  style,
  width = wpw(.8),
  height = wpw(.8)
}) => {
  const dims = () => ({ width, height })

  return (
    <Neomorph
      inner
      swapShadows
      style={{
        ...style,
        ...styles['well'],
        ...dims()
      }}
    >
      <ScrollView style={styles['well__scroll']}>
        { children }
      </ScrollView>
    </Neomorph>
  )
}

const styles = StyleSheet.create({
  'well': {
    shadowRadius: 4,
    borderRadius: 12,
    backgroundColor: Colors.Background,
    ...Spacing.p025
  },
  'well__scroll': {
    ...Spacing.p05
  }
})
