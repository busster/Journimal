import React, { useState } from 'react'

import { View, StyleSheet, TextInput as TInput } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows'

import { styleIfTrue } from 'modules/design/components/utils'

import { Colors, TextColors } from 'modules/design/styles/colors'

export const TextInput = ({
  style,
  placeholder,
  password,
  onChangeText,
  disabled,
  width = 50,
  height = 50
}) => {
  const dims = () => ({ width, height })

  const editable = !disabled

  return (
    <Neomorph
      inner={editable}
      swapShadows
      style={{
        ...style,
        ...styles['text-input'],
        ...styleIfTrue(!editable, styles['text-input--disabled']),
        ...dims()
      }}
    >
      <TInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        secureTextEntry={password}
        placeholderTextColor={TextColors.Disabled}
        style={styles['text-input__hitbox']}
      />
    </Neomorph>
  )
}

const styles = StyleSheet.create({
  'text-input': {
    shadowRadius: 4,
    borderRadius: 12,
    backgroundColor: Colors.Background
  },
  'text-input--disabled': {
    shadowRadius: 2,
  },
  'text-input__hitbox': {
    color: Colors.Accent,
    padding: 10
  },
})
