import { useEffect } from 'react'
import { SafeAreaView, TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, FONT, SIZES } from '../constants'
import { useAuth } from '../utils/AuthContext'
import styles from '../components/common/common.style';
import AppLogo from '../components/logo/AppLogo'

export default function Landing() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated()) {
            router.replace('Overview');
        }
    }, [user]);

    return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
                <Stack.Screen
                    options={{
                        headerLeft: () => <></>,
                        headerStyle: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: false,
                        headerTitle: "Landing",
                        headerTitleStyle: styles.headerText,
                    }}
                />
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

            </SafeAreaView>
    )
}