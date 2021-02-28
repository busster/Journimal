import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

import Splash from 'modules/core/components/splash'

import { AuthenticationRouter } from 'modules/authentication/router'
import { HomeRouter } from 'modules/home/router'
import { UserRouter } from 'modules/user/router'

const Stack = createStackNavigator();

appService.start()

export const Router = (props) => {
  const [state, send] = useService(appService)

  if (state.matches('authenticating')) {
    return (<AuthenticationRouter />)
  } else if (state.matches('identified')) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeRouter" headerMode="none">
          <Stack.Screen name="HomeRouter" component={HomeRouter} />
          <Stack.Screen name="UserRouter" component={UserRouter} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (<Splash/>)
  }
}
