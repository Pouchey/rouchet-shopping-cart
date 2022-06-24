import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Collections from './Collections'
import Collection from './Collection'
import AddCollection from './AddCollection'
import EditCollection from './EditCollection'
import EditProduct from './EditProduct'
import AddProduct from './AddProduct'


const HomeStack = createNativeStackNavigator();


const screenOptions = {
  headerShown:true,
  headerTintColor: 'seagreen',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  hideWhenScrolling: true,
  swipeEnabled: true,
}


function Home({navigation}) {

  navigation.set

  return (
    <HomeStack.Navigator screenOptions={screenOptions} >
      <HomeStack.Screen name="Catégories" component={Collections} />
      <HomeStack.Screen name="Catégorie" component={Collection}/>
      <HomeStack.Screen name="Ajout Catégorie" component={AddCollection} />
      <HomeStack.Screen name="Modification Catégorie" component={EditCollection} />
      <HomeStack.Screen name="Ajout Produit" component={AddProduct} />
      <HomeStack.Screen name="Modification Produit" component={EditProduct} />
    </HomeStack.Navigator>
  )
}

export default Home;

