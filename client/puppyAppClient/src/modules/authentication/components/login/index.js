import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { Colors } from 'modules/design/styles'
import { JButton } from 'modules/design/components/button'

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journimal</Text>
      <JButton onPress={login} text='Sign In' style={styles.login} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    width: "80%",
  },
  title: {
    color: Colors.Accent,
  }
});