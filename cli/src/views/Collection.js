import { View, Text } from 'react-native'
import React from 'react'

import styles from '../styles/global.component'

const Collection = ({route}) => {

  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text>Collection</Text>
      <Text>ID : {id}</Text>
    </View>
  )
}

export default Collection