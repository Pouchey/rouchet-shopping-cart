import React from 'react'
import {Pressable,Image,FlatList} from 'react-native'

import styles from '../styles/collections.component'

import Ionicons from 'react-native-vector-icons/Ionicons';

import fakeData from '../test/data'

const CollectionCard = ({id,name,image,navigation}) => {
  
  return (

    name === 'Add' 
    ?
    
      <Pressable 
        style={({pressed}) => [styles.card,styles.editCard ,pressed ? styles.cardActive : null] }
        onPress={() => navigation.navigate('Ajout Catégorie',{id})}
      >
        <Ionicons name="add" size={100} color="white" />
      </Pressable>
    :
      <Pressable 
        style={({pressed}) => [styles.card ,pressed ? styles.cardActive : null] } 
        onPress={() => navigation.navigate('Catégorie',{id})} 
        onLongPress={() => navigation.navigate('Modification Catégorie',{id})}
      >
        <Image style={styles.image} source={{uri:image}} />
      </Pressable>
  )
}


const Collections = ({navigation}) => {

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