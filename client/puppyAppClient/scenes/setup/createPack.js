import React, { useState } from 'react';

import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { useService } from '@xstate/react';
import { appService } from '../../machines/app'

export default ({ service }) => {
  const [name, setName] = useState('')
  const [state, send] = useService(service)

  const createPack = () => {
    send('CREATE', { name })    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Setup User</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Pack Name" 
          placeholderTextColor="#003f5c"
          onChangeText={setName}/>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={createPack}>
        <Text style={styles.loginText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
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