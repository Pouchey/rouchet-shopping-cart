import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Home from './src/views/Home';
import Cart from './src/views/Cart';
import Settings from './src/views/Settings';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


const navOptions = ({route}) => ({gi
  tabBarIcon : ({ color, size}) => {
    let iconName;
    
    switch (route.name) {
      case 'Home':
        iconName = 'ios-home';
        break;
      case 'Cart':
        iconName = 'ios-cart';
        break;
      case 'Settings':
        iconName = 'ios-settings';
        break;
    }

    return <Ionicons name={iconName} size={50} color={color} />;
  },
  tabBarActiveTintColor: 'seagreen',
  tabBarInactiveTintColor: 'gray',
  tabBarShowLabel : false,
  tabBarStyle: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 30,
    height: 100,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  tabBarIconStyle: {
    width: 50,
    height: 50,
  },
});
const headerOptions = {
  headerStyle: {  
    backgroundColor: 'white',
    height: 100,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },

}

function App() {
  return (
    <NavigationContainer >
      <StatusBar style="dark" />
      <Tab.Navigator screenOptions={navOptions}>
        <Tab.Screen name="Home" component={Home} options={headerOptions}/>
        <Tab.Screen name="Cart" component={Cart} options={headerOptions}/>
        <Tab.Screen name="Settings" component={Settings} options={headerOptions} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;