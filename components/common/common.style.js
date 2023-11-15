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
        height: 250,
    },
    inputWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        // height: 50,
        margin: 10,
    },
    inputField: {
        fontFamily: FONT.regular,
        width: 200,
        // height: 50,
        paddingHorizontal: SIZES.medium,
    },
    btn: {
        width: "auto",
        height: 50,
        margin: 10,
        padding: 10,
        backgroundColor: COLORS.tertiary,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    btnImage: {
        tintColor: COLORS.black,
      },
    suppText: {
        textDecorationLine: "underline"
    }
});

export default styles;