import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Timeline from 'modules/dog/components/timeline'
import Profile from 'modules/dog/components/profile'

const Tab = createMaterialTopTabNavigator()

export const DogRouter = (props) => {
  return (
    <Tab.Navigator initialRouteName="DogTimeline" headerMode="none">
      <Tab.Screen name="DogTimeline" component={Timeline} />
      <Tab.Screen name="DogProfile" component={Profile} />
    </Tab.Navigator>
  )
}
