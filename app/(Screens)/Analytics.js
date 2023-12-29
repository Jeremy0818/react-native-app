import { useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, icons, images, SIZES } from '../../constants'
import { ExpenseBreakdownChart, SpendingTrendChart, IncomeVsExpensesChart } from '../../components'
import styles from '../../components/common/common.style';
import { useAuth } from '../../utils/AuthContext'

export default function Analytics() {
    const router = useRouter();
    const { isAuthenticated, clearToken } = useAuth();

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
                    headerLeft: () => <></>,
                    headerTitle: "Analytics",
                    headerTitleStyle: styles.headerText,
                    animation: "none"
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1,
                    padding: SIZES.medium
                }}>
                    <ExpenseBreakdownChart/>
                    <SpendingTrendChart />
                    <IncomeVsExpensesChart />
                </View>
            </ScrollView>
        </View>
    )
}