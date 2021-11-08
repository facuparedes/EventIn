import { StyleSheet, Dimensions } from "react-native";
import { colorPallete } from "../../../screens/Onboarding/styles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "rgba(95, 95, 95, 0.1)",
    borderRadius: 20,
    elevation: 15,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 15,
    marginVertical: 12,
    marginHorizontal: 10,
  },
  btn_container: {
    flex: 1,
    height: "75%",
  },
  card_header: {
    flex: 1,
    paddingVertical: 10,
    width: "100%",
  },
  card_header_title: {
    fontFamily: "Gotham-Medium",
    fontSize: 18,
    color: colorPallete.second,
  },
  card_header_description: {
    color: "#5c6066",
    fontFamily: "Gotham-Book",
  },
  card_body: {
    width: "100%",
  },
  card_body_image: {
    position: "relative",
    resizeMode: "cover",
    width: windowWidth / 1.17,
    height: windowHeight / 3,
    borderRadius: 15,
  },
  card_footer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  card_body_date: {
    position: "absolute",
    right: 0,
    fontSize: 14,
    color: "white",
    marginHorizontal: 5,
    marginVertical: 8,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(95, 95, 95, 0.6)",
  },
  card_body_date_active: {
    backgroundColor: "#6ad5ce",
    color: "white",
  },
});
