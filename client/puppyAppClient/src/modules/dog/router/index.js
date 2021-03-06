import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Timeline from 'modules/dog/components/timeline'
import Profile from 'modules/dog/components/profile'

const Stack = createStackNavigator();

export const DogRouter = (props) => {
  return (
    <Stack.Navigator initialRouteName="DogTimeline" headerMode="none">
      <Stack.Screen name="DogTimeline" component={Timeline} />
      <Stack.Screen name="DogProfile" component={Profile} />
    </Stack.Navigator>
  )
}
