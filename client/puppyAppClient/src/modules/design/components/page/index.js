import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'modules/design/styles'

import { Neomorph } from 'react-native-neomorph-shadows'

export const Page = ({ style, children, centerX }) => (
  <View style={{
      ...style,
      ...styles.page,
      ...(centerX ? styles['page--centerX'] : ({}))
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
  }
})
