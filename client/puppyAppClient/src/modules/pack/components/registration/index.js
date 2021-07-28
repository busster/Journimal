import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { PageBack, Checkbox, Button, Link, ArrowLeftIcon, Colors, Spacing, SpacingConstants, Typography, wpw } from 'modules/design'

import { useChildService } from 'modules/core/machines'

export default ({ navigation }) => {
  const [packState, packSend] = useChildService(state => state.context.activePackMachine);
  const [dogsToAdd, setDogsToAdd] = useState([]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleRegisterDogs = () => {
    packSend('ADD_DOGS', { dogsToAdd });
  }

  const handleCreateInviteCode = () => {
    packSend('CREATE_INVITE_CODE');
  }

  const { dogsToRegister } = packState.context;
  const disableAdd = dogsToAdd.length === 0;

  const widgetsWidth = wpw(.8) + SpacingConstants['1'] / 2;

  return (
    <PageBack
      onBack={goBack}
      title={`${packState.context.name} Registration`}
      style={styles.body}
    >
      {
        dogsToRegister.length > 0 ? (
          <View style={styles['quick-add']}>
            <Text style={styles['quick-add-title']}>Dogs</Text>
            {dogsToRegister.map(({ id, name }) => (
                <Checkbox
                  key={id}
                  label={name}
                  model={[dogsToAdd, setDogsToAdd]}
                  value={id}
                  width={widgetsWidth}
                  style={styles['quick-add-item']}
                />
              ))}
            <Button
              onPress={handleRegisterDogs}
              disabled={disableAdd}
              text='Register dogs in pack'
              width={widgetsWidth}
              height={60}
              style={styles['quick-add-action']}
            />
          </View>
        ) : null
      }
        <Link
          style={{
            ...styles.invite,
            width: widgetsWidth
          }}
          text="Create Invite Code"
          onPress={handleCreateInviteCode}
        />
    </PageBack>
  )
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    alignItems: 'flex-start',
    ...Spacing.p1
  },
  'quick-add-title': {
    color: Colors.Accent,
    fontWeight: 'bold',
    ...Typography.subTitle,
    ...Spacing.mb05
  },
  'quick-add-item': {
    ...Spacing.my025
  },
  'quick-add-action': {
    ...Spacing.mt1
  },
  invite: {
    alignItems: 'center',
  }
})