import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

import { AuthenticationRouter } from 'modules/authentication/router'
import { HomeRouter } from 'modules/home/router'

const Stack = createStackNavigator();

appService.start()

export const Router = (props) => {
  const [state, send] = useService(appService)

  if (state.matches('authenticating')) return (<AuthenticationRouter />)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeRouter" headerMode="none">
        <Stack.Screen name="HomeRouter" component={HomeRouter} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
