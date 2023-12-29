import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import styles from './footer.style'
import { COLORS, icons } from '../../../constants'

const Footer = ({ isOpen, handlePress }) => {
    return (
        <View style={styles.container}>
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
                            <Ionicons name="md-add-circle-outline" size={24} color={COLORS.white} />
                            <Text style={styles.addBtnText}>Add transaction</Text>
                        </TouchableOpacity>
                    )
            }
        </View>
    )
}

export default Footer