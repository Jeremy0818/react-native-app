import React, { useState, } from 'react'
import { View, Text, FlatList } from 'react-native'

import styles from './transaction.style'
import { SIZES } from '../../../constants'
import TransactionCard from '../../common/cards/transaction/TransactionCard'

const Transaction = ({ data, scrollViewRef }) => {
    const [selectedTransaction, setSelectedTransaction] = useState();

    const handleCardPress = (id) => {
        setSelectedTransaction(id)
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentBox}>
                {
                    data.length > 0 ?
                        data.map((item, index) => (
                            <TransactionCard
                                key={index}
                                scrollViewRef={scrollViewRef}
                                transaction={item}
                                selectedTransaction={selectedTransaction}
                                handleCardPress={handleCardPress}
                            />
                        ))
                        :
                        <Text style={styles.contextText}>No data</Text>
                }
            </View>
        </View>
    )
}

export default Transaction