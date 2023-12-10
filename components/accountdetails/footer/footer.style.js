import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    padding: SIZES.small,
    backgroundColor: COLORS.lightWhite,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  addBtn: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  addBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
});

export default styles;
