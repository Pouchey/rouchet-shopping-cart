import React from 'react';
import Toast,{BaseToast} from 'react-native-toast-message';
import { Appearance } from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Home from './src/views/Home';
import Cart from './src/views/Cart';
import Settings from './src/views/Settings';
import {RouchetDarkTheme,RouchetDefaultTheme} from './src/styles/theme.component';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();



function App() {

  const [appearance, setAppearance] = React.useState(Appearance.getColorScheme());

  Appearance.addChangeListener(({ colorScheme }) => {
    setAppearance(colorScheme);
  });


  const colors = useTheme().colors;

  
  const screenOptions = ({route}) => ({
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
      backgroundColor: appearance === 'dark' ? RouchetDarkTheme.colors.bar : RouchetDefaultTheme.colors.bar,
      paddingTop: 20,
      paddingBottom: 30,
      height: 100,

    },
    tabBarIconStyle: {
      width: 50,
      height: 50,
    },

    headerShown: false,
    unmountOnBlur: true
  });
  const options = {
    headerShown: true,
    headerStyle: {  
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: appearance === 'dark' ? RouchetDarkTheme.colors.bar : RouchetDefaultTheme.colors.bar,
    },
    headerTintColor: 'seagreen',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    
  };
  const toastConfig={
    basic: (props) => (
      <BaseToast
        {...props}
        style={{borderLeftColor:'seagreen',backgroundColor: 'white' }}
        text1Style={{
          color: 'black',
          fontWeight:'400',
          fontSize: 20,
        }}
      />
    ),
  };

  return (
    <NavigationContainer theme={appearance === 'dark' ? RouchetDarkTheme : RouchetDefaultTheme } >
      <StatusBar style={appearance === 'dark' ? 'light' : 'dark'} />
      <Tab.Navigator screenOptions={screenOptions} >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={Cart} options={options}/>
        <Tab.Screen name="Settings" component={Settings} options={options}/>
      </Tab.Navigator>
      <Toast config={toastConfig}/>
    </NavigationContainer>
    
  );
}

export default App;