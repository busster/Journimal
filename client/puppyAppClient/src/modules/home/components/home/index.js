import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { Page, Button, ProfileIcon, Spacing, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export default ({ navigation }) => {
  const [state, send] = useService(appService)

  const routeToProfile = () => {
    navigation.push('UserRouter')
  }

  const inputWidth = wpw(.8)

  return (
    <Page centerX>
      <View style={styles.header}>
        <Pressable onPress={routeToProfile}>
          <ProfileIcon style={[Spacing.m1]} width={25} height={25} />
        </Pressable>
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%'
  },
})