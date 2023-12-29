import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        ...SHADOWS.small,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SIZES.small,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.bold,
        color: COLORS.primary,
    },
    headerBtn: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.gray,
    },
    indicator: {
        position: 'absolute',
        bottom: 0, // Adjust as needed
        width: 50, // Adjust the width of the indicator
        height: 5, // Adjust the height of the indicator
        backgroundColor: COLORS.primary, // Choose your indicator color
    },
});

export default styles;
