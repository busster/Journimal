import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { Colors, Page, LogoIcon, Spacing, Typography, wpw } from 'modules/design'

// import { useService } from '@xstate/react';
// import { appService } from '../../machines/app'

export default ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const [state, send] = useService(appService)

  const login = () => {
    // send('LOGIN', { email, password })
  }

  const goToSignup = () => {
    // navigation.replace('Signup')
  }

  const logoSize = wpw(.4)

  return (
    <Page centerX style={styles.loginPage}>
      <LogoIcon style={[Spacing.my1]} width={logoSize} height={logoSize} />
      <Text style={styles.title}>Journimal</Text>

    </Page>
  )
}

const styles = StyleSheet.create({
  loginPage: {},
  title: {
    color: Colors.Accent,
    ...Typography.title
  }
})