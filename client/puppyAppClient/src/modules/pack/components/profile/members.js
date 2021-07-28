import React from 'react';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';

import { Grid, Tile, PageBack, Button, ButtonIconCircle, ButtonFloating, ArrowLeftIcon, Colors, shade, Spacing, Typography, wpw, wph } from 'modules/design'

export default ({
  members,
  handlePressDog,
  handleAddMember,
  canAddMembers = false,
}) => {
  const handlePressMember = ({ id, type, name, }) => {
    switch (type) {
      case 'Dog':
        handlePressDog({ id, name })
        break;
      case 'Human':
        break;
    }
  }

  const renderItem = ({ item, size }) => {
    const { id, type, name, addMemberButton } = item;

    if (addMemberButton) {
      return (
        <Button
          key={id}
          typography={Typography.buttonBig}
          variation='minimal'
          text='+'
          height={size - 26}
          width={size - 2}
          onPress={handleAddMember}
        />
      );
    }

    return (
      <Pressable
        styles={{ height:size, width:size, ...styles.member }}
        key={id}
        onPress={() => handlePressMember({ id, type, name, })}
      >
        <Tile title={name} height={size - 26} width={size - 2} />
      </Pressable>
    );
  }

  let data = members

  if (canAddMembers) {
    data = data.concat({ addMemberButton: true })
  }

  return (
    <Grid
      data={data}
      renderItem={renderItem}
      numColumns={2}
      gridSpace={10}
      keyExtractor={item => item.id}
    />
  )
}

const styles = StyleSheet.create({
  member: {
    // ...Spacing.mx05,
    // backgroundColor: Colors.Primary,
    // flex: 1,
    // flexDirection: 'column',
    // margin: 1
  }
  // header: {
  //   color: Colors.Accent,
  //   ...Typography.navigationTitle,
  //   ...Spacing.mx1,
  //   ...Spacing.mt1,
  //   ...Spacing.mb05
  // },
  // entry: {
  //   flex: 1,
  //   flexDirection: 'row',
  // },
  // activities: {
  //   flex: 0.4,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  // },
  // events: {
  //   flex: 0.4,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // eventsWrapper: {
  //   flexShrink: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap'
  // },
  // icon: {
  //   ...Spacing.mx025,
  //   ...Spacing.my025
  // },
  // dateContainer: {
  //   flex: 0.2,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // date: {
  //   color: Colors.Accent,
  // },
  // separator: {
  //   height: 1,
  //   backgroundColor: shade(Colors.Background, -10),
  //   ...Spacing.mt1
  // }
})