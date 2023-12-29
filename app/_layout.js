import { Stack, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { Ionicons } from '@expo/vector-icons';

import { AuthProvider, useAuth } from "../utils/AuthContext";
import { BottomTabs, ScreenHeaderBtn } from '../components';
import { COLORS, icons, images, SIZES } from '../constants';
import styles from '../components/common/common.style';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
        PermanentMarker_400Regular
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if (!fontsLoaded) return null;
    console.log(router.pathname);

    return (
        <AuthProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

            
            <Stack onLayout={onLayoutRootView}>
                <Stack.Screen
                    name="index"
                    options={{
                        headerLeft: () => <></>,
                        headerStyle: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: false,
                        headerTitle: "Landing",
                        headerTitleStyle: styles.headerText,
                    }}
                />
                <Stack.Screen
                    name="(Modals)/Login"
                    options={{
                        headerStyle: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: false,
                        headerTitle: "Login",
                        presentation: 'modal',
                        headerTitleStyle: styles.headerText,
                        headerRight: () => (
                            <Ionicons name="close-circle" size={28} onPress={() => router.back()}/>
                        ),
                    }}
                />
                <Stack.Screen
                    name="(Modals)/Register"
                    options={{
                        headerStyle: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: false,
                        headerTitle: "Register",
                        presentation: 'modal',
                        headerTitleStyle: styles.headerText,
                        headerRight: () => (
                            <Ionicons name="close-circle" size={28} onPress={() => router.back()}/>
                        ),
                    }}
                />
                <Stack.Screen
                    name="(Screens)/Settings"
                    options={{
                        headerStyle: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: false,
                        headerLeft: () => <></>,
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                        ),
                        headerTitle: "Settings",
                        headerTitleStyle: styles.headerText,
                        animation: "none"
                    }}
                />
            </Stack>
            <BottomTabs />
            </SafeAreaView>
        </AuthProvider>
    )
}