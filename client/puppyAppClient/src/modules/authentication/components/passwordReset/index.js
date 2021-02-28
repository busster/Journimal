import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Page, TextInput, Link, Colors, TextColors, LogoIcon, Spacing, Typography, wpw } from 'modules/design'

// import { useService } from '@xstate/react';
// import { appService } from '../../machines/app'

export default ({ navigation }) => {
  const [email, setEmail] = useState('')

  // const [state, send] = useService(appService)

  const resetPassword = () => {
    // send('LOGIN', { email, password })
  }

  const gotToLogin = () => {
    navigation.replace('Login')
  }

  const inputWidth = wpw(.8)

  return (
    <Page centerX centerY style={styles.resetPasswordPage}>
      <Text style={[styles.title, Spacing.my1, { width: inputWidth }]}>Reset Password</Text>
      <TextInput style={Spacing.mt2} onChangeText={setEmail} placeholder="Email" width={inputWidth}/>
      <View style={[styles.login, Spacing.mt1]}>
        <Text style={styles.loginText}>Remember your password?</Text>
        <Link onPress={gotToLogin} style={[Spacing.ml025]} variation="primary" text="Sign In"/>
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  resetPasswordPage: {},
  title: {
    color: Colors.Accent,
    ...Typography.title
  },
  loginText: {
    color: TextColors.Disabled
  },
  login: {
    display: 'flex',
    flexDirection: 'row'
  }
})