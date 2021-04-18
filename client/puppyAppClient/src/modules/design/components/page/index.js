import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from 'modules/design/styles'

import { styleIfTrue } from 'modules/design/components/utils'

export const Page = ({ style, children, centerX, centerY }) => (
  <View style={{
      ...style,
      ...styles.page,
      ...styleIfTrue(centerX, styles['page--centerX']),
      ...styleIfTrue(centerY, styles['page--centerY']),
    }}
  >
    { children }
  </View>
)

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.Background
  },
  'page--centerX': {
    alignItems: 'center'
  },
  'page--centerY': {
    justifyContent: 'center'
  }
})
