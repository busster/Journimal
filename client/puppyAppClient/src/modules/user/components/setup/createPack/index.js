import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Page, TextInput, Link, Button, Colors, TextColors, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'

export default ({ service }) => {
  const [name, setName] = useState('')

  const [state, send] = useService(service)

  const inputWidth = wpw(.8)
  const buttonWidth = inputWidth

  const done = () => {
    if (name.length <= 0) return
    send('DONE', { name })
  }
  const back = () => {
    send('BACK')
  }

  return (
    <Page centerX centerY>
      <Text style={[styles.title, Spacing.my1, { width: inputWidth }]}>Create Pack</Text>
      <TextInput style={Spacing.mt2} onChangeText={setName} placeholder="Pack Name" width={inputWidth} />
      <Button onPress={done} text="Done" style={Spacing.my1} width={buttonWidth} />
      <Link onPress={back} text="Back"/>
    </Page>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Colors.Accent,
    ...Typography.title
  }
})