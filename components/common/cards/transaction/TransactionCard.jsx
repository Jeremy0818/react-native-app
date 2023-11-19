import React, { useState, } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CollapsableContainer } from '../../collapsible/CollapsibleContainer';

const TransactionCard = ({ transaction, selectedTransaction, handleCardPress }) => {
    const [expanded, setExpanded] = useState(false);

    console.log(transaction)

    const onItemPress = () => {
        setExpanded(!expanded);
    };

    function formatDateDayMonth(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`
    }

    function formatDateYear(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        return year;
    }

    return (
        <View style={styles.wrap}>
            <TouchableWithoutFeedback onPress={onItemPress}>
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Ionicons name="image" size={24} color={"black"} />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.type}>{transaction.title}</Text>
                        <Text style={styles.amount}>{transaction.total_amount}</Text>
                    </View>
                    <View style={styles.date}>
                        <Text style={styles.dateText}>{formatDateDayMonth(transaction.date)}</Text>
                        <Text style={styles.yearText}>{formatDateYear(transaction.date)}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <CollapsableContainer expanded={expanded}>
                <Text style={[styles.details, styles.text]}>{transaction.account}</Text>
            </CollapsableContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // width: 40,
        height: 80,
        backgroundColor: "white",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    icon: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        height: 80,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    type: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "black",
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "black",
    },
    date: {
        width: 80,
        // height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    dateText: {
        fontSize: 16,
        color: "black",
    },
    yearText: {
        fontSize: 12,
        color: "black",
    },
});

export default TransactionCard;
