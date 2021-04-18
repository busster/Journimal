import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from 'modules/authentication/components/login'
import Signup from 'modules/authentication/components/signup'
import PasswordReset from 'modules/authentication/components/passwordReset'

const Stack = createStackNavigator();

export const AuthenticationRouter = (props) => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="PasswordReset" component={PasswordReset} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}