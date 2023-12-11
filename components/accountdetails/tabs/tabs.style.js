import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.small,
        marginBottom: SIZES.small / 2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    btn: (name, activeTab) => ({
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.xLarge,
        backgroundColor: name === activeTab ? COLORS.primary : "#F3F4F8",
        borderRadius: SIZES.medium,
        marginLeft: 2,
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
        width: 120,
        height: 40,
    }),
    btnText: (name, activeTab) => ({
        fontFamily: "DMMedium",
        fontSize: SIZES.medium,
        color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
        textAlign: 'center',
    }),
});

export default styles;
