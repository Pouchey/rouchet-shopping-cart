import React from 'react'
import { View,Pressable,Image,FlatList} from 'react-native'

import styles from '../styles/collections.component'

import Ionicons from 'react-native-vector-icons/Ionicons';

const CollectionCard = ({id,name,image,navigation}) => {
  
  return (

    name === 'Add' 
    ?
    
      <Pressable 
        style={({pressed}) => [styles.card,styles.addCard ,pressed ? styles.buttonActive : null] }
        onPress={() => navigation.navigate('Ajout Catégorie',{id})}
      >
        <Ionicons name="add" size={100} color="white" />
      </Pressable>
    :
      <Pressable 
        style={({pressed}) => [styles.card ,pressed ? styles.buttonActive : null] } 
        onPress={() => navigation.navigate('Catégorie',{id})} 
      >
        <Image style={styles.image} source={require('../assets/images/event-manager.png')} />
      </Pressable>
  )
}


const Collections = ({navigation}) => {

  const fakeData = [
    {id:1,name:'Banana'},
    {id:2,name:'Apple'},
    {id:3,name:'Orange'},
    {id:4,name:'Grape'},
    {id:5,name:'Strawberry'},
    {id:6,name:'Mango'},
  ]

  return (
    <FlatList 
        numColumns={2}                  // set number of columns 
        columnWrapperStyle={styles.row}  // space them out evenly
        
        data={[...fakeData, {id:-1,name:'Add'}]}
        keyExtractor={(item, index) => item.id }
        renderItem={({item}) => <CollectionCard navigation={navigation} id={item.id} name={item.name} image={item.image}/> }
    />       


  )
}

export default Collections