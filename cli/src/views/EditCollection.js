import { View, Pressable,Text,TextInput } from 'react-native'
import React from 'react'
import DismissKeyboard from '../components/DismissKeyboard'

import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from '../styles/collections.component'

const EditCollection = () => {
  return (
    <DismissKeyboard>
    <View style={styles.col}>
      <Pressable 
        style={({pressed}) => [styles.card,styles.editCard ,pressed ? styles.cardActive : null] }
        onPress={() => console.log("import image")}
      >
        <Ionicons name="image" size={100} color="white" />
      </Pressable>
      <Text style={styles.label}>Nom de la catégorie:</Text>
      <TextInput style={styles.input} />
      <Pressable 
        style={({pressed}) => [styles.button,pressed ? styles.buttonActive : null] }
        onPress={() => console.log("modification catégorie")}
        >
          <Text style={styles.buttonLabel}>Modifier</Text>
      </Pressable>
    </View>
    </DismissKeyboard>
  )
}

export default EditCollection