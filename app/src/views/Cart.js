import React from 'react'
import { View,Text, FlatList} from 'react-native'
import DismissKeyboard from '../components/DismissKeyboard.js'
import styles from '../styles/global.component.js'

import CartItem from '../components/CartItem';

function Cart() {
  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <FlatList
        horizontal={false}
        style={{width:'100%'}}
        data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}, {key: 'g'}, {key: 'h'}, {key: 'i'}, {key: 'j'}, {key: 'k'}, {key: 'l'}, {key: 'm'}, {key: 'n'}, {key: 'o'}, {key: 'p'}, {key: 'q'}, {key: 'r'}, {key: 's'}, {key: 't'}, {key: 'u'}, {key: 'v'}, {key: 'w'}, {key: 'x'}, {key: 'y'}, {key: 'z'}]}
        initialNumToRender={10} 
        renderItem={({item}) => <CartItem item={item}></CartItem>}
      />

    </View>
    </DismissKeyboard>
  )
}

export default Cart

