import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'

const Footer = ({ handlePress }) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.likeBtn}>
        <Image 
          source={icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity> */}

      <TouchableOpacity 
        style={styles.applyBtn}
        onPress={handlePress}
      >
        <Text style={styles.applyBtnText}>Add transaction</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer