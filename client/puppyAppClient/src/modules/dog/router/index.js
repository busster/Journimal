import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DogProfile from 'modules/dog/components/profile'

const Stack = createStackNavigator();

export const DogRouter = (props) => {
  return (
    <Stack.Navigator initialRouteName="DogProfile" headerMode="none">
      <Stack.Screen name="DogProfile" component={DogProfile} />
    </Stack.Navigator>
  )
}
