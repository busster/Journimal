import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Colors, shade } from 'modules/design/styles'

import { Icon } from 'modules/design/components/icons/base'

import { styleIfTrue } from 'modules/design/components/utils'

export const ButtonIconCircle = ({
  onPress,
  onLongPress,
  icon,
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
  const offset = -25

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
        ...styles['button-circle'],
        ...styles[`button-circle--${variation}`],
        ...styleIfTrue(pressed, styles[`button-circle--${variation}--pressed`]),
      }}
    >
      <Icon
        icon={icon}
        width={dims(offset).width} height={dims(offset).height}
      />
    </Pressable>)
}

const styles = StyleSheet.create({
  'button-circle': {
    shadowColor: Colors.Background,

    backgroundColor: Colors.Primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'button-circle--primary': {
    backgroundColor: Colors.Primary,
  },
  'button-circle--primary--pressed': {
    backgroundColor: shade(Colors.Primary, -10),
  },

  'button-circle--secondary': {
    backgroundColor: Colors.Secondary,
  },
  'button-circle--secondary--pressed': {
    backgroundColor: shade(Colors.Secondary, -10),
  },

  'button-circle--tertiary': {
    backgroundColor: Colors.Tertiary,
  },
  'button-circle--tertiary--pressed': {
    backgroundColor: shade(Colors.Tertiary, -10),
  },
  
  'button--disabled': {},


  'button-circle__text': {},
  'button-circle__text--primary': {
    color: Colors.Accent
  },
  'button-circle__text--primary--pressed': {
    color: Colors.Background
  },

  'button-circle__text--secondary': {
    color: Colors.Accent
  },
  'button-circle__text--secondary--pressed': {
    color: Colors.Background
  },

  'button-circle__text--tertiary': {
    color: Colors.Accent
  },
  'button-circle__text--tertiary--pressed': {
    color: Colors.Background
  },

  'button-circle__text--disabled': {},
})
