import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Checkbox } from "react-native-paper";
import COLORS from "../../../constants/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import { useFonts } from "expo-font";
import APILink from "../../../constants/globals";

const TransectionPin = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });
  const [loading, setLoading] = React.useState(false);
  const [filled, setFilled] = React.useState(0);
  const [pin, setPin] = React.useState([]);

  const setTransectionPin = async () => {
    const providedPin =
      pin[0] +
      "" +
      pin[1] +
      "" +
      pin[2] +
      "" +
      pin[3] +
      "" +
      pin[4] +
      "" +
      pin[5];

    console.log("pin" + providedPin);
    const loanAmount = await AsyncStorage.getItem("ToFundAmount");
    const loanId = await AsyncStorage.getItem("ToFundLoanid");

    console.log("amnt" + loanAmount);
    console.log("loanid" + loanId);
    //Call API HERE
    const apiLink = APILink.getLink();
    const asynctoken = await AsyncStorage.getItem("TOKEN");
    //console.log("Token: " + asynctoken);
    let res = await fetch(`${apiLink}/loans/${loanId}/fund`, {
      method: "post",
      body: JSON.stringify({
        is_insured: "true",
        amount: loanAmount,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${asynctoken}`,
      },
    });

    let responseJson = await res.json();
    console.log(responseJson);
    try {
      if (responseJson.message == "Insufficient account balance") {
        Alert.alert("Insufficient account balance");
      }
    } catch (e) {
      console.log(e);
    }
    try {
      if (responseJson.data) {
        Alert.alert("Funding successfull");
        navigation.navigate("LoanMarket");
      }
    } catch (e) {
      console.log(e);
    }
    //  if(responseJson.message == "Transaction token set successfully"){
    //   navigation.navigate('MarketSuccessfull');
    //  }
    //  if(responseJson.message == "Transaction pin already set"){
    //   //Alert.alert("Transaction pin already set");
    //   navigation.navigate('MarketSuccessfull');
    //  }
  };

  const numbersPinAdd = (num) => {
    let tempArr = pin;
    tempArr.push(num);
    setPin(tempArr);
  };
  const numbersPinRemove = () => {
    let tempArr = pin;
    tempArr.pop();
    setPin(tempArr);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <View style={style.mainview}>
          <Text style={style.welcometext}>Input PIN to authorise payment</Text>
          <Text
            style={{
              color: "#374151",
              fontSize: 16,
              fontWeight: "400",
              marginTop: 2,
              alignSelf: "flex-start",
            }}
          >
            Input correct credentials.
          </Text>
          <TouchableOpacity
            onPress={() => setTransectionPin()}
            activeOpacity={0.7}
            style={style.btn}
          >
            <Text style={style.btnText}>Continue</Text>
            <Image
              style={{ width: 20, height: 18, marginLeft: 7 }}
              source={require("../../../../assets/arrow-white.png")}
            />
            <Image
              style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
              source={require("../../../../assets/arow-blue.png")}
            />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", padding: 10 }}>
            <View>
              {filled >= 1 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star0.png")}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star1.png")}
                />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              {filled >= 2 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star0.png")}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star1.png")}
                />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              {filled >= 3 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star0.png")}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star1.png")}
                />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              {filled >= 4 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star0.png")}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star1.png")}
                />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              {filled >= 5 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star0.png")}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star1.png")}
                />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              {filled >= 6 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star0.png")}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require("../../../../assets/Star1.png")}
                />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                  numbersPinAdd("1");
                }
              }}
              style={{
                backgroundColor: "#F0F2FA",
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={style.numbers}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                  numbersPinAdd("2");
                }
              }}
              style={{
                backgroundColor: "#F0F2FA",
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={style.numbers}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                  numbersPinAdd("3");
                }
              }}
              style={{
                backgroundColor: "#F0F2FA",
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={style.numbers}>3</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                  numbersPinAdd("4");
                }
              }}
              style={{
                backgroundColor: "#F0F2FA",
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={style.numbers}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                  numbersPinAdd("5");
                }
              }}
              style={{
                backgroundColor: "#F0F2FA",
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={style.numbers}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                  numbersPinAdd("6");
                }
              }}
              style={{
                backgroundColor: "#F0F2FA",
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={style.numbers}>6</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                  numbersPinAdd("7");
                }
              }}
              style={{
                backgroundColor: "#F0F2FA",
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={style.numbers}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                  numbersPinAdd("8");
                }
              }}
              style={{
                backgroundColor: "#F0F2FA",
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={style.numbers}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                  numbersPinAdd("9");
                }
              }}
              style={{
                backgroundColor: "#F0F2FA",
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={style.numbers}>9</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 63,
                width: 76,
                height: 76,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                  numbersPinAdd("0");
                }
              }}
              style={{
                backgroundColor: "#F0F2FA",
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={style.numbers}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled > 0) {
                  setFilled(filled - 1);
                  numbersPinRemove();
                }
              }}
              style={{
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 48, height: 48 }}
                source={require("../../../../assets/btnback.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainview: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  welcometext: {
    color: COLORS.egyptionblue,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
    marginTop: 69,
    alignSelf: "flex-start",
  },
  numbers: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "GeneralSansMedium",
  },
  btn: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.signed,
    marginTop: 60,
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
  },
});

export default TransectionPin;
