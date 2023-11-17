import { useEffect } from 'react'
import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS } from '../constants'
import { AuthProvider, useAuth } from '../utils/AuthContext'
import styles from '../components/common/common.style';
import AppLogo from '../components/logo/AppLogo'

export default function Home() {
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
                        headerStyle: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: false,
                        headerTitle: "Landing",
                    }}
                />
                <View style={styles.container}>
                    <AppLogo />
                    <TouchableOpacity
                        onPress={() => router.push('Login')}
                        style={styles.btn}
                    >
                        <Text>Go to Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('Register')}
                        style={styles.btn}
                    >
                        <Text>Register an account</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
    )
}