import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../utils/AuthContext';
import { COLORS, icons } from '../../constants';
import styles from '../../components/common/common.style';
import { login } from '../../utils/RequestHelper';

const Login = () => {
    const router = useRouter();
    const { cacheToken, clearToken } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        clearToken();
    }, []);

    const handleLogin = async () => {
        let result = await login(username, password, login);
        if (result.error) {
            alert(result.error);
        } else {
            await cacheToken(result.data.access, result.data.refresh, result.data.user);
            router.replace("Home");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <KeyboardAvoidingView
                behavior='padding'
                style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Username or Email</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="Enter username / email"
                                placeholderTextColor={COLORS.gray}
                                value={username}
                                onChangeText={setUsername}
                                style={styles.inputField}
                                autoCapitalize='none'
                                multiline={false}
                            />
                        </View>
                        <Text style={styles.text}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.gray}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                style={styles.inputField}
                                multiline={false}
                            />
                        </View>

                        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                            <Image
                                source={icons.chevronRight}
                                resizeMode='contain'
                                style={styles.btnImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.replace('Register')}>
                            <Text style={styles.suppText}>Register an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Login;
