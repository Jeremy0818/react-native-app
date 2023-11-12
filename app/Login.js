import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'

import { useAuth } from '../utils/AuthContext';

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
        // Fetch the CSRF token
        fetch('/api/get-csrf-token/')
            .then((response) => response.json())
            .then((data) => {
                const csrfToken = data.csrfToken;

                // Include the CSRF token in your requests
                fetch('/api/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken, // Include the token in the request headers
                    },
                    body: JSON.stringify({ username, password }),
                })
                    .then(async (response) => {
                        if (response.ok) {
                            // Login successful
                            setLoginStatus('success');
                            console.log("logging in ...");
                            data = response.json().then(async (data) => {
                                // Set individual field errors
                                console.log(data.access, data.refresh, data.user);
                                await login(data.access, data.refresh, data.user);
                                router.replace('Home');
                            }).catch((error) => {
                                // Handle login error
                                console.error('Login error:', error);
                                setLoginStatus('error');
                            });

                        } else {
                            // Login failed
                            setLoginStatus('error');
                        }
                    })
                    .catch((error) => {
                        // Handle login error
                        console.error('Login error:', error);
                        setLoginStatus('error');
                    });
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button
                title="Go to Register"
                onPress={() => router.push('Register')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default Login;
