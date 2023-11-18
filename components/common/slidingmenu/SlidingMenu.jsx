import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { SIZES, COLORS, FONT } from "../../../constants";
import { AccountFooter } from "../..";

const SlidingMenu = () => {
    // hooks
    const sheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "75%"], []);

    // Define the menu options as an array of objects
    const menuOptions = [
        { value: 1, text: "Option 1" },
        { value: 2, text: "Option 2" },
        { value: 3, text: "Option 3" },
    ];

    // Define a function to render the menu options as buttons
    const renderOptions = () => {
        return menuOptions.map((option, index) => {
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
        sheetRef.current?.close();
    }, []);

    // render
    return (
        <View style={styles.container}>
            {/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
            <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
            <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} /> */}
            {/* <Button title="Close" onPress={() => handleClosePress()} /> */}
            <AccountFooter handlePress={() => handleSnapPress(1)} />
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
                enablePanDownToClose={true}
                index={-1}
            >
                <BottomSheetView>
                    {renderOptions()}
                    <TouchableOpacity
                        style={styles.cancel}
                        onPress={() => handleClosePress()}
                    >
                        <Text style={styles.optionText}>cancel</Text>
                    </TouchableOpacity>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "100%",
    },
    option: {
        // flex: 1,
        backgroundColor: "#FE7654",
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
        backgroundColor: "#7EC8E3",
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: SIZES.medium,
        borderRadius: SIZES.medium,
        margin: 10,
    },
});

export default SlidingMenu;