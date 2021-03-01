import React from 'react';
import { StyleSheet, View, Pressable, ScrollView, Text } from 'react-native';

import { Page, Button, ProfileIcon, Spacing, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export default ({ navigation }) => {
  const [state, send] = useService(appService)

  const routeToProfile = () => {
    navigation.push('UserRouter')
  }

  const inputWidth = wpw(.8)

  return (
    <Page centerX>
      <View style={styles.header}>
        <Pressable onPress={routeToProfile}>
          <ProfileIcon style={[Spacing.m1]} width={25} height={25} />
        </Pressable>
      </View>
      <View style={{ width: "100%"}}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 25, ...Spacing.m1}}>Dogs</Text>
        <ScrollView horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{display: 'flex', ...Spacing.pr05, ...Spacing.pl1}}>
            <View style={{width: 150, height: 150, backgroundColor: '#fff', borderRadius: 5}}></View>
            <Text style={{color: '#fff', fontSize:15, ...Spacing.mt025}}>Slater</Text>
          </View>

          <View style={{display: 'flex', ...Spacing.px05}}>
            <View style={{width: 150, height: 150, backgroundColor: '#fff', borderRadius: 5}}></View>
            <Text style={{color: '#fff', fontSize:15, ...Spacing.mt025}}>Slater</Text>
          </View>

          <View style={{display: 'flex', ...Spacing.pl05, ...Spacing.pr1}}>
            <View style={{width: 150, height: 150, backgroundColor: '#fff', borderRadius: 5}}></View>
            <Text style={{color: '#fff', fontSize:15, ...Spacing.mt025}}>Slater</Text>
          </View>

        </ScrollView>
      </View>

      <View style={{ width: "100%"}}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 25, ...Spacing.m1}}>Packs</Text>
        <ScrollView horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{display: 'flex', ...Spacing.pr05, ...Spacing.pl1}}>
            <View style={{width: 150, height: 150, backgroundColor: '#fff', borderRadius: 5}}></View>
            <Text style={{color: '#fff', fontSize:15, ...Spacing.mt025}}>Busster</Text>
          </View>

          <View style={{display: 'flex', ...Spacing.px05}}>
            <View style={{width: 150, height: 150, backgroundColor: '#fff', borderRadius: 5}}></View>
            <Text style={{color: '#fff', fontSize:15, ...Spacing.mt025}}>Busster</Text>
          </View>

          <View style={{display: 'flex', ...Spacing.pl05, ...Spacing.pr1}}>
            <View style={{width: 150, height: 150, backgroundColor: '#fff', borderRadius: 5}}></View>
            <Text style={{color: '#fff', fontSize:15, ...Spacing.mt025}}>Busster</Text>
          </View>

        </ScrollView>
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%'
  },
})