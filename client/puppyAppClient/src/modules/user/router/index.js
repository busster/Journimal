import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from 'modules/user/components/profile'

const Stack = createStackNavigator();

export const UserRouter = (props) => {

  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  )
}