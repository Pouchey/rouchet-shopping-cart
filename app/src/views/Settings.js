import React from 'react'
import { View,Text} from 'react-native'
import DismissKeyboard from '../components/DismissKeyboard.js'
import styles from '../styles/global.component.js'

function Settings() {
  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
    </DismissKeyboard>
  )
}

export default Settings

