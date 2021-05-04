import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

import { PageBack, Button, ButtonFloating, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

import { navigationRef } from 'modules/core/router/ref'

export default ({ route, navigation }) => {
  const routeToHome = () => {
    navigationRef.current.goBack()
  }

  return (
    <PageBack
      onBack={routeToHome}
      style={styles.timelinePage}
    >
    </PageBack>
  )
}

const styles = StyleSheet.create({
})