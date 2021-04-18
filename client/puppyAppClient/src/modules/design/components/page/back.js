import React from 'react';
import { Pressable } from 'react-native';

import { PageNamed } from 'modules/design/components/page/named'
import { ArrowLeftIcon } from 'modules/design/components/icons/arrow-left'

export const PageBack = ({ style, onBack, title, centerX, centerY, headerRight, children }) => {

  const left = (
    <Pressable onPress={onBack}>
      <ArrowLeftIcon width={25} height={25} />
    </Pressable>
  )

  return (
    <PageNamed
      style={style}
      headerLeft={left}
      title={title}
      headerRight={headerRight}
      centerX={centerX}
      centerY={centerY}
    >
      { children }
    </PageNamed>
  )
}
