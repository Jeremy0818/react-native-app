import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 20,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  container: {
    // width: 300,
    // height: 80,
    // backgroundColor: "white",
    // borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // margin: 20,
    // marginBottom: 15,
    // marginLeft: 10,
    // marginRight: 10,
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 5,
  },
  editContainer: {
    height: 450,
  },
  editTextWrapper: {
    alignItems: 'flex-start',
  },
  editText: {
    fontSize: 16,
    color: 'black',
  },
  inputField: {
    fontFamily: FONT.regular,
    width: 300,
    paddingHorizontal: SIZES.medium,
  },
  inputDateWrapper: {
    flex: 1,
    marginRight: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    margin: 10,
    height: 50,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    margin: 10,
    height: 60,
  },
  iconLeft: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRight: {
    width: 40,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: 'black',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  date: {
    width: 80,
    // height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  yearText: {
    fontSize: 12,
    color: 'black',
  },
});

export default styles;