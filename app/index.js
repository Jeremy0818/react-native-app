import { useEffect } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { Link, Stack, useRouter } from 'expo-router'

import { COLORS, FONT, SIZES } from '../constants'
import { useAuth } from '../utils/AuthContext'
import styles from '../components/common/common.style';
import AppLogo from '../components/logo/AppLogo'

export default function Landing() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated()) {
            router.replace('Home');
        }
    }, [user]);

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <View style={styles.container}>
                <AppLogo />
                <TouchableOpacity
                    onPress={() => router.push('Login')}
                    style={styles.btn}
                >
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.push('Register')}
                    style={styles.btn}
                >
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}