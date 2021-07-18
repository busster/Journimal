import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PackProfile from 'modules/pack/components/profile'
import Loading from 'modules/pack/components/loading'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

import { packMachineName } from 'modules/pack/machines'

const Stack = createStackNavigator();

export const PackRouter = ({ route, navigation }) => {
  const [state, send] = useService(appService)
  const { packId, pack } = route.params

  useEffect(() => {
    send('SET_ACTIVE_PACK', { packId, pack, navigation })
  }, [ packId ]);

  const activePackMachine = state.context.activePackMachine
  const packLoaded = activePackMachine && activePackMachine.id === packMachineName(packId)
  if (packLoaded) {
    return (
      <Stack.Navigator initialRouteName="PackProfile" headerMode="none">
        <Stack.Screen name="PackProfile" component={PackProfile} />
      </Stack.Navigator>
    )
  } else {
    return (
      <Stack.Navigator initialRouteName="PackLoading" headerMode="none">
        <Stack.Screen name="PackLoading" component={Loading} />
      </Stack.Navigator>
    )
  }
}
