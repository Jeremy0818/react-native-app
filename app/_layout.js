import { Stack, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker'

import { AuthProvider, useAuth } from "../utils/AuthContext";
import { BottomTabs } from '../components';

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
            <Stack onLayout={onLayoutRootView} />
            <BottomTabs />
        </AuthProvider>
    )
}