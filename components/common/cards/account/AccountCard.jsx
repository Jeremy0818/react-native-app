import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './accountcard.style'

const AccountCard = ({ account, selectedAccount, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedAccount, account)}
      onPress={() => handleCardPress(account)}
    >
      {/* <TouchableOpacity style={styles.logoContainer(selectedAccount, account)}>
        <Image 
          source={{ uri: account.employer_logo }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity> */}
      <Text style={styles.accountName}>{account.account_name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.accountBalance(selectedAccount, account)} numberOfLines={1}>
          {account.balance}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default AccountCard