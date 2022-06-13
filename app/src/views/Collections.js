import React from 'react'
import {Pressable,ImageBackground,FlatList} from 'react-native'

import styles from '../styles/collections.component'

import Ionicons from 'react-native-vector-icons/Ionicons';

import fakeData from '../test/data'


const CollectionCard = ({id,name,image,navigation}) => {
  
  return (

    name === 'Add' 
    ?
    
      <Pressable 
        style={({pressed}) => [styles.card,styles.editCard ,pressed ? styles.cardActive : null] }
        onPress={() => navigation.navigate('Ajout Catégorie',{
          id:id,
        })}
      >
        <Ionicons name="add" size={100} color="white" />
      </Pressable>
    :
      <Pressable 
        style={({pressed}) => [styles.card ,pressed ? styles.cardActive : null] } 
        onPress={() => navigation.navigate('Catégorie',{
          id:id,
          name:name,
        })} 
        onLongPress={() => navigation.navigate('Modification Catégorie',{
          id:id,
          image:image,
          name:name,
        })}
      >
        <ImageBackground style={styles.image} source={{uri:image}} imageStyle={styles.image} />
      </Pressable>
  )
}


const Collections = ({navigation}) => {

  return (
    <FlatList 
        numColumns={2}                  // set number of columns 
        columnWrapperStyle={styles.row}  // space them out evenly
        initialNumToRender={10}         // set initial number of items to render
        data={[...fakeData, {id:-1,name:'Add'}]}
        keyExtractor={(item, index) => item.id }
        renderItem={({item}) => <CollectionCard navigation={navigation} id={item.id} name={item.name} image={item.image}/> }
    />
  )
}

export default Collections