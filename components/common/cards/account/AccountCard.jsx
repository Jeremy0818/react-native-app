import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import styles from './accountcard.style'

const AccountCard = ({ account, selectedAccount, handleCardPress }) => {
    return (
        <View
            style={styles.container(selectedAccount, account)}
        >
            <View style={styles.infoContainer}>
                <Text style={styles.accountName(selectedAccount, account)}>{account.account_name}</Text>
                {account.balance < 0 ? <Ionicons name='alert-circle' size={22} color={"red"} /> : null}
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.accountBalance(selectedAccount, account)} numberOfLines={1}>
                    {account.balance}
                </Text>
            </View>
            <TouchableOpacity style={styles.infoBtn(selectedAccount, account)} onPress={() => handleCardPress(account)}>
                <Text style={styles.infoBtnText(selectedAccount, account)}>View</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AccountCard