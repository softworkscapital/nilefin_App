
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../constants/colors";
import Loader from "../components/Loader";
import { useFonts } from "expo-font";
import AwesomeAlert from "react-native-awesome-alerts";
import APILink from "../../constants/globals";

const ThreeOfThree = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [loading, setLoading] = useState(false);
  const [savedPhone, setSavedPhone] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [phonecode, setPhoneCode] = useState("");
  const [token, setToken] = useState("");
  const inputElement = useRef();
  const [passcode, setPasscode] = useState(["", "", "", "", "", ""]);
  const [counter, setCounter] = React.useState(59);

  const [showAlert, setShowAlert] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const doAlert = () => {
    setShowAlert(true);
    closeAlert();
  };

  const closeAlert = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };

  const closenowAlert = () => {
    setShowAlert(false);
  };

  const checkPin = async () => {
    //setShowAlert(false);
    if (token.length != 6) {
      doAlert();
    } else {
      console.log("Token: " + token);
      console.log("Token: " + phone_number);

      const apiLink = APILink.getLink();
      let registerResponse = await fetch(`${apiLink}/users/verify-phone`, {
        method: "post",
        body: JSON.stringify({
          token,
          phone_number,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let responseJson = await registerResponse.json();
      console.log(responseJson);
      if (responseJson.status == "failed") {
        doAlert();
      } else {
        navigation.navigate("Successfull");
      }
    }
  };
  const insertPin = (num) => {
    if (token.length < 6) {
      setToken(num);
    }
  };
  const doFocusing = (num) => {
    inputElement.current.focus();
  };

  const removeLastChar = () => {
    var latestsStr = token.slice(0, -1);
    setToken(latestsStr);
  };

  _onPressHandler = (num) => {
    let tempCode = passcode;
    for (var i = 0; i <= tempCode.length; i++) {
      if (tempCode[i] == "") {
        tempCode[i] = num;
        break;
      } else {
        continue;
      }
    }
    setPasscode(tempCode);
  };

  _onCancelHandler = (num) => {
    let tempCode = passcode;
    for (var i = tempCode.length - 1; i >= 0; i--) {
      if (tempCode[i] != "") {
        tempCode[i] = "";
        break;
      } else {
        continue;
      }
    }
    setPasscode(tempCode);
  };

  useEffect(() => {
    const fetchData = async () => {
      const asyncphone = await AsyncStorage.getItem("CIDMobileNum");
      const asyncphoncode = await AsyncStorage.getItem("CIDMobileCode");
      setPhone_number(asyncphone);
      setPhoneCode(asyncphoncode);
      console.log(asyncphone);
      var lastFive = asyncphone.substring(asyncphone.length - 5);
      setSavedPhone(lastFive);
      try {
        await AsyncStorage.removeItem("IndPersonal");
        await AsyncStorage.removeItem("IndContact");
        await AsyncStorage.removeItem("IndEmployment");
        await AsyncStorage.removeItem("IndDocument");

        await AsyncStorage.removeItem("CopPersonal");
        await AsyncStorage.removeItem("CopContact");
        await AsyncStorage.removeItem("CopEmployment");
        await AsyncStorage.removeItem("CopDocument");
      } catch (exception) {
        console.log("Clearing failed");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const renderCustomAlertView = () => (
    <View style={{ width: "100%" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "10%" }}>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../../../assets/infored.png")}
          />
        </View>
        <View style={{ width: "90%" }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              fontFamily: "GeneralSansRegular",
              color: "#1B1A23",
              marginLeft: 5,
              marginTop: 5,
            }}
          >
            OTP code is incorrect, check and try again.
          </Text>
        </View>
      </View>
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        customView={renderCustomAlertView()}
        showCancelButton={false}
        showConfirmButton={false}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#1435AB"
        onDismiss={() => closenowAlert()}
        alertContainerStyle={{
          backgroundColor: "rgba(218, 227, 242,0.7)",
          justifyContent: "flex-start",
        }}
        contentContainerStyle={{
          backgroundColor: "pink",
          borderWidth: 1,
          borderRadius: 12,
          borderColor: "red",
          width: 320,
          marginTop: 20,
          paddingVertical: 0,
        }}
      />
      <Loader visible={loading} />
      <ImageBackground
        source={require("../../../assets/vectorbg.png")}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: 50,
            paddingHorizontal: 20,
            backgroundColor: modalVisible
              ? "rgba(218, 227, 242,0.7)"
              : COLORS.white,
          }}
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
                onPress={() => navigation.navigate("TwoOfThreeB")}
                style={{ marginRight: 10, marginTop: 5, flexDirection: "row" }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../../assets/arrow-left.png")}
                />
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "50%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "500",
                  fontFamily: "GeneralSansRegular",
                  backgroundColor: COLORS.cyan,
                  padding: 7,
                  borderRadius: 6,
                  marginTop: 2,
                }}
              >
                Step 3 of 3
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              fontFamily: "GeneralSansMedium",
              color: "#040B22",
              marginTop: 30,
            }}
          >
            Verify OTP
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              fontFamily: "GeneralSansRegular",
              color: "#040B22",
              marginTop: 30,
            }}
          >
            A code was sent to{" "}
            <Text
              style={{ fontWeight: "600", fontFamily: "GeneralSansMedium" }}
            >
              {phonecode} **** {savedPhone}
            </Text>{" "}
            enter to verify the phone number
          </Text>

          <View style={{ width: 1, height: 1 }}>
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

          <TouchableOpacity style={styles.pinView} onPress={() => doFocusing()}>
            <View style={styles.pinDisplay}>
              {token.length > 0 && <View style={styles.dot}></View>}
            </View>
            <View style={styles.pinDisplay}>
              {token.length > 1 && <View style={styles.dot}></View>}
            </View>
            <View style={styles.pinDisplay}>
              {token.length > 2 && <View style={styles.dot}></View>}
            </View>
            <View
              style={{ height: 3, width: 10, backgroundColor: "black" }}
            ></View>
            <View style={styles.pinDisplay}>
              {token.length > 3 && <View style={styles.dot}></View>}
            </View>
            <View style={styles.pinDisplay}>
              {token.length > 4 && <View style={styles.dot}></View>}
            </View>
            <View style={styles.pinDisplay}>
              {token.length > 5 && <View style={styles.dot}></View>}
            </View>
          </TouchableOpacity>
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.dnthave}
          >
            Didn’t get the code?{" "}
            {counter < 1 && <Text style={styles.resendText}>Resend Code</Text>}
            {counter > 0 && (
              <Text style={styles.resendText}> Resend in 0:{counter}</Text>
            )}
          </Text>
          {/*Proceed Button*/}
          <TouchableOpacity
            onPress={() => checkPin()}
            activeOpacity={0.7}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Verify</Text>
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
  pinView: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  pinDisplay: {
    backgroundColor: "#CFFAFE",
    flex: 1,
    width: 16,
    height: 54,
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
  btn: {
    height: 55,
    width: "100%",
    backgroundColor: "#1435AB",
    marginTop: 80,
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
    fontWeight: "500",
    fontSize: 18,
    fontFamily: "GeneralSansMedium",
  },
  dnthave: {
    color: COLORS.blk,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
    marginTop: 30,
  },
  resendText: {
    color: COLORS.link,
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
  },
});

export default ThreeOfThree;
