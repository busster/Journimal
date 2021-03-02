import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PackProfile from 'modules/pack/components/profile'

const Stack = createStackNavigator();

export const PackRouter = (props) => {
  return (
    <Stack.Navigator initialRouteName="PackProfile" headerMode="none">
      <Stack.Screen name="PackProfile" component={PackProfile} />
    </Stack.Navigator>
  )
}
