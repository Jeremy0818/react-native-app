import React, { useState, } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './transactioncard.style';
import { CollapsableContainer } from '../../collapsible/CollapsibleContainer';

const LeftSwipeActions = () => {
    return (
        <View
            style={{ flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center' }}
        >
            <Text
                style={{
                    color: '#40394a',
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                }}
            >
                Bookmark
            </Text>
        </View>
    );
};
const rightSwipeActions = () => {
    return (
        <View
            style={{
                // backgroundColor: '#ff8303',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}
        >
            <Ionicons name="trash" size={24} color={"black"} />
        </View>
    );
};

const TransactionCard = ({ transaction, selectedTransaction, handleCardPress }) => {
    const [expanded, setExpanded] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(transaction.date));

    const onItemPress = () => {
        setExpanded(!expanded);
    };

    const showDateTimePicker = () => setIsDatePickerVisible(true);

    const hideDateTimePicker = () => setIsDatePickerVisible(false);

    const handleDatePicked = (pickeddate) => {
        day = pickeddate.getDate();
        month = pickeddate.getMonth();
        year = pickeddate.getFullYear();
        console.log('A date has been picked: ' + day + '-' + month + '-' + year);
        setSelectedDate(pickeddate);
        hideDateTimePicker();
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
        <Swipeable
            // renderLeftActions={LeftSwipeActions}
            renderRightActions={rightSwipeActions}
        >
            <View style={styles.wrapper} >
                <TouchableWithoutFeedback onPress={onItemPress}>
                    <View style={styles.container}>
                        <View style={styles.iconLeft}>
                            <Ionicons name="image" size={24} color={"black"} />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.title}>{transaction.title}</Text>
                            <Text style={styles.amount}>{transaction.total_amount}</Text>
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.dateText}>{formatDateDayMonth(transaction.date)}</Text>
                            <Text style={styles.yearText}>{formatDateYear(transaction.date)}</Text>
                        </View>
                        <View style={styles.iconRight}>
                            <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={18} color={"black"} />
                        </View>

                    </View>
                </TouchableWithoutFeedback>

                <CollapsableContainer expanded={expanded}>
                    <View style={styles.editContainer}>
                        <View style={styles.editTextWrapper}>
                            <Text style={styles.editText}>Title</Text>

                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={transaction.title}
                                onChangeText={() => { }}
                                style={styles.inputField}
                            />
                        </View>
                        <View style={styles.editTextWrapper}>
                            <Text style={styles.editText}>Total Amount</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={transaction.total_amount}
                                onChangeText={() => { }}
                                style={styles.inputField}
                            />
                        </View>
                        <View style={styles.editTextWrapper}>
                            <Text style={styles.editText}>Date</Text>
                        </View>
                        <View style={styles.inputDateWrapper}>
                            {/* <TextInput
                                onFocus={showDateTimePicker}
                                value={selectedDate.toDateString()}
                            /> */}
                            <DateTimePicker
                                mode='date'
                                value={selectedDate}
                                date={selectedDate}
                                onChange={(e, date) => setSelectedDate(date)}
                            />
                        </View>
                        <View style={styles.editTextWrapper}>
                            <Text style={styles.editText}>Transaction Type</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={transaction.type}
                                onChangeText={() => { }}
                                style={styles.inputField}
                            />
                        </View>
                        <View style={styles.editTextWrapper}>
                            <Text style={styles.editText}>Category</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={transaction.category}
                                onChangeText={() => { }}
                                style={styles.inputField}
                            />
                        </View>
                        <View style={styles.editTextWrapper}>
                            <Text style={styles.editText}>Account Paid</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={transaction.account}
                                onChangeText={() => { }}
                                style={styles.inputField}
                            />
                        </View>
                    </View>
                </CollapsableContainer>
            </View>
        </Swipeable>

    );
};



export default TransactionCard;
