import React from 'react'
import { View, Text } from 'react-native'

import styles from './transaction.style'

const Transaction = ({ title, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>{title}</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{data}</Text>
      </View>
    </View>
  )
}

export default Transaction