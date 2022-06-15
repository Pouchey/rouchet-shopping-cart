import { View, FlatList,Pressable } from 'react-native'
import React from 'react'
import CartItem from '../components/CartItem';
import {API_URL} from '@env'
import { DeviceEventEmitter } from 'react-native';

import styles from '../styles/global.component'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Collection = ({route,navigation}) => {

  const { id,name } = route.params;

  const [products, setProducts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);


  const getProducts = () => {
    setRefreshing(true);
    fetch(`${API_URL}/api/categorie/${id}/items`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setRefreshing(false);
      })
  }

  DeviceEventEmitter.addListener("event.products", () => getProducts());

  //Change header title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerRight: () => (
        <Pressable
        onPress={() => navigation.navigate('Ajout Produit',{
          catid:id,
          catname:name
        })}>
        <Ionicons name="add-circle" size={30} color="seagreen" />
      </Pressable>
      )
    })
  }, [name])

  React.useEffect(() => {
    getProducts();
  }, [])



  return (
    <View style={styles.container}>
      <FlatList
        horizontal={false}
        style={{width:'100%'}}
        refreshing={refreshing}
        onRefresh={ () => { getProducts(); }}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10} 
        renderItem={({item}) => <CartItem item={item}></CartItem>}
      />
    </View>
  )
}

export default Collection