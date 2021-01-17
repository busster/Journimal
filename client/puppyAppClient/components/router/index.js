import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { useService } from '@xstate/react';
import { appService } from '../../machines/app'
appService.start()

import LoginScene from '../../scenes/login'
import SignupScene from '../../scenes/signup'

import HomeScene from '../../scenes/home'

import SetupScene from '../../scenes/setup'

import SplashScene from '../../scenes/splash'

const Stack = createStackNavigator();

export const Router = (props) => {
  const [state] = useService(appService)

  if (state.matches('identifying')) {
    return (
      <SplashScene></SplashScene>
    );
  }

  if (state.matches('authenticating')) {
    return (
      <NavigationContainer theme={props.theme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScene} />
          <Stack.Screen name="Signup" component={SignupScene} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (state.matches('setup')) {
    return (
      <SetupScene></SetupScene>
    );
  }

  return (
    <NavigationContainer theme={props.theme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScene} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
