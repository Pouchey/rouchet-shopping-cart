import { View,Pressable, Text, ImageBackground,Animated } from 'react-native'
import React from 'react'
import {API_URL} from '@env'
import QuantitySelector from './QuantitySelector'
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/cartItem.component'
import { useTheme } from '@react-navigation/native'


const renderRightActions = ({navigation,item}) => {
  return (
    <View style={styles.rightAction}>
      <Pressable style={styles.deleteAction} 
      >
        <Ionicons name="trash" size={30} color="white" />
        <Text style={styles.textAction}>Delete</Text>
      </Pressable>
      <Pressable style={styles.editAction}    
          // Redirect to the edit Product screen
          onPress={() => navigation.navigate('Home',{screen:'Modification Produit',params:{
            id:item.id,
            name:item.name,
            image:item.image,
            quantity:item.quantity,
            minQuantity:item.minQuantity,
          }
        })}
      >
        <Ionicons name="md-create" size={30} color="white" />
        <Text style={styles.textAction}>Edit</Text>
      </Pressable>
    </View>
  );
}


const CartItem = ({item,navigation}) => {

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

  const colors = useTheme().colors;


  return (
    <Swipeable renderRightActions={() => renderRightActions({navigation,item})}>
    <View
      style={styles.container}
    >
      <View style={styles.content}>
      <Pressable 
        // style={({pressed}) => [styles.card,styles.editCard ,pressed ? styles.cardActive : null] }
        // onPress={() => navigation.navigate('Ajout Catégorie',{id})}
      >
       <ImageBackground style={styles.image} source={{uri:`${API_URL}/${item.image}?${new Date()/*avoiding cache*/}`}} imageStyle={styles.image} />
      </Pressable>

      <Text style={[styles.label,{color:colors.text}]}> {item.name} </Text>

      <QuantitySelector value={value} setValue={setValue}/>
      </View>
      {
      item && item.quantity < item.minQuantity &&
      <View style={styles.info}>
        <Text style={styles.text}> 
          Quantité à acheter : <Text style={[styles.text,styles.bold]}>{ item.minQuantity - item.quantity}</Text>
        </Text>
      </View>
      }
    </View>
    </Swipeable>
  )
}

export default CartItem