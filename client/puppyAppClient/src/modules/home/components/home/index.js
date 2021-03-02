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

  const handlePressDog = (dogId) => {}

  const handlePressPack = (packId) => {}

  const headerRight = (
    <Pressable onPress={routeToProfile}>
      <ProfileIcon width={25} height={25} />
    </Pressable>
  )

  return (
    <PageNamed centerX headerRight={headerRight}>
      <View style={styles['scroll-container']}>
        <Text style={styles['tile__title']}>Dogs</Text>
        <ScrollView horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false}>
          {
            dogs.map((dog, index) => {
              let s = {...Spacing.px05}
              if (index === 0) {
                s = {...Spacing.pr05, ...Spacing.pl1}
              } else if (index === dogs.length - 1) {
                s = {...Spacing.pl05, ...Spacing.pr1}
              }
              return (
                <Pressable key={dog.id} onPress={() => handlePressDog(dog.id)}>
                  <Tile style={s} title={dog.name} />
                </Pressable>
              )
            })
          }
        </ScrollView>
      </View>

      <View style={styles['scroll-container']}>
        <Text style={styles['tile__title']}>Packs</Text>
        <ScrollView horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false}>
        {
          packs.map((pack, index) => {
            let s = {...Spacing.px05}
            if (index === 0) {
              s = {...Spacing.pr05, ...Spacing.pl1}
            } else if (index === packs.length - 1) {
              s = {...Spacing.pl05, ...Spacing.pr1}
            }
            return (
              <Pressable key={pack.id} onPress={() => handlePressPack(pack.id)}>
                <Tile style={s} title={pack.name} />
              </Pressable>
            )
          })
        }
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