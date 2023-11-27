import React, { useState, } from 'react'
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, } from 'react-native'

import styles from './transaction.style'
import { SIZES } from '../../../constants'
import TransactionCard from '../../common/cards/transaction/TransactionCard'

const Transaction = ({ data, scrollViewRef, refreshing, onRefresh }) => {
    const [selectedTransaction, setSelectedTransaction] = useState();
    const [edit, setEdit] = useState(false);

    const handleCardPress = (id) => {
        setSelectedTransaction(id)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Transaction History</Text>
                <TouchableOpacity onPress={() => setEdit(!edit)} >
                    <Text style={styles.headerBtn}>{edit ? "cancel" : "Edit"}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentBox}>
                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {
                        data.length > 0 ?
                            data.map((item, index) => (
                                <TransactionCard
                                    key={index}
                                    edit={edit}
                                    scrollViewRef={scrollViewRef}
                                    transaction={item}
                                    selectedTransaction={selectedTransaction}
                                    handleCardPress={handleCardPress}
                                />
                            ))
                            :
                            <Text style={styles.contextText}>No data</Text>
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default Transaction