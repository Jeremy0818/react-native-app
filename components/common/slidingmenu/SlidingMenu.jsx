import React, { useCallback, useRef, useMemo, useState } from "react";
import { Dimensions, StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { SIZES, COLORS, FONT } from "../../../constants";

const SlidingMenu = ({ renderComponent }) => {
    // hooks
    const sheetRef = useRef(null);
    const scrollViewRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ["50%", "98%"], []);

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

        <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            enablePanDownToClose={false}
            index={0}
            style={styles.sheetContainer}

        >
            <Text style={styles.headerText}>Transactions</Text>
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                
                {renderComponent()}
            </BottomSheetScrollView>
        </BottomSheet >
    );
};

const styles = StyleSheet.create({
    sheetContainer: {
        // add horizontal space
        // marginHorizontal: SIZES.medium,
    },
    contentContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        margin: 8,
    },
    headerText: {
        textAlign: 'center',
        fontSize: SIZES.large,
        fontWeight: 'bold',
    }
});

export default SlidingMenu;