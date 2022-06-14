import { View, Pressable,Text,TextInput,ImageBackground } from 'react-native'
import React from 'react'
import DismissKeyboard from '../components/DismissKeyboard'
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { DeviceEventEmitter } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/collections.component'

const AddCollection = ({navigation}) => {

  const [imageURI, setImageURI] = React.useState('none')
  const [image, setImage] = React.useState(null)
  const [name, setName] = React.useState('')
  const [processing, setProcessing] = React.useState(false)


  const addCategories = async () => {

    setProcessing(true)
    if(imageURI === 'none'){
      Toast.show({
        type: "error",
        text1: "Veuillez choisir une image",
        topOffset: 50,
        duration: 3000,
      })
      setProcessing(false)
      return;
    }
    if(!name){
      Toast.show({
        type: "error",
        text1: "Veuillez entrer un nom",
        topOffset: 50,
        duration: 3000,
      })
      setProcessing(false)
      return;
    }

    const data = new FormData();
    data.append('image', {
      name: name,
      type: 'image/png', 
      uri: image.uri,
    });
    data.append('name', name);
    
    await fetch('http://192.168.1.76:5050/api/categorie', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: data,
    })
    .then(res => {
      Toast.show({
        type: "success",
        text1: "Catégorie ajoutée",
        topOffset: 50,
        duration: 3000,
      })
      DeviceEventEmitter.emit("event.categories");
      navigation.navigate('Catégories');
    })
    .catch(err => {
      Toast.show({
        type: "error",
        text1: "Erreur lors de l'ajout de la catégorie",
        topOffset: 50,
        duration: 3000,
      })
      console.log(err);
    })


    setProcessing(false)

  }

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
      setImage(result);
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
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Pressable 
        style={({pressed}) => [styles.button,pressed ? styles.buttonActive : null] }
        onPress={ () => !processing && addCategories()}
      >
        <Text style={styles.buttonLabel}>Ajouter</Text>
      </Pressable>
    </View>
    </DismissKeyboard>
  )
}

export default AddCollection