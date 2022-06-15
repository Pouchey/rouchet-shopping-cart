// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
import React from 'react'
import { View,Text, Button} from 'react-native'
import DismissKeyboard from '../components/DismissKeyboard.js'
import styles from '../styles/global.component.js'

function Settings() {


  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button 
        title="Test"
        onPress={() => console.log('test')}    
      />
    </View>
    </DismissKeyboard>
  )
}

export default Settings

