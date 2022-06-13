import { View,Pressable, Text, ImageBackground } from 'react-native'
import React from 'react'

import QuantitySelector from './QuantitySelector'

import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from '../styles/cartItem.component'

const CartItem = () => {

  const [item, setItem] = React.useState({name:'Baked beans',price:1.99,quantity:1,image:'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'})
  const [value, setValue] = React.useState('1')
  const [image, setImage] = React.useState('https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png')

  return (
    <View style={styles.container}>
      <Pressable 
        // style={({pressed}) => [styles.card,styles.editCard ,pressed ? styles.cardActive : null] }
        // onPress={() => navigation.navigate('Ajout Catégorie',{id})}
      >
       <ImageBackground style={styles.image} source={{uri:item.image}} imageStyle={styles.image} />
      </Pressable>

      <Text style={styles.text}> {item.name} </Text>

      <QuantitySelector value={value} setValue={setValue}/>
    </View>
  )
}

export default CartItem