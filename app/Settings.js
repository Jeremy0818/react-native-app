import { useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Button } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, icons, images, SIZES } from '../constants'
import { ScreenHeaderBtn, BottomTabs } from '../components'
import { useAuth } from '../utils/AuthContext'

export default function Overview() {
    const router = useRouter();
    const { isAuthenticated, clearToken } = useAuth();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace("");
        }
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerLeft: () => <></>,
                    headerTitle: "Settings",
                    animation: "none"
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1,
                    padding: SIZES.medium
                }}>
                    <Button
                        title="Logout"
                        onPress={() => {
                            clearToken();
                            router.replace('');
                        }}
                    />
                </View>
            </ScrollView>
            <BottomTabs screenName={"Settings"} />
        </SafeAreaView>
    )
}