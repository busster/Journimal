import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Timeline from 'modules/dog/components/timeline'
import Profile from 'modules/dog/components/profile'
import Loading from 'modules/dog/components/loading'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

import { dogMachineName } from 'modules/dog/machines'

const Stack = createStackNavigator();

export const DogRouter = ({ route, navigation }) => {
  const [state, send] = useService(appService)
  const { dogId, dog } = route.params

  useEffect(() => {
    send('SET_ACTIVE_DOG', { dogId, dog })
  }, [ dogId ])

  const activeDogMachine = state.context.activeDogMachine
  const dogLoaded = activeDogMachine && activeDogMachine.id === dogMachineName(dogId)
  if (dogLoaded) {
    return (
      <Stack.Navigator initialRouteName="Timeline" headerMode="none">
        <Stack.Screen name="Timeline" component={Timeline} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    )
  } else {
    return (
      <Stack.Navigator initialRouteName="Loading" headerMode="none">
        <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>
    )
  }
}
