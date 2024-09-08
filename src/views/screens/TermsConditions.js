import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import Loader from "../components/Loader";
import { useFonts } from "expo-font";

const TermsConditions = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });
  const [loading, setLoading] = React.useState(false);

  const goToPrevScreen = async () => {
    try {
      const frmPage = await AsyncStorage.getItem("TermsFrom");
      navigation.navigate(frmPage);
    } catch (exception) {
      console.log(exception);
      navigation.navigate("TwoOfThreeA");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ImageBackground
        source={require("../../../assets/vectorbg.png")}
        resizeMode="cover"
      >
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "50%",
            }}
          >
            <TouchableOpacity
              onPress={() => goToPrevScreen()}
              style={{ marginRight: 10, marginTop: 5, flexDirection: "row" }}
            >
              <Image style={{ width: 20, height: 20 }} source={require("../../../assets/arrow-left.png")} />
              <Text
                style={{
                  color: "#000000",
                  fontSize: 18,
                  marginLeft: 10,
                  fontWeight: "500",
                  fontFamily: "GeneralSansRegular",
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            color: "#155E75",
            fontSize: 24,
            fontWeight: "700",
            fontFamily: "GeneralSansMedium",
            marginTop: 12,
          }}
        >
          Terms & Conditions
        </Text>
        <Text
          style={{
            color: COLORS.coolgray,
            fontSize: 18,
            fontWeight: "400",
            fontFamily: "GeneralSansRegular",
            marginVertical: 10,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text
          style={{
            color: "#155E75",
            fontSize: 20,
            fontWeight: "600",
            fontFamily: "GeneralSansMedium",
            marginTop: 12,
          }}
        >
          Privacy
        </Text>
        <Text
          style={{
            color: COLORS.coolgray,
            fontSize: 18,
            fontWeight: "400",
            fontFamily: "GeneralSansRegular",
            marginVertical: 10,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <View style={styles.btnView}>
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.btnSecond}
              onPress={() => navigation.navigate("OneOfThreeB")}
            >
              <Text style={styles.btnSecondText}>Decline</Text>
              <MaterialCommunityIcons
                name="cancel"
                style={{ color: COLORS.login }}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.btnFirst}
              onPress={() => goToPrevScreen()}
            >
              <Text style={styles.btnFirstText}>Accept</Text>
              <Ionicons
                name="checkmark-done"
                size={24}
                style={{ marginLeft: 5 }}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnView: {
    flexDirection: "row",
    width: "90%",
    marginTop: "30%",
  },
  btn: {
    width: "50%",
  },
  btnFirst: {
    backgroundColor: COLORS.login,
    paddingLeft: 7,
    paddingRight: 2,
    paddingTop: 15,
    paddingBottom: 15,
    width: "90%",
    height: 55,
    borderRadius: 32,
    marginBottom: 50,
    marginLeft: 15,
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnSecond: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.login,
    paddingLeft: 7,
    paddingRight: 2,
    paddingTop: 15,
    paddingBottom: 15,
    width: "90%",
    height: 55,
    borderRadius: 32,
    marginBottom: 50,
    marginLeft: 15,
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnFirstText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "GeneralSansRegular",
    textAlign: "center",
    marginLeft: 10,
  },
  btnSecondText: {
    color: COLORS.login,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "GeneralSansRegular",
    textAlign: "center",
    marginRight: 10,
  },
});

export default TermsConditions;
