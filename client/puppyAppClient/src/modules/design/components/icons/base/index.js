import React from 'react';
import { View } from 'react-native'
import { Svg, SvgUri } from 'react-native-svg'

import { useMachine } from '@xstate/react'

import { createLoaderMachine } from 'modules/design/components/icons/loader'


export const Icon = ({ style, width = "50", height = "50", icon }) => {
  const [state, send] = useMachine(createLoaderMachine(icon))

  const svg = state.matches('loaded') ?
    (<SvgUri width={width} height={height} uri={state.context.iconUri} />) :
    (<Svg width={width} height={height} />)

  return (<View style={style}>
    { svg }
  </View>)
}
