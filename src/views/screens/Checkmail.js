import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert
} from "react-native";

import { useFonts } from "expo-font";
import COLORS from "../../constants/colors";
import APILink from "../../constants/globals";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkmail = ({ navigation }) => {

  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [screen, setScreen] = useState(1);
  const [token, setToken] = useState("");
  const inputElement = useRef();

  const insertPin = (num) => {
    if (token.length < 6) {
      setToken(num);
    }
  };

  const removeLastChar = () => {
    var latestsStr = token.slice(0, -1);
    setToken(latestsStr);
  };

  const handleSubmit = async () => {
    //setShowAlert(false);
    if (token.length != 6) {
      Alert.alert("OTP is incomplete");
    } else {
      const apiLink = APILink.getLink();
      const usrMail = await AsyncStorage.getItem("ResetEmail");
      if (usrMail != null) {
        await AsyncStorage.setItem("EmailResetOTP", token);
        navigation.navigate("NewPin");
      } else {
        Alert.alert("An error occured, resend your email.");
        navigation.navigate("ResetPin");
      }
    }
  };

  const doFocusing = () => {
    inputElement.current.focus();
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/vectorbg.png")}
        resizeMode="stretch"
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        <ScrollView>
          <View style={styles.firstFlex}>
            <Image
              style={styles.mailimg}
              source={require("../../../assets/checkmail.png")}
            />
            <Text style={styles.checkmailtext}>Check your email</Text>
            <Text style={styles.maillowertext}>
              We sent an OTP to your email, copy and paste it here to verify it.
            </Text>
            <View style={{ width: 1, height: 1, marginTop: 40 }}>
              <TextInput
                autoCorrect={false}
                autoFocus={true}
                ref={inputElement}
                keyboardType="numeric"
                value={token}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    removeLastChar();
                  }
                }}
                onChangeText={(text) => insertPin(text)}
              />
            </View>
          </View>
          <View style={styles.secondFlex}>
            <TouchableOpacity style={styles.viewTextBoexs} onPress={() => doFocusing()}>
              <View style={styles.viewDot}>
                {token.length > 0 && <View style={styles.dot}></View>}
              </View>
              <View style={styles.viewDot}>
                {token.length > 1 && <View style={styles.dot}></View>}
              </View>
              <View style={styles.viewDot}>
                {token.length > 2 && <View style={styles.dot}></View>}
              </View>
              <Text style={styles.txtDash}>-</Text>
              <View style={styles.viewDot}>
                {token.length > 3 && <View style={styles.dot}></View>}
              </View>
              <View style={styles.viewDot}>
                {token.length > 4 && <View style={styles.dot}></View>}
              </View>
              <View style={styles.viewDot}>
                {token.length > 5 && <View style={styles.dot}></View>}
              </View>
            </TouchableOpacity>
            <Text
              onPress={() => navigation.navigate("Signin")}
              style={styles.dnthave}
            >
              Didn’t get the code?{" "}
              <Text style={styles.resendText}>Resend Code</Text>
            </Text>
            <TouchableOpacity
            onPress={() => handleSubmit()}
            activeOpacity={0.7}
            style={styles.btn}>
            <Text style={styles.btnText}>Verify</Text>
            <Image
              style={{ width: 20, height: 18, marginLeft: 7 }}
              source={require('../../../assets/arrow-white.png')}
            />
            <Image
              style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
              source={require('../../../assets/arow-blue.png')}
            />
          </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  firstFlex: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  mailimg: {
    alignSelf: "center",
    width: 223,
    height: 291,
    resizeMode: "stretch",
  },
  checkmailtext: {
    color: "#040B22",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
    marginTop: 12,
  },
  maillowertext: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "GeneralSansRegular",
    marginTop: 5,
    textAlign: "center",
  },
  txtDash: {
    color: "#3000000",
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
    marginTop: 5,
    textAlign: "center",
  },
  viewDot: {
    backgroundColor: "#CFFAFE",
    width: "14%",
    height: 50,
    margin: 3,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    backgroundColor: "black",
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  editview: {
    flexDirection: "row",
    marginTop: 20,
  },
  editviewicon: {
    marginRight: 8,
    width: 24,
    height: 24,
  },
  editviewtext: {
    color: "#0891B2",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
    textAlign: "center",
  },
  secondFlex: {
    flex: 3,
    marginTop: 10,
    marginBottom: 100,
  },
  viewTextBoexs: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  btn: {
    height: 55,
    width: '100%',
    backgroundColor: COLORS.signed,
    marginTop: 120,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.login,
    flexDirection: 'row',
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'GeneralSansMedium',
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
    fontFamily: "GeneralSansMedium",
    textAlign: "center",
    marginLeft: 10,
  },
  btnSecondText: {
    color: COLORS.login,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
    textAlign: "center",
    marginRight: 10,
  },
  icoimg: {
    marginLeft: 10,
    height: 24,
    width: 24,
  },
  dnthave: {
    color: COLORS.blk,
    fontWeight: "400",
    fontSize: 16,
    marginTop: 20,
    fontFamily: "GeneralSansRegular",
    textAlign: "center",
  },
  resendText: {
    color: COLORS.link,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "GeneralSansMedium",
  },
});

export default Checkmail;
