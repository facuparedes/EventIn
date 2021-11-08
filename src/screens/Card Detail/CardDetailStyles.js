import { StyleSheet, Dimensions } from "react-native";
import { colorPallete } from "../Onboarding/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
  },
  viewCont: {
    marginTop: 4,
  },
  header: {
    width: "100%",
    height: height * 0.37,
    paddingTop: 20,
  },
  btnBackBg: {
    position: "absolute",
    paddingTop: height * 0.04,
    paddingLeft: width * 0.03,
  },
  btnBack: {
    position: "absolute",
    paddingTop: height * 0.043,
    paddingLeft: width * 0.035,
  },
  btnLikeBackground: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    alignSelf: "flex-end",
    paddingTop: height * 0.232,
  },
  btnShareBackground: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    alignSelf: "flex-end",
    paddingTop: height * 0.29,
  },
  btnLike: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingTop: height * 0.246,
    paddingRight: width * 0.037,
  },
  btnShare: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingTop: height * 0.303,
    paddingRight: width * 0.04,
  },
  img: {
    position: "relative",
    resizeMode: "cover",
    width: width / 1,
    height: height / 2.7,
    justifyContent: "center",
    alignSelf: "center",
  },
  body: {
    backgroundColor: "white",
    width: "100%",
    alignSelf: "center",
    borderRadius: 25,
  },
  contentTitled: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontFamily: "Gotham-Medium",
    fontSize: 25,
  },
  fee: {
    fontFamily: "Gotham-Bold",
    fontSize: 22,
  },
  dataContain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBody: {
    fontFamily: "Gotham-Light",
    fontSize: 15,
  },
  location: {
    fontFamily: "Gotham-LightItalic",
    fontSize: 15,
    color: "blue",
    textDecorationLine: "underline",
  },
  maps: {
    height: height * 0.1,
    width: width * 0.225,
    borderRadius: 10,
  },
  descContent: {
    flex: 4,
  },
  subTitle: {
    fontFamily: "Gotham-Bold",
    fontSize: 16,
    marginTop: 10,
  },
  flatList: {
    height: height * 0.3,
    width: width * 0.875,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});

export default styles;
