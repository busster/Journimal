import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef, routeRef } from 'modules/core/router/ref'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

import Splash from 'modules/core/components/splash'

import { AuthenticationRouter } from 'modules/authentication/router'
import { SetupRouter } from 'modules/user/router/setup'
import { HomeRouter } from 'modules/home/router'
import { UserRouter } from 'modules/user/router'
import { DogRouter } from 'modules/dog/router'
import { PackRouter } from 'modules/pack/router'

const Stack = createStackNavigator()

appService.start()

// const pickEvent = (route) => {
//   switch (route.name) {
//     case 'DogTimeline':
//       return 'GO_TO_DOG'
//     case 'PackProfile':
//       return 'GO_TO_PACK'
//     default:
//       return 'GO_TO_HOME'
//   }
// }

export const Router = (props) => {
  const [state, send] = useService(appService)

  // const setupRouterMachineSync = () => {
  //   const currentRoute = navigationRef.current.getCurrentRoute()
  //   routeRef.current = currentRoute
  //   // send(pickEvent(currentRoute), currentRoute.params)
  //   console.log('================================== SETUP')
  // }

  // const syncRouterMachine = () => {
  //   const previousRoute = routeRef.current
  //   const currentRoute = navigationRef.current.getCurrentRoute()

  //   // send(pickEvent(currentRoute), currentRoute.params)
  //   console.log('================================= SYNC', previousRoute)
  //   console.log('================================= SYNC', currentRoute)
  //   routeRef.current = currentRoute
  // }

  if (state.matches('authenticating')) {
    return (<AuthenticationRouter />)
  } else if (state.matches('identifying')) {
    return (<SetupRouter />)
  } else if (state.matches('identified')) {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="HomeRouter" headerMode="none">
          <Stack.Screen name="HomeRouter" component={HomeRouter} />
          <Stack.Screen name="UserRouter" component={UserRouter} />
          <Stack.Screen name="DogRouter" component={DogRouter} />
          <Stack.Screen name="PackRouter" component={PackRouter} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (<Splash/>)
  }
}
