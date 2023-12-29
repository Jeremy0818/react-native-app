import { Dimensions, StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";
import {default as cardStyles} from "../../common/card.style";

const styles = StyleSheet.create({
  ...cardStyles,
  headText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  contentBox: {
    height: Dimensions.get('window').height * 0.55,
    // paddingBottom: 30,
  },
  contextText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
  },
});

export default styles;
