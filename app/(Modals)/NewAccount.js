import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../utils/AuthContext';
import { COLORS, icons } from '../../constants';
import styles from '../../components/common/common.style';
import { newAccount } from '../../utils/RequestHelper';

const NewAccount = () => {
    const router = useRouter();
    const { cacheToken, clearToken } = useAuth();
    const [accName, setAccName] = useState('');
    const [balance, setBalance] = useState('0');
    const [accNameIsEmpty, setAccNameIsEmpty] = useState(false);
    const [balanceIsEmpty, setbalanceIsEmpty] = useState(false);

    const addNewAccount = async () => {
        isEmpty = false;
        if (accName.length == 0) {
            setAccNameIsEmpty(true);
            isEmpty = true;
        }
        if (balance.length == 0) {
            setbalanceIsEmpty(true);
            isEmpty = true;
        }
        if (isEmpty) return;
        let result = await newAccount(accName, balance);
        if (result.error) {
            alert(result.error);
        } else {
            await cacheToken(result.data.access, result.data.refresh, result.data.user);
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
                        <Text style={styles.text}>Account Name</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="Enter account name"
                                placeholderTextColor={COLORS.gray}
                                value={accName}
                                onChangeText={setAccName}
                                style={styles.inputField}
                                multiline={false}
                            />
                            {accNameIsEmpty && <Text style={{ color: 'red' }}>Field cannot be empty</Text>}
                        </View>
                        <Text style={styles.text}>Balance</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="Enter your balance"
                                placeholderTextColor={COLORS.gray}
                                value={balance}
                                onChangeText={setBalance}
                                style={styles.inputField}
                                multiline={false}
                                inputMode='decimal'
                                keyboardType='decimal-pad'
                            />
                            {balanceIsEmpty && <Text style={{ color: 'red' }}>Field cannot be empty</Text>}
                        </View>

                        <TouchableOpacity style={styles.btn} onPress={addNewAccount}>
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

export default NewAccount;
