import { View, Pressable,Text,TextInput,ImageBackground,Alert,KeyboardAvoidingView } from 'react-native'
import React from 'react'
import DismissKeyboard from '../components/DismissKeyboard'
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { DeviceEventEmitter } from 'react-native';
import {API_URL} from '@env'

import styles from '../styles/collections.component'
import { useTheme } from '@react-navigation/native';

const EditCollection = ({route,navigation}) => {

  const { id,name,image } = route.params;

  const [imageURI, setImageURI] = React.useState(image)
  const [newImage, setNewImage] = React.useState(null)
  const [catName, setCatName] = React.useState(name)
  const [processing, setProcessing] = React.useState(false)


  const deleteCollection =  () => {
    fetch(`${API_URL}/api/categorie/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(res => {
      DeviceEventEmitter.emit("event.categories");
      navigation.navigate('Catégories')
      Toast.show({
        type: "success",
        text1: "Catégorie supprimée",
        topOffset: 50,
        duration: 3000,
      });
    })
    .catch(err => {
      console.log(err)
    })
  }

  const editCollection = () => {

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
    if(!catName){
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
    if(newImage)
      data.append('image', {
        name: catName,
        type: 'image/png',
        uri: newImage.uri,
      });
    data.append('name', catName);

    fetch(`${API_URL}/api/categorie/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
      },
      body: data,
    })
    .then(res => {
      DeviceEventEmitter.emit("event.categories");
      navigation.navigate('Catégories')
      Toast.show({
        type: "success",
        text1: "Catégorie modifiée",
        topOffset: 50,
        duration: 3000,
      });
    })
    .catch(err => {
      console.log(err)
    })
  }


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            Alert.alert('Delete', 'Are you sure you want to delete this collection?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', onPress: deleteCollection },
            ])
          }}
        >
          <Ionicons name="trash" size={30} color="tomato" />
        </Pressable>
      )
    });
  }, [navigation]);



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
      setNewImage(result);
    }
  };


  const colors = useTheme().colors;

  return (
    <DismissKeyboard>
    <KeyboardAvoidingView
    
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.col}>

      <Pressable 
        style={({pressed}) => [styles.card,styles.editCard ,pressed ? styles.cardActive : null] }
        onPress={pickImage}
      >
        
        <ImageBackground style={styles.image} source={{uri: newImage ? newImage.uri : `${API_URL}/${imageURI}`}} imageStyle={styles.image}>
          <Ionicons name="image" size={100} color="white" />
        </ImageBackground>
      </Pressable>

      <Text style={[styles.label,{color:colors.text}]}>Nom de la catégorie:</Text>
      <TextInput style={[styles.input,{color:colors.text}]} value={catName} onChangeText={setCatName} placeholder='Entrer un nom'/>
      <Pressable 
        style={({pressed}) => [styles.button,pressed ? styles.buttonActive : null] }
        onPress={() => !processing && editCollection()}
        >
          <Text style={styles.buttonLabel}>Modifier</Text>
      </Pressable>
    </KeyboardAvoidingView>
    </DismissKeyboard>
  )
}

export default EditCollection