import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { Page, TextInput, Link, Well, Button, Colors, TextColors, Spacing, Typography, wpw, shade } from 'modules/design'

import { useService } from '@xstate/react'

export default ({ service }) => {
  const [name, setName] = useState('')
  const [dogs, setDogs] = useState([])

  const [state, send] = useService(service)

  useEffect(() => {
    const currentDogNames = state.context.dogNames
    setDogs(currentDogNames.map((name, index) => ({ id: index, name })))
  }, [])

  const addDog = () => {
    if (name.length <= 0) return
    setDogs([...dogs, { id: new Date().toString(), name }])
    setName('')
  }

  const removeDog = (dogId) => {
    setDogs(dogs.filter(({ id }) => id !== dogId))
  }

  const next = () => {
    if (dogs.length <= 0) return
    send('NEXT', { names: dogs.map(dog => dog.name) })
  }
  const back = () => {
    send('BACK')
  }


  const buttonWidth = wpw(.8)
  const inputWidth = buttonWidth - 60

  return (
    <Page centerX centerY>
      <Text style={[styles.title, Spacing.my1, { width: inputWidth }]}>Add Dogs</Text>

      <View style={[styles.addDogsContainer, Spacing.mt2, Spacing.mb1]}>
        <TextInput value={name} onChangeText={setName} placeholder="Dog Name" width={inputWidth} />
        <Button variation="minimal" onPress={addDog} text="+" style={Spacing.ml05} />
      </View>

      <Well>
        {dogs.map(({ id, name }) => (
          <View key={id} style={styles.dogContainer}>
            <Text style={styles.dog}>{ name }</Text>
            <Pressable onPress={() => removeDog(id)} style={styles.removeDogContainer}>
              <Text style={styles.removeDog}>X</Text>
            </Pressable>
          </View>))}
      </Well>

      <Button onPress={next} text="Next" style={Spacing.my1} width={buttonWidth} />
      <Link onPress={back} text="Back"/>
    </Page>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Colors.Accent,
    ...Typography.title
  },
  addDogsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dogContainer: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    ...Spacing.mb1,
    borderColor: shade(Colors.Background, -20),
    borderBottomWidth: 1,
  },
  dog: {
    color: Colors.Primary,
    ...Typography.tile,
    ...Spacing.mb1
  },
  removeDog: {
    color: Colors.Primary,
  },
  removeDogContainer: {
    borderWidth: 1,
    borderColor: Colors.Primary,
    borderRadius: 25,
    width: 25,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})