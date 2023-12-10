import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import styles from './transactioncard.style';
import { CollapsableContainer } from '../../collapsible/CollapsibleContainer';
import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const TransactionCard = ({ edit, scrollViewRef, transaction, selectedTransaction, handleCardPress, onUpdate, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const [title, setTitle] = useState(transaction.title);
    const [amount, setAmount] = useState(transaction.total_amount);
    const [category, setCategory] = useState(transaction.category);
    const [type, setType] = useState(transaction.type);
    const [selectedDate, setSelectedDate] = useState(new Date(transaction.date));
    const [account, setAccount] = useState(transaction.account);
    const [isLoading, setIsLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        if (!edit) setExpanded(false);
    }, [edit]);

    const onItemPress = (event) => {
        if (edit) setExpanded(!expanded);
    };

    const leftSwipeActions = () => {
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
            <TouchableOpacity
                style={{
                    // backgroundColor: '#ff8303',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                }}
                onPress={handleDelete}
            >
                <Ionicons name="trash" size={24} color={"black"} />
            </TouchableOpacity>
        );
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

    const handleSave = async () => {
        setExpanded(false);
        if (onUpdate) {
            transaction.title = title;
            transaction.total_amount = amount;
            transaction.category = category;
            transaction.type = type;
            transaction.date = selectedDate.toISOString().split('T')[0];
            transaction.account = account;
            setIsLoading(true);
            const { data, error } = await onUpdate(transaction.id, transaction);

            if (error) {
                alert(error);
            } else {
                console.log(data.status);
            }
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setExpanded(false);
        if (onDelete) {
            setIsLoading(true);
            const { data, error } = await onDelete(transaction.id, transaction);
            if (error) {
                alert(error);
            } else {
                console.log(data.status);
                setDeleted(true);
            }
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        return (
            <View style={styles.wrapper} >
                <TouchableWithoutFeedback
                    onPress={(event) => onItemPress(event)}
                >
                    <View style={styles.container}>
                        <View style={styles.iconLeft}>
                            <Ionicons name="image" size={24} color={"black"} />
                        </View>
                        <View style={styles.content}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={styles.title}>
                                {transaction.title}
                            </Text>
                            <Text style={styles.amount}>{transaction.total_amount}</Text>
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.dateText}>{formatDateDayMonth(transaction.date)}</Text>
                            <Text style={styles.yearText}>{formatDateYear(transaction.date)}</Text>
                        </View>
                        <View style={styles.iconRight}>
                            {
                                edit ?
                                    <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={18} color={"black"} />
                                    :
                                    null
                            }

                        </View>

                    </View>
                </TouchableWithoutFeedback>

                <CollapsableContainer expanded={expanded}>

                    <View style={styles.editContainer}>
                        <View style={styles.inputContainer}>
                            <View style={styles.editTextWrapper}>
                                <Text style={styles.editText}>Title</Text>

                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={title}
                                    onChangeText={(text) => { setTitle(text) }}
                                    style={styles.inputField}
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.editTextWrapper}>
                                <Text style={styles.editText}>Total Amount</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={amount}
                                    inputMode='decimal'
                                    onChangeText={(text) => { setAmount(text) }}
                                    style={styles.inputField}
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.editTextWrapper}>
                                <Text style={styles.editText}>Date</Text>
                            </View>
                            <View style={styles.inputDateWrapper}>
                                <DateTimePicker
                                    mode='date'
                                    value={selectedDate}
                                    date={selectedDate}
                                    onChange={(e, date) => setSelectedDate(date)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.editTextWrapper}>
                                <Text style={styles.editText}>Category</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <RNPickerSelect
                                    style={pickerSelectStyles}
                                    placeholder={{}}
                                    items={[
                                        { label: 'Groceries', value: 'Groceries' },
                                        { label: 'Shopping', value: 'Shopping' },
                                        { label: 'Dining', value: 'Dining' },
                                    ]}
                                    onValueChange={setCategory}
                                    value={category}
                                    useNativeAndroidPickerStyle={false}
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.editTextWrapper}>
                                <Text style={styles.editText}>Account Paid</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <RNPickerSelect
                                    style={pickerSelectStyles}
                                    placeholder={{}}
                                    items={[
                                        { label: 'Cash', value: 'Cash' },
                                        { label: 'Savings', value: 'Savings' },
                                        { label: 'Credit Card', value: 'Credit Card' },
                                    ]}
                                    onValueChange={setAccount}
                                    value={account}
                                    useNativeAndroidPickerStyle={false}
                                />
                            </View>
                        </View>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={handleSave}

                            >
                                <Text style={styles.btnText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => {
                                    setExpanded(!expanded);
                                }}
                            >
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </CollapsableContainer>
            </View>
        )
    }

    return (
        isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
        ) : deleted ? (
            <View style={styles.wrapper} >
                <View style={styles.container}>
                    <Text>Deleted</Text>
                </View>

            </View>

        ) : (
            edit ?
                <Swipeable
                    // renderLeftActions={LeftSwipeActions}
                    renderRightActions={rightSwipeActions}
                >
                    {renderContent()}
                </Swipeable>
                :
                <View>
                    {renderContent()}
                </View>
        )
    );
};

export default TransactionCard;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: FONT.regular,
        // width: 300,
        textAlign: 'center',
    },
    inputAndroid: {
        fontFamily: FONT.regular,
        // width: 300,
        textAlign: 'center',
    },
});
