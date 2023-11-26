import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SIZES, COLORS, FONT } from "../../../constants";
import { default as AccountFooter } from "../../accountdetails/footer/Footer";
import CustomBackdrop from "./CustomBackdrop";

const SlidingMenuModal = ({ accountId }) => {
    const router = useRouter();
    // hooks
    const sheetRef = useRef(null);
    const insets = useSafeAreaInsets();
    const [level, setLevel] = useState(0);

    // variables
    const snapPoints1 = useMemo(() => ["25%"], []);
    const snapPoints2 = useMemo(() => ["35%"], []);

    // Define the menu options as an array of objects
    const menuOptions = [
        [
            { value: 1, text: "Personal" },
            { value: 2, text: "Group" },
        ],
        [
            { value: 1, text: "Scan Receipt" },
            { value: 2, text: "Scan Statement" },
            { value: 3, text: "Type Manually" },
        ]
    ];

    function openImageScan() {
        router.push(`/scan/${accountId}`);
    }

    const handleSelect = (value) => {
        if (level < 1) {
            setLevel(level + 1);
        } else {
            openImageScan();
        }

    }

    // Define a function to render the menu options as buttons
    const renderOptions = () => {
        return menuOptions[level].map((option, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => handleSelect(option.value)}
                >
                    <Text style={styles.optionText}>{option.text}</Text>
                </TouchableOpacity>
            );
        });
    };

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        setLevel(0);
        sheetRef.current?.close();
    }, []);

    const handlePresentModalPress = useCallback(() => {
        sheetRef.current?.present();
    }, []);

    // render
    return (
        <BottomSheetModalProvider>
            {/* <View style={styles.container}> */}
            {/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
            <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
            <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} /> */}
            {/* <Button title="Close" onPress={() => handleClosePress()} /> */}
            <AccountFooter handlePress={handlePresentModalPress} />
            <BottomSheetModal
                ref={sheetRef}
                snapPoints={level == 0 ? snapPoints1 : snapPoints2}
                onChange={handleSheetChange}
                enablePanDownToClose={true}
                index={0}
                detached={true}
                style={styles.sheetContainer}
                bottomInset={insets.bottom + 55}
                backdropComponent={({ animatedIndex, style }) => (
                    <CustomBackdrop
                        animatedIndex={animatedIndex}
                        style={style}
                        onPress={handleClosePress}
                    />
                )}
            >
                <View>
                    {renderOptions()}
                    <TouchableOpacity
                        style={styles.cancel}
                        onPress={() => handleClosePress()}
                    >
                        <Text style={styles.optionText}>cancel</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModal>
            {/* </View> */}
        </BottomSheetModalProvider>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.lightWhite,
    },
    sheetContainer: {
        // add horizontal space
        marginHorizontal: 24,
    },
    option: {
        // flex: 1,
        backgroundColor: COLORS.tertiary,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: SIZES.medium,
        borderRadius: SIZES.medium,
        margin: 10,
    },
    optionText: {
        fontSize: SIZES.medium,
        color: COLORS.white,
        fontFamily: FONT.bold,
    },
    cancel: {
        // flex: 1,
        backgroundColor: COLORS.primary,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        margin: 10,
        marginLeft: SIZES.medium,
        marginTop: SIZES.xLarge,
    },
});

export default SlidingMenuModal;