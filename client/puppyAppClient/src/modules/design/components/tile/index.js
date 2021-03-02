import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Colors, Spacing, Typography } from 'modules/design'

export const Tile = ({
  title,
  imageUri,
  style,
  width = 150,
  height = 150
}) => {
  return (
    <View style={[styles['title'], style]}>
      <View style={[{ width, height }, styles['tile__box']]}>
        {
          imageUri !== undefined ?
            null :
            (<Text style={styles['tile__initials']}>{title.slice(0,2)}</Text>)
        }
      </View>
      <Text style={styles['tile__title']}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  'tile': {
    display: 'flex',
  },
  'tile__box': {
    backgroundColor: Colors.Accent,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'tile__initials': {
    color: Colors.Background,
    ...Typography.title
  },
  'tile__title': {
    color: Colors.Accent,
    ...Typography.tile,
    ...Spacing.mt025
  }
})