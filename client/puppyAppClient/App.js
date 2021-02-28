/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View
} from 'react-native';

import { Router } from 'modules/core/router';

import { Page, Colors } from 'modules/design'

export default class App extends React.Component {
  render () {
    return (
      <Page style={styles.appContainer}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={Colors.Background}
          translucent={true}
        />
        <Router />
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  'appContainer': {
    paddingTop: StatusBar.currentHeight
  }
})
