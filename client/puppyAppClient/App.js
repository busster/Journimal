/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { DefaultTheme, DarkTheme } from './styles/themes'

import { Provider as PaperProvider } from 'react-native-paper';

import { Router } from './components/router';

export default class App extends React.Component {
  render () {
    return (
      <PaperProvider theme={DefaultTheme}>
        <StatusBar barStyle="dark-content" />
        <Router theme={DefaultTheme} />
      </PaperProvider>
    );
  }
}
