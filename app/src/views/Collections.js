import React from 'react'
import {Pressable,ImageBackground,FlatList} from 'react-native'
import { DeviceEventEmitter } from 'react-native';

import styles from '../styles/collections.component'

import Ionicons from 'react-native-vector-icons/Ionicons';



const CollectionCard = ({id,name,image,navigation,getCategories}) => {
  
  return (

    id === -1
    ?
    
      <Pressable 
        style={({pressed}) => [styles.card,styles.editCard ,pressed ? styles.cardActive : null] }
        onPress={() => navigation.navigate('Ajout Catégorie')}
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
       {image && <ImageBackground style={styles.image} source={{uri:`http://192.168.1.76:5050/${image}`}} imageStyle={styles.image} />}
      </Pressable>
  )
}


const Collections = ({navigation}) => {

  const [categories, setCategories] = React.useState([]);

  const getCategories = () => {
    fetch('http://192.168.1.76:5050/api/categorie',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setCategories(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  React.useLayoutEffect(() => {
    getCategories();
  }, []);

  DeviceEventEmitter.addListener("event.categories", () => getCategories());

  return (
    <FlatList 
        numColumns={2}                  // set number of columns 
        columnWrapperStyle={styles.row}  // space them out evenly
        initialNumToRender={10}         // set initial number of items to render
        data={[...categories, {id:-1}]}
        renderItem={({item}) => 
        <CollectionCard navigation={navigation} id={item.id} name={item.name} image={item.image} getCategories={getCategories}/> 
        }
    />
  )
}

export default Collections