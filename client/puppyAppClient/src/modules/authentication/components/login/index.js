import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import { Page, TextInput, Link, Button, Colors, TextColors, LogoIcon, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export default ({ navigation }) => {
  StatusBar.setBackgroundColor(Colors.Background)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [state, send] = useService(appService)

  const login = () => {
    send('LOGIN', { email, password })
  }

  const gotToPasswordReset = () => {
    navigation.push('PasswordReset')
  }

  const gotToSignup = () => {
    navigation.push('Signup')
  }

  const logoSize = wpw(.4)
  const inputWidth = wpw(.8)

  return (
    <Page centerX centerY style={styles.loginPage}>
      <LogoIcon width={logoSize} height={logoSize} />
      
      <Text style={[styles.title, Spacing.mt1]}>Journimal</Text>
      
      <TextInput style={Spacing.mt2} onChangeText={setEmail} placeholder="Email" width={inputWidth}/>
      <TextInput style={Spacing.mt1} onChangeText={setPassword} password placeholder="Password" width={inputWidth}/>
      
      <View style={{ ...styles.forgotPassword, width: inputWidth }}>
        <Link onPress={gotToPasswordReset} style={[Spacing.mt05]} variation="light" text="Forgot Password?"/>
      </View>

      <Button onPress={login} style={Spacing.mt1} text="Sign In" width={inputWidth}/>

      <View style={[styles.signup, Spacing.mt1]}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Link onPress={gotToSignup} style={[Spacing.ml025]} variation="primary" text="Sign Up"/>
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
  signupText: {
    color: TextColors.Disabled
  },
  signup: {
    display: 'flex',
    flexDirection: 'row'
  }
})