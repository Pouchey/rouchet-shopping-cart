import { View, Text, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import {API_URL} from '@env'

const EditProduct = () => {
  return (
    <KeyboardAvoidingView  
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text>EditProduct</Text>
    </KeyboardAvoidingView>
  )
}

export default EditProduct