import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { useAuth } from '../utils/AuthContext';
import { COLORS, icons } from '../constants';
import styles from '../components/common/common.style';


const Register = () => {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            // Call the register function from useAuth with email and password
            await register(email, password);
            // Navigate to the home screen after successful registration
            navigation.navigate('Home');
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: "Register",
                }}
            />
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            style={styles.inputField}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.inputField}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.inputField}
                        />
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                        <Image
                            source={icons.chevronRight}
                            resizeMode='contain'
                            style={styles.searchBtnImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Register;
