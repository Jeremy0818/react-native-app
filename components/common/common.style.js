import { StyleSheet, Dimensions } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: deviceWidth * 0.8, // 80% of screen width
        height: deviceHeight * 0.4, // 40% of screen height
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
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