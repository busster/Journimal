import React from 'react';

import CreateUser from 'modules/user/components/setup/createUser'
import CreateDogs from 'modules/user/components/setup/createDogs'
import CreatePack from 'modules/user/components/setup/createPack'

import Splash from 'modules/core/components/splash'

import { useService } from '@xstate/react'

export const SetupUser = ({ service }) => {

  const [state, send] = useService(service)

  if (state.matches('createUser')) return (<CreateUser service={service} />)
  else if (state.matches('createDogs')) return (<CreateDogs service={service} />)
  else if (state.matches('createPack')) return (<CreatePack service={service} />)
  else return (<Splash />)
}