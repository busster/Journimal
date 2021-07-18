import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { PageBack, Button, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

import { useChildService } from 'modules/core/machines'

import MembersView from './members';

export default ({ navigation }) => {
  const [packState, packSend] = useChildService(state => state.context.activePackMachine);

  console.log('PackState Context: ' + JSON.stringify(packState.context, null, 2))

  const routeToHome = () => {
    navigation.goBack();
  };

  const { members } = packState.context;

  return (
    <PageBack
      onBack={routeToHome}
      title={packState.context.name}
      style={styles.body}
      centerX
    >
      <MembersView members={members} canAddMembers={true} />
    </PageBack>
  )
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'flex-end',
  }
})