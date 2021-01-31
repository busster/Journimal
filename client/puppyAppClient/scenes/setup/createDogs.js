import React, { useState } from 'react';

import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { useService } from '@xstate/react';
import { appService } from '../../machines/app'

export default ({ service }) => {
  const [dogName, setDogName] = useState('')
  const [dogs, setDogs] = useState([])
  const [state, send] = useService(service)

  const addDog = () => {
    setDogs([...dogs, {id: Date(), name: dogName}])
    setDogName('')
  }

  const removeDog = (id) => {
    setDogs(dogs.filter(d => d.id !== id))
  }

  const createDogs = () => {
    send('CREATE', { dogs: dogs.map(d => d.name) })    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Setup Dogs</Text>

      <View style={styles.inputView} >
        <TextInput
            style={styles.inputText}
            placeholder="Dog Name"
            placeholderTextColor="#003f5c"
            value={dogName}
            onChangeText={setDogName}/>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={addDog}>
        <Text style={styles.loginText}>Add Dog</Text>
      </TouchableOpacity>

      {
        dogs.map(dog => {
          return (
            <View style={styles.dog} key={dog.id}>
              <Text style={styles.dogTitle}>{ dog.name }</Text>
              <TouchableOpacity style={styles.dogRemove} onPress={() => removeDog(dog.id)}>
                <Text style={styles.dogRemoveText}>x</Text>
              </TouchableOpacity>
            </View>
          )
        })
      }
      <TouchableOpacity style={styles.loginBtn} onPress={createDogs}>
        <Text style={styles.loginText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dog: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dogTitle: {
    marginRight: 10,
    fontSize: 25,
    color: 'white'
  },
  dogRemove: {
    backgroundColor:"#fb5b5a",
    borderRadius:5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height:25,
    width: 25,
  },
  dogRemoveText: {
    fontSize: 10,
    color: 'white',
  },
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