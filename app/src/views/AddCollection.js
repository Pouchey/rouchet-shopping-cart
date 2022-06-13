import { View, Pressable,Text,TextInput,ImageBackground } from 'react-native'
import React from 'react'
import DismissKeyboard from '../components/DismissKeyboard'
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/collections.component'

const AddCollection = ({navigation}) => {

  const [imageURI, setImageURI] = React.useState('none')


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageURI(result.uri);
    }
  };

  return (
    <DismissKeyboard>
    <View style={styles.col}>

      <Pressable 
        style={({pressed}) => [styles.card,styles.editCard ,pressed ? styles.cardActive : null] }
        onPress={pickImage}
      >
        <ImageBackground style={styles.image} source={{uri:imageURI}} imageStyle={styles.image}>
          <Ionicons name="image" size={100} color="white" />
        </ImageBackground>

      </Pressable>

      <Text style={styles.label}>Nom de la catégorie:</Text>
      <TextInput style={styles.input} />
      <Pressable 
        style={({pressed}) => [styles.button,pressed ? styles.buttonActive : null] }
        onPress={() => Toast.show({
          type: 'basic',
          topOffset: 50,
          visibilityTime: 2000,
          text1: 'Catégorie ajoutée',
          onPress: () => {navigation.navigate('Catégorie',{id:1,name:'test'});Toast.hide()},
        })}
        >
          <Text style={styles.buttonLabel}>Ajouter</Text>
      </Pressable>
    </View>
    </DismissKeyboard>
  )
}

export default AddCollection