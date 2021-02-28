import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Page, TextInput, Link, Colors, TextColors, LogoIcon, Spacing, Typography, wpw } from 'modules/design'

// import { useService } from '@xstate/react';
// import { appService } from '../../machines/app'

export default ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const [state, send] = useService(appService)

  const login = () => {
    // send('LOGIN', { email, password })
  }

  const gotToLogin = () => {
    navigation.push('Login')
  }

  const inputWidth = wpw(.8)

  return (
    <Page centerX centerY style={styles.loginPage}>
      <Text style={[styles.title, Spacing.mt1, { width: inputWidth }]}>Create Account</Text>
      <TextInput style={Spacing.mt2} onChangeText={setEmail} placeholder="Email" width={inputWidth}/>
      <TextInput style={Spacing.mt1} onChangeText={setPassword} password placeholder="Password" width={inputWidth}/>

      <View style={[styles.signin, Spacing.mt1]}>
        <Text style={styles.signinText}>Already have an account?</Text>
        <Link onPress={gotToLogin} style={[Spacing.ml025]} variation="primary" text="Sign In"/>
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  loginPage: {},
  title: {
    color: Colors.Accent,
    ...Typography.title
  },
  forgotPassword: {
    alignItems: 'flex-end',
  },
  signinText: {
    color: TextColors.Disabled
  },
  signin: {
    display: 'flex',
    flexDirection: 'row'
  }
})