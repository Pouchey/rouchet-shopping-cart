import React from 'react'
import { View,Text} from 'react-native'
import DismissKeyboard from '../components/DismissKeyboard.js'
import styles from '../styles/global.component.js'

function Cart() {
  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <Text>Cart</Text>
    </View>
    </DismissKeyboard>
  )
}

export default Cart

