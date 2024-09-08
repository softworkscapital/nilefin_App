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
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../constants/colors";
import Loader from "../components/Loader";
import { useFonts } from "expo-font";
import { useIsFocused } from "@react-navigation/native";
import APILink from "../../constants/globals";

const TipsAdvice = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [userData, setUserdata] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    user_type: "",
    account_type: "",
    password: "",
  });
  const isFocused = useIsFocused();

  const moveBack = async () => {
    try {
      const frmPage = await AsyncStorage.getItem("TipsFrom");
      navigation.navigate(frmPage);
    } catch (exception) {
      console.log(exception);
      navigation.navigate("TwoOfThreeA");
    }
  };

  useEffect(() => {
    console.log("called");
    const getUserData = async () => {
      const asyncid = await AsyncStorage.getItem("CIDID");
      const asyncemail = await AsyncStorage.getItem("CIDEmail");
      const asyncname = await AsyncStorage.getItem("CIDName");
      const asyncphone = await AsyncStorage.getItem("CIDMobileNum");
      const asyncpin = await AsyncStorage.getItem("CIDPin");

      let asyncData = await AsyncStorage.getItem("SelectedAccount");
      let asyncacnt = "";
      let asyncacnttyp = "";

      if (asyncData) {
        asyncData = JSON.parse(asyncData);
        asyncacnt = asyncData.acc;
        asyncacnttyp = asyncData.subacc;
        console.log("user data found");
      }

      setUserdata({
        ...userData,
        fullname: asyncname,
        email: asyncemail,
        phone_number: asyncphone,
        user_type: asyncacnt,
        account_type: asyncacnttyp,
        password: asyncpin,
      });
    };
    // Call only when screen open or when back on screen
    if (isFocused) {
      getUserData();
    }
  }, [props, isFocused]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#155E75",
            marginTop: 30,
            height: 60,
          }}
        >
          <Image
            source={require("../../../assets/light-on.png")}
            style={{ width: 28, height: 28, marginTop: 20, marginLeft: 20 }}
          />
          <Text
            style={{
              fontWeight: 600,
              fontSize: 20,
              marginLeft: 10,
              color: "#FFFFFF",
              marginTop: 20,
            }}
          >
            Tips & Advice{" "}
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
        >
          <Text
            style={{
              color: "#222B45",
              fontSize: 20,
              fontWeight: "700",
              fontFamily: "GeneralSansMedium",
              marginTop: 20,
            }}
          >
            Borrower’s Account
          </Text>
          <Text
            style={{
              color: "#2E3A59",
              fontSize: 16,
              fontWeight: "400",
              fontFamily: "GeneralSansRegular",
              marginVertical: 10,
            }}
          >
            Feugiat mattis pellentesque elit nulla. Laoreet massa ultrices
            tempor magna quis ultrices commodo a, sed. Eu pharetra amet enim
            aliquam libero posuere in vitae.
          </Text>

          <View style={styles.tipsView}>
            <View style={styles.tipIcon}>
              <Image
                source={require("../../../assets/databaseunsuccess.png")}
                style={{ width: 32, height: 32 }}
              />
            </View>
            <View style={styles.tipText}>
              <Text
                style={{
                  color: "#1F2937",
                  fontSize: 16,
                  fontWeight: "600",
                  fontFamily: "GeneralSansMedium",
                }}
              >
                Single Line Title
              </Text>
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 14,
                  fontWeight: "400",
                  fontFamily: "GeneralSansRegular",
                  marginTop: 5,
                }}
              >
                We will go ahead and have a sub-text that describes and explains
                the header text better
              </Text>
            </View>
          </View>

          <View style={styles.tipsView}>
            <View style={styles.tipIcon}>
              <Image
                source={require("../../../assets/databaseunsuccess.png")}
                style={{ width: 32, height: 32 }}
              />
            </View>
            <View style={styles.tipText}>
              <Text
                style={{
                  color: "#1F2937",
                  fontSize: 16,
                  fontWeight: "600",
                  fontFamily: "GeneralSansMedium",
                }}
              >
                Single Line Title
              </Text>
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 14,
                  fontWeight: "400",
                  fontFamily: "GeneralSansRegular",
                  marginTop: 5,
                }}
              >
                We will go ahead and have a sub-text that describes and explains
                the header text better
              </Text>
            </View>
          </View>
          {/*Another*/}
          <Text
            style={{
              color: "#222B45",
              fontSize: 20,
              fontWeight: "700",
              fontFamily: "GeneralSansMedium",
              marginTop: 20,
            }}
          >
            Borrower’s Account
          </Text>
          <Text
            style={{
              color: "#2E3A59",
              fontSize: 16,
              fontWeight: "400",
              fontFamily: "GeneralSansRegular",
              marginVertical: 10,
            }}
          >
            Feugiat mattis pellentesque elit nulla. Laoreet massa ultrices
            tempor magna quis ultrices commodo a, sed. Eu pharetra amet enim
            aliquam libero posuere in vitae.
          </Text>

          <View style={styles.tipsView}>
            <View style={styles.tipIcon}>
              <Image
                source={require("../../../assets/databaseunsuccess.png")}
                style={{ width: 32, height: 32 }}
              />
            </View>
            <View style={styles.tipText}>
              <Text
                style={{
                  color: "#1F2937",
                  fontSize: 16,
                  fontWeight: "600",
                  fontFamily: "GeneralSansMedium",
                }}
              >
                Single Line Title
              </Text>
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 14,
                  fontWeight: "400",
                  fontFamily: "GeneralSansRegular",
                  marginTop: 5,
                }}
              >
                We will go ahead and have a sub-text that describes and explains
                the header text better
              </Text>
            </View>
          </View>

          {/*Proceed Button*/}
          <TouchableOpacity
            onPress={() => moveBack()}
            activeOpacity={0.7}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Done</Text>
            <Image
              style={{ width: 20, height: 18, marginLeft: 7 }}
              source={require("../../../assets/arrow-white.png")}
            />
            <Image
              style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
              source={require("../../../assets/arow-blue.png")}
            />
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tipsView: {
    flexDirection: "row",
    marginTop: 20,
  },
  tipIcon: {
    width: "15%",
  },
  tipText: {
    width: "85%",
  },
  btn: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.signed,
    marginTop: 40,
    marginBottom: 200,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.login,
    flexDirection: "row",
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
  },
});

export default TipsAdvice;
