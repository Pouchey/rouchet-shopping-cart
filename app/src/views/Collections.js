import React from 'react'
import {Pressable,ImageBackground,FlatList} from 'react-native'
import { DeviceEventEmitter } from 'react-native';

import styles from '../styles/collections.component'

import Ionicons from 'react-native-vector-icons/Ionicons';

import {API_URL} from '@env'

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
       {image && <ImageBackground style={styles.image} source={{uri:`${API_URL}/${image}?${new Date()/*avoiding cache*/}`}} imageStyle={styles.image} />}
      </Pressable>
  )
}


const Collections = ({navigation}) => {

  const [categories, setCategories] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getCategories = () => {
    setRefreshing(true);
    fetch(`${API_URL}/api/categories`,{
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
      .finally(() => {
        setRefreshing(false);
      })
  }

  React.useEffect(() => {
    getCategories();
  }, [navigation]);

  DeviceEventEmitter.addListener("event.categories", () => getCategories());

  return (
    <FlatList 
        numColumns={2}                  // set number of columns 
        columnWrapperStyle={styles.row}  // space them out evenly
        initialNumToRender={10}         // set initial number of items to render
        refreshing={refreshing}         // set refreshing to true to show spinner
        onRefresh={ () => { getCategories(); }}
        data={[...categories, {id:-1}]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => 
        <CollectionCard navigation={navigation} id={item.id} name={item.name} image={item.image} getCategories={getCategories}/> 
        }
    />
  )
}

export default Collections