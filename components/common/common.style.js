import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: SIZES.large,
        // height: 400,
    },
    inputWrapper: {
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        margin: 10,
        padding: 10,
        height: 60,
    },
    inputField: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        width: 250,
        height: 80,
        paddingHorizontal: SIZES.medium,
    },
    btn: {
        width: "auto",
        height: 60,
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: COLORS.tertiary,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    btnImage: {
        tintColor: COLORS.black,
    },
    text: {
        fontFamily: FONT.special,
        fontSize: SIZES.large,
    },
    headerText: {
        fontFamily: FONT.special,
        fontSize: SIZES.xLarge,
    },
    suppText: {
        textDecorationLine: "underline",
        margin: 10,
    }
});

export default styles;