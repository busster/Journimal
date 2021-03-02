import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Page, TextInput, Link, Button, Colors, TextColors, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'

export default ({ service }) => {
  const [name, setName] = useState('')

  const [state, send] = useService(service)

  const save = () => {
    send('CREATE', { name })
  }

  const inputWidth = wpw(.8) - 60

  return (
    <Page centerX centerY>
      <Text style={[styles.title, Spacing.my1, { width: inputWidth }]}>Add Dogs</Text>

      <View style={[styles.addDogsContainer, Spacing.mt2]}>
        <TextInput onChangeText={setName} placeholder="Dog Name" width={inputWidth} />
        <Button variation="minimal" onPress={save} text="+" style={Spacing.ml05} />
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Colors.Accent,
    ...Typography.title
  },
  addDogsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})