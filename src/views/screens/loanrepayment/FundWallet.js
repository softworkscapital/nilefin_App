import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../../constants/colors";
import Loader from "../../components/Loader";
import { FontAwesome6 } from "react-native-vector-icons";
import APILink from "../../../constants/globals";
import { useFonts } from "expo-font";
import AwesomeAlert from "react-native-awesome-alerts";

const FundWallet = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [amount, setAmount] = React.useState("");

  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  const closeAlert = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };

  const closenowAlert = () => {
    setShowAlert(false);
  };

  const closeFailureAlert = () => {
    setShowFailureAlert(false);
  };

  const [loading, setLoading] = React.useState(false);

  const doFund = async () => {
    if (amount == "") {
      doAlert(
        "Proceeding failed. Fill in the empty amount field",
        "Error Info"
      );
      return;
    }

    const obj = {
      amount: parseFloat(amount) * 100,
      callback_url:
        "https://c0a9-105-112-234-58.ngrok-free.app/api/webhooks/callback/pesa",
    };

    console.log(obj);
    const asynctoken = await AsyncStorage.getItem("TOKEN");
    const apiLink = APILink.getLink();
    let registerResponse = await fetch(`${apiLink}/wallets/funding`, {
      method: "post",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${asynctoken}`,
      },
    });

    let responseJson = await registerResponse.json();
    console.log(responseJson);

    try {
      if (responseJson.message) {
        await AsyncStorage.setItem("pollUrl", responseJson.data.pollUrl);
        await AsyncStorage.setItem(
          "redirectUrl",
          responseJson.data.redirectUrl
        );
        await AsyncStorage.setItem(
          "referenceNumber",
          responseJson.data.referenceNumber
        );
        navigation.navigate("FundOnWeb");
      }
    } catch (e) {
      doAlert("An error occured. Try again", "Error Info");
      console.log("err: " + e);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AwesomeAlert
        show={showAlert}
        contentContainerStyle={{ width: 307 }}
        showProgress={false}
        title={alerttitle}
        message={alerttext}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#1435AB"
        onCancelPressed={() => {
          doAlert("", "");
        }}
        onConfirmPressed={() => {
          doAlert("", "");
        }}
      />
      <Loader visible={loading} />
      <ImageBackground
        source={require("../../../../assets/vectorbg.png")}
        resizeMode="cover"
      >
        <View>
          <ScrollView contentContainerStyle={styles.scroller}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "50%",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("FirstTimeWelcome2")}
                style={{ marginRight: 10, flexDirection: "row" }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../../../assets/arrow-left.png")}
                />
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 16,
                    marginLeft: 10,
                    fontFamily: "GeneralSansRegular",
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.goodtxt}>Wallet Funding</Text>
            <Text style={styles.instruction}>
              Enter the amount you wish to fund into your account.
            </Text>
            <View style={styles.innerview}>
              <View style={styles.innera}>
                <Text style={styles.label}>Amount</Text>
                <View
                  style={{
                    height: 55,
                    backgroundColor: COLORS.light,
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                >
                  <View style={styles.inneraview}>
                    <FontAwesome6
                      name="money-check-dollar"
                      size={25}
                      style={styles.innerviewsimg}
                    />
                  </View>
                  <TextInput
                    autoCorrect={false}
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                    keyboardType="numeric"
                    style={styles.textinput}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  doFund();
                }}
                activeOpacity={0.7}
                style={styles.btnone}
              >
                <Text style={styles.btnonetext}>Fund Wallet</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroller: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  goodtxt: {
    color: "#040B22",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    fontFamily: "GeneralSansMedium",
  },
  instruction: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 10,
    fontFamily: "GeneralSansRegular",
  },
  innerview: {
    marginVertical: 20,
  },
  innera: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "#040B22",
    fontFamily: "GeneralSansRegular",
  },
  inneraview: {
    marginTop: 4,
  },
  innerviewsimg: {
    marginRight: 10,
    marginTop: 10,
  },
  textinput: {
    color: "#040B22",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  btnone: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.login,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  btnonetext: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 18,
    fontFamily: "GeneralSansMedium",
  },
});

export default FundWallet;
