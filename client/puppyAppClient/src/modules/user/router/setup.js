import React from 'react';

import CreateUser from 'modules/user/components/setup/createUser'
import CreateDogs from 'modules/user/components/setup/createDogs'
import CreatePack from 'modules/user/components/setup/createPack'

import Splash from 'modules/core/components/splash'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

export const SetupRouter = (props) => {
  const [state, send] = useService(appService)

  const identifyUserMachine = state.children.identifyUserMachine
  const [setupState] = useService(identifyUserMachine)

  if (setupState.matches('setup.createUser') || setupState.matches('setup.createUserService')) return (<CreateUser service={identifyUserMachine} />)
  else if (setupState.matches('setup.createDogs') || setupState.matches('setup.createDogsService')) return (<CreateDogs service={identifyUserMachine} />)
  else if (setupState.matches('setup.createPack') || setupState.matches('setup.createPackService')) return (<CreatePack service={identifyUserMachine} />)
  else return (<Splash />)
}