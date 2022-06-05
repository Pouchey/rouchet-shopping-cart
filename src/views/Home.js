import React from 'react'
import { View,Text} from 'react-native'
import DismissKeyboard from '../components/DismissKeyboard.js';
import QuantitySelector from '../components/QuantitySelector.js';

import styles from '../styles/global.component.js'

function Home() {

  const [quantity,setQuantity] = React.useState('1');

  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <Text>Home</Text>
      <QuantitySelector value={quantity} setValue={setQuantity}/>
    </View>
    </DismissKeyboard>

  )
}

export default Home;

