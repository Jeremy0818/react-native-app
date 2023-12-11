import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; // Import icons from @expo/vector-icons or any other icon library
import { useRouter } from 'expo-router';
import { COLORS, SIZES } from '../../../constants';

const BottomTabs = ({ screenName }) => {
    const router = useRouter();

    const handlePress = (tabName) => {
        if (screenName !== tabName) router.replace(tabName);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab} onPress={() => handlePress("Overview")}>
                <Ionicons name="home" size={28} color={screenName == "Overview" ? "white" : "grey"} />
                <Text style={styles.text(screenName, "Overview")}>Overview</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={() => handlePress("Group")}>
                <Ionicons name="people" size={28} color={screenName == "Group" ? "white" : "grey"} />
                <Text style={styles.text(screenName, "Group")}>Group</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={() => handlePress("Analytics")}>
                <Ionicons name="analytics" size={28} color={screenName == "Analytics" ? "white" : "grey"} />
                <Text style={styles.text(screenName, "Analytics")}>Analytics</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={() => handlePress("Settings")}>
                <Ionicons name="settings" size={28} color={screenName == "Settings" ? "white" : "grey"} />
                <Text style={styles.text(screenName, "Settings")}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 10,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        borderRadius: SIZES.large,
        backgroundColor: COLORS.primary,
    },
    text: (screenName, current) => ({
        color: screenName == current ? "white" : "grey",
    }),
    tab: {
        alignItems: 'center',
    },
});

export default BottomTabs;
