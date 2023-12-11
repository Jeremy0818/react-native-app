import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'

const Footer = ({ isOpen, handlePress }) => {
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={styles.likeBtn}>
        <Image 
          source={icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity> */}

            {
                isOpen ?
                    <View style={{ height: styles.addBtn.height, }}>

                    </View>
                    :
                    (
                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={handlePress}
                        >
                            <Text style={styles.addBtnText}>Add transaction</Text>
                        </TouchableOpacity>
                    )
            }
        </View>
    )
}

export default Footer