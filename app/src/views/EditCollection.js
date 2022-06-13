import { View, Pressable,Text,TextInput,ImageBackground } from 'react-native'
import React from 'react'
import DismissKeyboard from '../components/DismissKeyboard'
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from '../styles/collections.component'

const EditCollection = ({route,navigation}) => {

  const { id,name,image } = route.params;

  const [imageURI, setImageURI] = React.useState(image)
  const [catName, setCatName] = React.useState(name)

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
      <TextInput style={styles.input} value={catName} onChangeText={setCatName} placeholder='Entrer un nom'/>
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