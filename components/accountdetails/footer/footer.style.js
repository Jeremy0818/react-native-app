import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.small,
    // backgroundColor: COLORS.lightWhite,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  addBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    height: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  addBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
    marginHorizontal: 10,
  },
});

export default styles;
