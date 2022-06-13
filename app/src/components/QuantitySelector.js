import { View, Button,TextInput,Pressable,Text} from 'react-native'
import React from 'react'

import styles from '../styles/quantitySelector.component'

const QuantitySelector = ({value,setValue}) => {

  const decrement = () => {
    if(value > 0){
      const newValue = parseInt(value) - 1;
      setValue(newValue.toString());
    }
  }
  const increment = () => {
    const newValue = parseInt(value) + 1;
    setValue(newValue.toString());
  }
  const handleChange = (text) => {
    // Remove all non-numeric characters
    text = text.replace(/[^0-9]/g, '');
    // If the first character is a 0, remove it
    if (text.charAt(0) === '0') {
      text = text.substring(1);
    }
    // If the first character is now an empty string, set it to 0
    if (text === '') {
      text = '0';
    }
    // If the value is greater than 99, set it to 99
    if (parseInt(text) > 99) {
      text = '99';
    }
    // Set the value
    setValue(text);

  }



  return (
    <View style={styles.selectorBox}>
      <Pressable
        style={({pressed}) => [styles.selectorButton ,pressed ? styles.selectorButtonActive : null] }
        onPress={decrement}
      >
        <Text style={styles.selectorButtonText}>-</Text>
      </Pressable>
      <TextInput 
        style={styles.selectorTextInput}
        keyboardType='numeric'
        value={value}
        onChangeText={(text) => handleChange(text)}
        maxLength={2}
      />
      <Pressable
        style={({pressed}) => [styles.selectorButton ,pressed ? styles.selectorButtonActive : null] }
        onPress={increment}
      >
        <Text style={styles.selectorButtonText}>+</Text>
      </Pressable>
    </View>


  )
}

export default QuantitySelector