import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PackProfile from 'modules/pack/components/profile';
import PackRegistration from 'modules/pack/components/registration';
import Loading from 'modules/pack/components/loading';

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

  const activePackMachine = state.context.activePackMachine;
  const packLoaded = activePackMachine && activePackMachine.id === packMachineName(packId);

  if (packLoaded) {
    useEffect(() => {
      const subscription = activePackMachine.subscribe(state => {
        if (state.matches('views.profile')) {
          navigation.navigate('PackProfile')
        } else if (state.matches('views.registration')) {
          navigation.navigate('PackRegistration')
        }
      })
    }, [activePackMachine, navigation])

    return (
      <Stack.Navigator initialRouteName="PackProfile" headerMode="none">
        <Stack.Screen name="PackProfile" component={PackProfile} />
        <Stack.Screen name="PackRegistration" component={PackRegistration} />
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
