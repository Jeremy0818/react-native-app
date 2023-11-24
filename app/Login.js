import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router'

import { useAuth } from '../utils/AuthContext';
import { COLORS, icons } from '../constants';
import styles from '../components/common/common.style';
import { login } from '../utils/RequestHelper';

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
            router.replace("Overview");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: "Login",
                }}
            />
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text>Username or Email</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Enter your username or email"
                            value={username}
                            onChangeText={setUsername}
                            style={styles.inputField}
                            autoCapitalize='none'
                        />
                    </View>
                    <Text>Password</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.inputField}
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
        </SafeAreaView>
    );
};

export default Login;
