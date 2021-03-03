import React from 'react';

import { SetupUser } from 'modules/user/components/setup'

import Splash from 'modules/core/components/splash'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export const SetupRouter = (props) => {
  const [state, send] = useService(appService)

  const identifyUserMachine = state.children.identifyUserMachine
  const [identifyState] = useService(identifyUserMachine)
  const setupUserMachine = identifyState.children.setupUserMachine

  if (identifyState.matches('setup')) return (<SetupUser service={setupUserMachine} />)
  else return (<Splash />)
}