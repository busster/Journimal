import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { PageBack, Button, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

import { useChildService } from 'modules/core/machines'

import MembersView from './members';

export default ({ navigation }) => {
  const [packState, packSend] = useChildService(state => state.context.activePackMachine);

  console.log('PackState: ' + JSON.stringify(packState.value, null, 2))
  console.log('PackState Context: ' + JSON.stringify(packState.context, null, 2))

  const routeToHome = () => {
    navigation.push('HomeRouter');
  };

  const { members } = packState.context;
  const canAddMembers = packState.context.user.rank === 'Leader';

  const handlePressDog = ({ id, name }) => {
    navigation.push('DogRouter', { dogId: id, dog: { id, name } });
  }
  const handleAddMember = () => {
    packSend('ADD_MEMBER');
    navigation.push('PackRegistration')
  }

  return (
    <PageBack
      onBack={routeToHome}
      title={packState.context.name}
      style={styles.body}
      centerX
    >
      <MembersView
        members={members}
        canAddMembers={canAddMembers}
        handlePressDog={handlePressDog}
        handleAddMember={handleAddMember}
      />
    </PageBack>
  )
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'flex-end',
  }
})