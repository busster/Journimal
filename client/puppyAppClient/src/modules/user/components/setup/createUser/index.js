import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Page, TextInput, Link, Button, ButtonCircle, Colors, TextColors, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'

export default ({ service }) => {
  const [name, setName] = useState('')

  const [state, send] = useService(service)

  useEffect(() => {
    setName(state.context.userName)
  }, [])

  const next = () => {
    if (name.length <= 0) return
    send('NEXT', { name })
  }

  const inputWidth = wpw(.8)

  return (
    <Page centerX centerY>
      <Text style={[styles.title, Spacing.my1, { width: inputWidth }]}>Create Account</Text>
      <TextInput style={Spacing.mt2} value={name} onChangeText={setName} placeholder="Display Name" width={inputWidth} />
      <Button onPress={next} text="Next" style={Spacing.my1} width={inputWidth} />
    </Page>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Colors.Accent,
    ...Typography.title
  }
})