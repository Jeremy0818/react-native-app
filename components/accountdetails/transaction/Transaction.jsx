import React, { useState, } from 'react'
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, } from 'react-native'

import styles from './transaction.style'
import { SIZES } from '../../../constants'
import TransactionCard from '../../common/cards/transaction/TransactionCard'

const Transaction = ({ data, scrollViewRef, refreshing, onRefresh, onUpdate, onDelete }) => {
    const [selectedTransaction, setSelectedTransaction] = useState();
    const [edit, setEdit] = useState(false);

    const handleCardPress = (id) => {
        setSelectedTransaction(id)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Transactions</Text>
                <TouchableOpacity onPress={() => {
                        setEdit(!edit);
                        if (edit && onRefresh) onRefresh();
                    }} >
                    <Text style={styles.headerBtn}>{edit ? "Done" : "Edit"}</Text>
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
                                    key={item.id ? item.id : index}
                                    edit={edit}
                                    scrollViewRef={scrollViewRef}
                                    transaction={item}
                                    selectedTransaction={selectedTransaction}
                                    handleCardPress={handleCardPress}
                                    onUpdate={onUpdate}
                                    onDelete={onDelete}
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