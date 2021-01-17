import React from 'react';

import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { useService } from '@xstate/react';
import { appService } from '../../machines/app'

import CreateUserScene from './createUser'

export default ({ navigation }) => {
  const [state, send] = useService(appService)
  const [setupState, setupSend] = useService(state.children.setupAccountMachine)

  if (setupState.matches('createUser')) {
    return (<CreateUserScene service={setupState.children.createUserMachine} />)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  signupBtn:{
    width:"80%",
    backgroundColor:"transparent",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
  },
  loginText:{
    color:"white"
  }
});