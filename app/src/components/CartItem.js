import { View,Pressable, Text, ImageBackground } from 'react-native'
import React from 'react'
import {API_URL} from '@env'
import QuantitySelector from './QuantitySelector'

import styles from '../styles/cartItem.component'

const CartItem = ({item}) => {

  const [value, setValue] = React.useState(item.quantity.toString())

  const updateQuantity = () => {
    fetch(`${API_URL}/api/item/${item.id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        quantity: value
      })
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    updateQuantity();
  }, [value])


  return (
    <View style={styles.container}>
      <Pressable 
        // style={({pressed}) => [styles.card,styles.editCard ,pressed ? styles.cardActive : null] }
        // onPress={() => navigation.navigate('Ajout Catégorie',{id})}
      >
       <ImageBackground style={styles.image} source={{uri:`${API_URL}/${item.image}?${new Date()/*avoiding cache*/}`}} imageStyle={styles.image} />
      </Pressable>

      <Text style={styles.text}> {item.name} </Text>

      <QuantitySelector value={value} setValue={setValue}/>
    </View>
  )
}

export default CartItem