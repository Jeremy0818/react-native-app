import { useState } from 'react'
import { View, ScrollView, SafeAreaView, Button } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, icons, images, SIZES } from '../constants'
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components'
import { AuthProvider, useAuth } from '../utils/AuthContext'

import Overview from './Home'
import Login from './Login'
import Register from './Register'

export default function Home() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useAuth();

    return (
        <AuthProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
                <Stack.Screen
                    options={{
                        headerStyle: { backgroundColor: COLORS.lightWhite },
                        headerTitle: "Login"
                    }}
                />
                {user ? (
                    // Render content for authenticated user
                    // This could be your existing content
                    <Overview />
                ) : (
                    // Render content for non-authenticated user
                    <Login />
                )}

            </SafeAreaView>
        </AuthProvider>
    )
}