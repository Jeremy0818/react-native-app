import { useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, icons, images, SIZES } from '../../constants'
import { Accounts, Budgets, ScreenHeaderBtn } from '../../components'
import styles from '../../components/common/common.style';
import { useAuth } from '../../utils/AuthContext'

export default function Home() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace("");
        }
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    
                    headerTitle: "Overview",
                    headerTitleStyle: styles.headerText,
                    animation: "none",
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1,
                    padding: SIZES.medium
                }}>
                    <Accounts />
                    
                </View>

                <View style={{
                    flex: 1,
                    padding: SIZES.medium
                }}>
                    <Budgets />
                    
                </View>
            </ScrollView>
        </View>
    )
}