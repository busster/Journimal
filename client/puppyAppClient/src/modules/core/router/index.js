import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthenticationRouter } from 'modules/authentication/router'

const Stack = createStackNavigator();

export const Router = (props) => {

  return (<AuthenticationRouter />)
}
