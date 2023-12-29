import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; // Import icons from @expo/vector-icons or any other icon library
import { useRouter, usePathname, useFocusEffect } from 'expo-router';
import { COLORS, SIZES, SHADOWS } from '../../../constants';

mainScreens = ["/Home", "/Analytics", "/Settings"];
icons = ["home", "analytics", "settings"];

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

const BottomTabs = ({ }) => {
    const router = useRouter();
    const pathname = usePathname();
    const previousPath = usePrevious(pathname);

    const [activeScreen, setActiveScreen] = useState(mainScreens[0]);

    // Initialize the animated value
    // Use useRef to persist the animated value without re-initializing
    const translateY = useRef(new Animated.Value(50)).current;

    const animate = () => {
        translateY.setValue(50); // Reset to initial off-screen position
        // Slide-in animation
        Animated.timing(translateY, {
            toValue: 0, // Final position
            duration: 200, // Animation duration in milliseconds
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    }

    useEffect(() => {
        if (pathname == '/Login') {
            setActiveScreen('/Home');
        }
        const isPreviousPathMain = mainScreens.includes(previousPath);
        const isCurrentPathMain = mainScreens.includes(pathname);

        if (!isPreviousPathMain && isCurrentPathMain) {
            animate();
        }
    }, [pathname, previousPath]);

    const [xTabOne, setXTabOne] = useState(0);
    const [xTabTwo, setXTabTwo] = useState(0);
    const [xTabThree, setXTabThree] = useState(0);
    const [translateX, setTranslateX] = useState(new Animated.Value(0));

    var xTabs = [xTabOne, xTabTwo, xTabThree];
    var setXTabs = [setXTabOne, setXTabTwo, setXTabThree];
    var translateXTabs = Array.from({ length: mainScreens.length }, (x, i) => new Animated.Value(0));

    const { width } = Dimensions.get("window");

    useEffect(() => {
        if (activeScreen == mainScreens[0]) handleSlide(xTabOne);
        else if (activeScreen == mainScreens[1]) handleSlide(xTabTwo);
        else if (activeScreen == mainScreens[2]) handleSlide(xTabThree);

    }, [activeScreen]);

    const handleSlide = (type) => {
        Animated.spring(translateX, {
            toValue: type,
            duration: 100,
            useNativeDriver: true,
        }).start();
        if (activeScreen === 0) {
            Animated.parallel(Array.from({ length: mainScreens.length }, (x, i) =>
                Animated.spring(translateXTabs[i], {
                    toValue: width * i,
                    duration: 100,
                    useNativeDriver: true,
                }).start()
            ));
        } else {
            Animated.parallel(Array.from({ length: mainScreens.length }, (x, i) =>
                Animated.spring(translateXTabs[i], {
                    toValue: -width * 1,
                    duration: 100,
                    useNativeDriver: true,
                }).start()
            ));
        }
    };

    const handlePress = (screenName) => {
        if (activeScreen !== screenName) {
            setActiveScreen(screenName);
            router.replace(screenName);
        }
    }

    if (!mainScreens.includes(pathname)) {
        // setActiveScreen(null);
        return null;
    }

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
            <Animated.View
                style={{
                    position: "absolute",
                    width: (1 / mainScreens.length * 100).toString() + "%",
                    height: 50,
                    width: "30.5%",
                    marginHorizontal: 6,
                    marginVertical: 6,
                    top: 0,
                    left: 0,
                    backgroundColor: COLORS.gray,
                    borderRadius: SIZES.xxLarge,
                    transform: [
                        {
                            translateX
                        }
                    ]
                }}
            />
            {mainScreens.map((item, index) =>
                <TouchableOpacity key={index} style={styles.tab} onPress={() => handlePress(item)} onLayout={event =>
                    setXTabs[index](event.nativeEvent.layout.x)
                }>
                    <Ionicons name={icons[index]} size={36} color={activeScreen == item ? "white" : "grey"} />
                    {/* <Text style={styles.text(activeScreen, "Overview")}>Overview</Text> */}
                </TouchableOpacity>
            )}
            {/* <TouchableOpacity style={styles.tab} onPress={() => handlePress("/Home")}>
                <Ionicons name="home" size={36} color={activeScreen == "/Home" ? "white" : "grey"} />
                <Text style={styles.text(activeScreen, "Overview")}>Overview</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={() => handlePress("/Analytics")}>
                <Ionicons name="analytics" size={36} color={activeScreen == "/Analytics" ? "white" : "grey"} />
                <Text style={styles.text(activeScreen, "Analytics")}>Analytics</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={() => handlePress("/Settings")}>
                <Ionicons name="settings" size={36} color={activeScreen == "/Settings" ? "white" : "grey"} />
                <Text style={styles.text(activeScreen, "Settings")}>Settings</Text>
            </TouchableOpacity> */}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        // alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 10,
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: SIZES.xxLarge,
        backgroundColor: COLORS.primary,
        ...SHADOWS.medium,
    },
    text: (activeScreen, current) => ({
        color: activeScreen == current ? COLORS.white : COLORS.gray,
    }),
    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default BottomTabs;
