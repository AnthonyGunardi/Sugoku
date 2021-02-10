import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function TitleScreen({ navigation }) {
  const [name, setName] = useState('')
  const [diff, setDiff] = useState('')

  const pressHandler = (param) => {
    setDiff(param)
    Alert.alert(`You choose ${param.toUpperCase()} difficulty`, `Press ENTER To Continue`)
  }

  const navigationHandler = () => {
    (name && diff) ?
      navigation.navigate ('Home', {
        playerName: name,
        difficulty: diff
      }) :
      ((!name) ?
        Alert.alert(`Please Enter Your Username`) :
        Alert.alert(`Please Choose Difficulty`))
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 25 }}>SUGOKU</Text>
        <Text></Text>
        <Text style={{ color: 'white' }}>Enter Your Username Here</Text>
        <Text></Text>
        <TextInput style={styles.nameSetting} onChangeText={(input) => setName(input)} />
        <Text></Text>
        <View style={{ color: '#ffffff' }}>
          <View style={styles.standaloneRow}>
            <Text
              style={{ color: '#0000FF' }}
              onPress={() => pressHandler('easy')}>
                Easy 
            </Text>
            <Text
              style={{ color: '#008000' }}
              onPress={() => pressHandler('medium')}>
                Medium
            </Text>
            <Text
              style={{ color: '#FF0000' }}
              onPress={() => pressHandler('hard')}>
                Hard 
            </Text>
          </View>
        </View>
        <View>
          <Text></Text>
          <Button
            onPress={() => {
              navigationHandler()
            }}
            title="Enter"
            color="#203333"
          />
        </View>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203354',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameSetting: {
    color: '#fff',
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    fontSize: 20,
    width: 300,
    height: 40
  },
  standaloneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#203333',
    justifyContent: 'space-evenly',
    height: 50,
    width: 200
  }
});