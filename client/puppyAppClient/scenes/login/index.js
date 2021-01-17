import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { useService } from '@xstate/react';
import { appService } from '../../machines/app'

// import auth from '@react-native-firebase/auth';


// auth().onAuthStateChanged((user) => {
//   if (user) {
//     user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
//       console.log('idToken: ', idToken)
//     }).catch(function(error) {
//       // Handle error
//     });
//   }
// });

export default ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [state, send] = useService(appService)

  const login = () => {
    send('LOGIN', { email, password })
  }

  const goToSignup = () => {
    navigation.replace('Signup')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Journimal</Text>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Email..." 
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}/>
      </View>
      <View style={styles.inputView} >
        <TextInput  
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..." 
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}/>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupBtn} onPress={goToSignup}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  )
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