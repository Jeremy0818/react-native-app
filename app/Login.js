import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router'

import { useAuth } from '../utils/AuthContext';
import { COLORS, icons } from '../constants';
import styles from '../components/common/common.style';

const Login = ({ navigation }) => {
    const router = useRouter();
    const { login, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);

    // useEffect(() => {
    //     logout();
    // }, []);

    const handleLogin = () => {
        router.replace('Overview');
        // Fetch the CSRF token
        // fetch('/api/get-csrf-token/')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         const csrfToken = data.csrfToken;

        //         // Include the CSRF token in your requests
        //         fetch('/api/login/', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'X-CSRFToken': csrfToken, // Include the token in the request headers
        //             },
        //             body: JSON.stringify({ username, password }),
        //         })
        //             .then(async (response) => {
        //                 if (response.ok) {
        //                     // Login successful
        //                     setLoginStatus('success');
        //                     console.log("logging in ...");
        //                     data = response.json().then(async (data) => {
        //                         // Set individual field errors
        //                         console.log(data.access, data.refresh, data.user);
        //                         await login(data.access, data.refresh, data.user);
        //                         router.replace('Home');
        //                     }).catch((error) => {
        //                         // Handle login error
        //                         console.error('Login error:', error);
        //                         setLoginStatus('error');
        //                     });

        //                 } else {
        //                     // Login failed
        //                     setLoginStatus('error');
        //                 }
        //             })
        //             .catch((error) => {
        //                 // Handle login error
        //                 console.error('Login error:', error);
        //                 setLoginStatus('error');
        //             });
        //     });
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
                            placeholder="Password"
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
