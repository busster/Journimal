import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Colors, shade } from 'modules/design/styles'

import { Neomorph, Shadow } from 'react-native-neomorph-shadows'

import { Icon } from 'modules/design/components/icons/base'

import { styleIfTrue } from 'modules/design/components/utils'

export const ButtonIcon = ({
  onPress,
  onLongPress,
  icon,
  disabled,
  variation = 'primary',
  width = 50,
  height = 50,
  style
}) => {
  const [pressed, setPressed] = useState(false)

  const dims = (n = 0) => ({ width: width + n, height: height + n })
  const offset = -25

  const pressable = (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      onLongPress={onLongPress}
      hitSlop={25}
      style={styles['button__hitbox']}
    >
      <Icon
        icon={icon}
        width={dims(offset).width} height={dims(offset).height}
      />
    </Pressable>)
  
  return (
    <View style={style}>
      <Neomorph
        inner={pressed}
        swapShadows
        style={{
          ...styles['button'],
          ...styleIfTrue(disabled, styles['button--disabled']),
          ...dims()
        }}
      >
        { pressable }
      </Neomorph>
    </View>
  )
}

const styles = StyleSheet.create({
  'button': {
    shadowRadius: 4,
    borderRadius: 12,
    backgroundColor: Colors.Background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'button--disabled': {},

  'button__skin': {
    shadowRadius: 1,
    borderRadius: 10,
    backgroundColor: Colors.Primary
  },
  'button__skin--pressed': {
    shadowRadius: 2,
    borderRadius: 9,
    backgroundColor: shade(Colors.Primary, -5)
  },

  'button__hitbox': {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  'button__text': {},
  'button__text--primary': {
    color: Colors.Accent
  },
  'button__text--primary--pressed': {
    color: Colors.Background
  },
  'button__text--minimal': {
    color: Colors.Accent
  },
  'button__text--minimal--pressed': {
    color: Colors.Primary
  },
  'button__text--disabled': {},
})
