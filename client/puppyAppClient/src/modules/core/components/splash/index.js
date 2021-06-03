import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';

import { Page } from 'modules/design'

import { Storage } from '@/utils/storage'

const loadSplashUri = async () => await Storage.loadRefUriFromUrl(`/splash/Digging.gif`)

export default () => {
  const [splashUri, setSplashUri] = useState(null)
  useEffect(() => {
    (async () => {
      const uri = await Storage.loadRefUriFromUrl(`/splash/Digging.gif`)
      setSplashUri(uri)
    })()
  }, [])
  return (
    <Page centerX centerY>
      <Image style={styles.splashImage} source={{ uri: splashUri }} />
    </Page>
  )
}

const styles = StyleSheet.create({
  splashImage: {
    width: '100%',
    height: '100%'
  }
})