import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Colors, shade } from 'modules/design/styles'

import { styleIfTrue } from 'modules/design/components/utils'

export const ButtonFloating = ({
  onPress,
  onLongPress,
  text,
  disabled,
  variation = 'primary',
  width = 50,
  height = 50,
  style
}) => {
  const [pressed, setPressed] = useState(false)

  const dims = (n = 0) => ({
    width: width + n,
    height: height + n,
    borderRadius: height + n
  })

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      onLongPress={onLongPress}
      hitSlop={25}
      style={{
        ...style,
        ...dims(),
        ...styles['button-floating'],
        ...styles[`button-floating--${variation}`],
        ...styleIfTrue(pressed, styles[`button-floating--${variation}--pressed`]),
      }}
    >
      <Text
        style={{
          ...styles['button-floating__text'],
          ...styles[`button-floating__text--${variation}`],
          ...styleIfTrue(pressed, styles[`button-floating__text--${variation}--pressed`]),
          ...styleIfTrue(disabled, styles['button-floating__text--disabled'])
        }}
      >{ text }</Text>
    </Pressable>)
}

const styles = StyleSheet.create({
  'button-floating': {
    shadowColor: Colors.Background,
    shadowOffset: { width: 0, height: 7, },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,

    backgroundColor: Colors.Primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'button-floating--primary': {
    backgroundColor: Colors.Primary,
  },
  'button-floating--primary--pressed': {
    backgroundColor: shade(Colors.Primary, -10),
  },
  
  'button--disabled': {},


  'button-floating__text': {},
  'button-floating__text--primary': {
    color: Colors.Accent
  },
  'button-floating__text--primary--pressed': {
    color: Colors.Background
  },
  'button-floating__text--disabled': {},
})
