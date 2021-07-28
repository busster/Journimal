import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Colors, shade } from 'modules/design/styles'

import { Neomorph, NeomorphFlex, Shadow } from 'react-native-neomorph-shadows'

import { styleIfTrue } from 'modules/design/components/utils'
import { Typography } from 'modules/design/styles/typography';
import { Spacing } from 'modules/design/styles/spacing'

export const Checkbox = ({
  label,
  model,
  value,
  disabled,
  variation = 'primary',
  checkBoxWidth = 50,
  checkBoxHeight = 50,
  width,
  style,
}) => {
  const [checked, setChecked] = model;

  const isChecked = Array.isArray(checked) ? checked.includes(value) : value;

  const dims = (width, height, n = 0) => ({ width: width + n, height: height + n });

  const handleUpdateArrayChecked = () => {
    if (isChecked) {
      setChecked(checked.filter(val => val !== value));
    } else {
      setChecked(checked.concat(value));
    }
  }
  const handleUpdateBoolChecked = () => {
    setChecked(!isChecked);
  }
  const handlePressed = () => {
    if (Array.isArray(checked)) {
      handleUpdateArrayChecked()
    } else {
      handleUpdateBoolChecked()
    }
  }

  const pressable = (
    <Pressable
      onPress={handlePressed}
      hitSlop={25}
      style={styles['checkbox__hitbox']}
    >
    
    </Pressable>
  )

  const pressableSkin = (
    <Neomorph
      inner={isChecked}
      swapShadows={isChecked}
      style={{
        ...styles['checkbox__skin'],
        ...styleIfTrue(isChecked, styles['checkbox__skin--isChecked']),
        ...styleIfTrue(disabled, styles['checkbox__skin--disabled']),
        margin: 10,
        ...dims(checkBoxWidth, checkBoxHeight, -10)
      }}
    >
      { pressable }
    </Neomorph>
  )
  
  return (
    <View style={[style, styles['checkbox__container']]}>
      <Neomorph
        style={{
          ...styles['checkbox'],
          ...styleIfTrue(disabled, styles['checkbox--disabled']),
          ...dims(width, checkBoxHeight + 10)
        }}
      >
        <Pressable
          onPress={handlePressed}
          hitSlop={25}
          style={styles['checkbox__hitbox']}
        >
          { pressableSkin }
          <Text
            numberOfLines={1}
            style={{
              ...styles['checkbox__text'],
              ...styles[`checkbox__text--${variation}`],
              ...styleIfTrue(isChecked, styles[`checkbox__text--${variation}--isChecked`]),
              ...styleIfTrue(disabled, styles['checkbox__text--disabled'])
            }}
          >{ label }</Text>
        </Pressable>
      </Neomorph>
    </View>
  )
}

const styles = StyleSheet.create({
  // 'checkbox__container': {
  //   backgroundColor: Colors.Accent,    
  // },
  'checkbox': {
    shadowRadius: 4,
    borderRadius: 12,
    backgroundColor: Colors.Background,
  },
  'checkbox--disabled': {},

  'checkbox__skin': {
    shadowRadius: 1,
    borderRadius: 10,
    backgroundColor: Colors.Background
  },
  'checkbox__skin--isChecked': {
    shadowRadius: 2,
    borderRadius: 9,
    backgroundColor: Colors.Secondary
  },

  'checkbox__hitbox': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },

  'checkbox__text': {
    flex: 1,
    ...Spacing.ml05
  },
  'checkbox__text--primary': {
    color: Colors.Accent
  },
  'checkbox__text--primary--isChecked': {
    color: shade(Colors.Accent, -1)
  },
  'checkbox__text--minimal': {
    color: Colors.Accent
  },
  'checkbox__text--minimal--isChecked': {
    color: Colors.Primary
  },
  'checkbox__text--disabled': {},
})
