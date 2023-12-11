import { useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Button } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, icons, images, SIZES } from '../constants'
import { ScreenHeaderBtn, BottomTabs } from '../components'
import styles from '../components/common/common.style';
import { useAuth } from '../utils/AuthContext'

export default function Settings() {
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
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerLeft: () => <></>,
                    headerTitle: "Settings",
                    headerTitleStyle: styles.headerText,
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