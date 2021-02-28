import React from 'react';
import { StyleSheet } from 'react-native';

import { Page, Button, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export default ({ navigation }) => {
  const [state, send] = useService(appService)

  const logout = () => {
    send('LOGOUT')
  }

  const inputWidth = wpw(.8)

  return (
    <Page centerX centerY>
      <Button onPress={logout} width={inputWidth} text="logout"/>
    </Page>
  )
}

const styles = StyleSheet.create({
})