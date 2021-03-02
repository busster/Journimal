import React from 'react';
import { StyleSheet, View, Pressable, ScrollView, Text } from 'react-native';

import { PageNamed, Button, ProfileIcon, Tile, Spacing, Colors, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export default ({ navigation }) => {
  const [state, send] = useService(appService)

  const dogs = state.context.user.dogs

  const packs = state.context.user.packs

  const routeToProfile = () => {
    navigation.push('UserRouter')
  }

  const handlePressDog = (dog) => {
    send('GO_TO_DOG', { dog })
    navigation.push('DogRouter')
  }

  const handlePressPack = (pack) => {
    send('GO_TO_PACK', { pack })
    navigation.push('PackRouter')
  }

  const headerRight = (
    <Pressable onPress={routeToProfile}>
      <ProfileIcon width={25} height={25} />
    </Pressable>
  )

  const getStylesForTile = (index, start, end) => {
    if (index === start) {
      return {...Spacing.pr05, ...Spacing.pl1}
    } else if (index === end) {
      return {...Spacing.pl05, ...Spacing.pr1}
    } else {
      return {...Spacing.px05}
    }
  }

  return (
    <PageNamed centerX headerRight={headerRight}>
      <View style={styles['scroll-container']}>
        <Text style={styles['tile__title']}>Dogs</Text>
        <ScrollView horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false}>
          {dogs.map((dog, index) => {
              return (
                <Pressable key={dog.id} onPress={() => handlePressDog(dog)}>
                  <Tile style={getStylesForTile(index, 0, dogs.length - 1)} title={dog.name} />
                </Pressable>
              )
            })}
        </ScrollView>
      </View>

      <View style={styles['scroll-container']}>
        <Text style={styles['tile__title']}>Packs</Text>
        <ScrollView horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false}>
        {packs.map((pack, index) => {
            return (
              <Pressable key={pack.id} onPress={() => handlePressPack(pack)}>
                <Tile style={getStylesForTile(index, 0, packs.length - 1)} title={pack.name} />
              </Pressable>
            )
          })}
        </ScrollView>
      </View>
    </PageNamed>
  )
}

const styles = StyleSheet.create({
  'scroll-container': {
    width: '100%'
  },
  'tile__title': {
    color: Colors.Accent,
    fontWeight: 'bold',
    ...Typography.subTitle,
    ...Spacing.m1,
    ...Spacing.mb05
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%'
  },
})