import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; // Import icons from @expo/vector-icons or any other icon library
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants';

const BottomTabs = ({ screenName }) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab} onPress={() => router.replace('Overview')}>
                <Ionicons name="home" size={24} color={screenName == "Overview" ? "black" : "grey"} />
                <Text>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={() => router.replace('Settings')}>
                <Ionicons name="settings" size={24} color={screenName == "Settings" ? "black" : "grey"} />
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        paddingVertical: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.lightWhite,
    },
    tab: {
        alignItems: 'center',
    },
});

export default BottomTabs;
