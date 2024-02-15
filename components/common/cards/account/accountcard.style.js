import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (selectedAccount, account) => ({
    padding: SIZES.large,
    backgroundColor: selectedAccount === account.id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.small,
  }),
  // logoContainer: (selectedJob, item) => ({
  //   width: 50,
  //   height: 50,
  //   backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
  //   borderRadius: SIZES.medium,
  //   justifyContent: "center",
  //   alignItems: "center",
  // }),
  // logoImage: {
  //   width: "70%",
  //   height: "70%",
  // },
  accountName: (selectedAccount, account) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: selectedAccount === account.id ? COLORS.white : COLORS.primary,
    marginHorizontal: 10,
    width: 120,
  }),
  infoContainer: {
    flexDirection: "row",
    // marginTop: SIZES.medium,
  },
  infoBtn:  (selectedAccount, account) => ({
    backgroundColor: selectedAccount === account.id ? COLORS.white : COLORS.primary,
    borderRadius: SIZES.medium,
    padding: 5,
    marginTop: SIZES.medium,
  }),
  infoBtnText:  (selectedAccount, account) => ({
    textAlign: "center",
    color: selectedAccount === account.id ? COLORS.primary : COLORS.white,
  }),
  accountBalance: (selectedAccount, account) => ({
    fontSize: SIZES.large,
    color: selectedAccount === account.id ? COLORS.white : COLORS.primary,
    padding: SIZES.xSmall,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedJob) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
