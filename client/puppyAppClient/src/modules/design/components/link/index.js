import React, { useState } from 'react'

import { StyleSheet, Pressable, Text } from 'react-native'

import { Colors, TextColors } from 'modules/design/styles/colors'

import { styleIfTrue } from 'modules/design/components/utils'

export const Link = ({
  style,
  text,
  variation = 'default',
  onPress,
  onLongPress,
  disabled
}) => {
  const [pressed, setPressed] = useState(false)

  return (
    <Pressable
      style={[style]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      onLongPress={onLongPress}
      hitSlop={25}
    >
      <Text
        style={{
          ...styles['link'],
          ...styles[`link--${variation}`],
          ...styleIfTrue(pressed, styles[`link--${variation}--pressed`]),
          ...styleIfTrue(disabled, styles['link--disabled'])
        }}
      >{ text }</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  'link': {
    color: Colors.Accent
  },
  'link--default': {
    color: Colors.Accent
  },
  'link--default--pressed': {
    color: Colors.Primary
  },
  'link--primary': {
    color: Colors.Primary
  },
  'link--primary--pressed': {
    color: Colors.Accent
  },
  'link--light': {
    color: TextColors.Disabled
  },
  'link--light--pressed': {
    color: Colors.Primary
  },
  'link--disabled': {
    color: TextColors.Disabled,
  },
})
