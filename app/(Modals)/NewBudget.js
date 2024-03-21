import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../utils/AuthContext';
import { COLORS, FONT, icons } from '../../constants';
import styles from '../../components/common/common.style';
import { newBudget } from '../../utils/RequestHelper';

import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

const NewBudget = () => {
    const router = useRouter();
    const [categoryName, setCategoryName] = useState('');
    const [maxAmount, setMaxAmount] = useState('0');

    const addNewBudget = async () => {
        isEmpty = false;
        if (categoryName.length == 0) {
            isEmpty = true;
        }
        if (maxAmount.length == 0) {
            isEmpty = true;
        }
        if (isEmpty) return;
        let result = await newBudget(categoryName, maxAmount);
        if (result.error) {
            alert(result.error);
        } else {
            router.back();
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <KeyboardAvoidingView
                behavior='padding'
                style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Category</Text>
                        <Ionicons name={categoryName == "Groceries" ? "cart" : "image"} size={24} color={"black"} />
                        <View style={styles.inputWrapper}>
                            <RNPickerSelect
                                style={pickerSelectStyles}
                                placeholder={{}}
                                items={[
                                    { label: 'Groceries', value: 'Groceries' },
                                    { label: 'Shopping', value: 'Shopping' },
                                    { label: 'Dining', value: 'Dining' },
                                ]}
                                onValueChange={setCategoryName}
                                value={categoryName}
                                useNativeAndroidPickerStyle={false}
                                />
                            {categoryName.length == 0 && <Text style={{ color: 'red' }}>Field cannot be empty</Text>}
                        </View>
                        <Text style={styles.text}>Max Amount</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="Enter your budget"
                                placeholderTextColor={COLORS.gray}
                                value={maxAmount}
                                onChangeText={setMaxAmount}
                                style={styles.inputField}
                                multiline={false}
                                inputMode='decimal'
                                keyboardType='decimal-pad'
                            />
                            {maxAmount.length == 0 && <Text style={{ color: 'red' }}>Field cannot be empty</Text>}
                        </View>

                        <TouchableOpacity style={styles.btn} onPress={addNewBudget}>
                            <Image
                                source={icons.chevronRight}
                                resizeMode='contain'
                                style={styles.btnImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default NewBudget;

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
