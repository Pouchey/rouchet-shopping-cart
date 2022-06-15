import React from 'react'
import { View,FlatList} from 'react-native'
import {API_URL} from '@env'
import CartItem from '../components/CartItem';

import styles from '../styles/global.component.js'

function Cart() {

  const [products, setProducts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getCart = () => {
    setRefreshing(true);
    fetch(`${API_URL}/api/cart`,{
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

  React.useEffect(() => {
    getCart();
  }, [])

  return (
    <View style={styles.container}>

      <FlatList
        horizontal={false}
        style={{width:'100%'}}
        refreshing={refreshing}
        onRefresh={ () => { getCart(); }}
        data={products}
        initialNumToRender={10} 
        renderItem={({item}) => <CartItem item={item}></CartItem>}
      />

    </View>
  )
}

export default Cart

