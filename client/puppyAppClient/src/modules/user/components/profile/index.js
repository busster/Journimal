import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { Page, Button, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export default ({ navigation }) => {
  const [state, send] = useService(appService)

  const logout = () => {
    send('LOGOUT')
  }

  const routeToHome = () => {
    navigation.push('HomeRouter')
  }

  const inputWidth = wpw(.8)

  return (
    <Page centerX>
      <View style={styles.header}>
        <Pressable onPress={routeToHome}>
          <ArrowLeftIcon style={[Spacing.m1]} width={25} height={25} />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, Typography.navigationTitle]}>{ state.context.user.name }</Text>
        </View>
        <View style={{width: 25, height: 25, ...Spacing.m1}} />
      </View>
      <View style={styles.body}>
        <Button onPress={logout} style={[Spacing.m1]} width={inputWidth} text="logout"/>
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.Accent,

  },
  body: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
})