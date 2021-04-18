import React from 'react'
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef()
export const routeRef = React.createRef()
export const paramsRef = React.createRef()
export const navigate = (name, params) => {
  navigationRef.current.navigate(name, params)
}
export const push = (...args) => {
  paramsRef.current = args[1] 
  navigationRef.current.dispatch(StackActions.push(...args))
}
