// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
import React from 'react'
import { View,Text, Button} from 'react-native'
import DismissKeyboard from '../components/DismissKeyboard.js'
import styles from '../styles/global.component.js'

function Settings() {


  const test = () => { 
    console.log("requesting")
    fetch('http://192.168.1.76:5050/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    }
    )
  }

  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button 
        title="Test"
        onPress={() => test() }      
      />
    </View>
    </DismissKeyboard>
  )
}

export default Settings

