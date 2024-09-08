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
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "react-native-paper";
import COLORS from "../../../constants/colors";
import Loader from "../../components/Loader";
import APILink from "../../../constants/globals";
import { useFonts } from "expo-font";
import { Feather } from "react-native-vector-icons";

const RepaySummary = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [inputs, setInputs] = React.useState({
    amnt: "",
    card: "5999 9099 0099 2222",
    expiry: "MM/YYYY",
    cvv: "***",
  });

  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleSubmit = async () => {
    if (inputs.dob == "") {
      Alert.alert("Proceeding failed. Fill in the empty DOB field");
      return;
    }
    if (inputs.gender == "") {
      Alert.alert("Proceeding failed. Fill in the empty gender field");
      return;
    }
    if (inputs.mstatus == "") {
      Alert.alert("Proceeding failed. Fill in the empty marital status field");
      return;
    }
    if (inputs.nationality == "") {
      Alert.alert("Proceeding failed. Fill in the empty nationality field");
      return;
    }
    if (inputs.citizenship == "") {
      Alert.alert("Proceeding failed. Fill in the empty citizenship field");
      return;
    }
    if (inputs.dependency == "") {
      Alert.alert("Proceeding failed. Fill in the empty dependency field");
      return;
    }

    // await AsyncStorage.setItem("CIDID", "0");
    // await AsyncStorage.setItem("CIDEmail", inputs.email);
    // await AsyncStorage.setItem("CIDName", inputs.fullName);
    // await AsyncStorage.setItem("CIDMobileNum", "+263"+inputs.phone);
    // await AsyncStorage.setItem('CIDPin', inputs.password);
    // await AsyncStorage.setItem('PrevPage', 'PersonalDetails');
    // navigation.navigate('TwoOfThreeA');
  };

  // useEffect(() => {
  //   const apiLink = APILink.getLink();
  //   const fetchData = async () => {
  //     //setLoading(true);
  //     const asyncid = await AsyncStorage.getItem('CIDID');
  //     const asyncemail = await AsyncStorage.getItem('CIDEmail');
  //     const asyncname = await AsyncStorage.getItem('CIDName');
  //     const asyncphone = await AsyncStorage.getItem('CIDMobileNum');
  //     setInputs({
  //       ...inputs,
  //       clientId: asyncid,
  //       fullName: asyncname,
  //       phone: asyncphone,
  //       email: asyncemail
  //     });
  //     //setLoading(false);
  //   };
  //   fetchData();
  // }, [inputs]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ImageBackground
        source={require("../../../../assets/vectorbg.png")}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scroller}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("LoanRepay")}
                style={{ marginRight: 10, marginTop: 5, flexDirection: "row" }}
              >
                <Image style={{ width: 20, height: 20 }} source={require("../../../../assets/arrow-left.png")} />
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
            ></View>
          </View>
          <Text style={styles.welcometxt}>Repayment Summary</Text>

          <View
            style={{
              flexDirection: "column",
              marginTop: 10,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[styles.welcometxt, { fontSize: 14, marginTop: 20 }]}>
              Amount
            </Text>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "600",
                fontFamily: "GeneralSansMedium",
              }}
            >
              $20,000.00
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RepayLoanDcardA")}
              style={styles.btnUssd}
            >
              <Text style={styles.txtBtnUssd}>Payment to be made</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginTop: 60,
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "GeneralSansMedium",
              }}
            >
              Payment Details
            </Text>
            <View style={{ flexDirection: "row", width: "100%", marginTop: 25 }}>
            <View style={{ width: "50%" }}>
              <Text style={styles.txtMethod}>Method</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.txtDcard}>Debit Card</Text>
            </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              width: "100%",
              backgroundColor: "#F0F2FA",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#D0D7EE'
            }}
          >
            <View
              style={{
                width: '13%',
                height: 40,
                borderRadius: 20,
                backgroundColor: '#FFFFFF',
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../../assets/stanchart.jpeg")}
                style={{ width: 30, height: 24 }}
              />
            </View>
            <View
              style={{ width: "77%", alignItems: "flex-start", marginLeft: 15, flexDirection: 'column' }}
            >
              <Text style={styles.txtStrBank}>
              Standard Chartered
              </Text>
              <Text style={styles.txtStrBankAcc}>
              519055******0098
              </Text>
            </View>
            <View
              style={{ width: "10%", alignItems: "flex-start", justifyContent: 'center' }}
            >
          <Feather
                name="trash"
                size={25}
                style={styles.innerviewsimg}
              />
             
            </View>
          </View>

          <View style={{ flexDirection: "row", width: "100%", marginTop: 25 }}>
            <View style={{ width: "50%" }}>
              <Text style={styles.txtMethod}>Interest Rate</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.txtDcard}>25%</Text>
            </View>
            </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PaymentSuccessfull")}
            activeOpacity={0.7}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Complete</Text>
            <Image
              style={{ width: 20, height: 18, marginLeft: 7 }}
              source={require("../../../../assets/arrow-white.png")}
            />
            <Image
              style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
              source={require("../../../../assets/arow-blue.png")}
            />
          </TouchableOpacity>
        </ScrollView>
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
  welcometxt: {
    color: "#040B22",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },
  btn: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.signed,
    marginTop: 180,
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
  btnUssd: {
    marginTop: 15,
    height: 22,
    width: 139,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#F9CB34",
    flexDirection: "row",
  },
  txtBtnUssd: {
    color: "#F9CB34",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "GeneralSansRegular",
  },
  txtMethod: {
    color: "#1435AB",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "GeneralSansRegular"
  },
  txtDcard: {
    color: "#040B22",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium"
  },
  txtStrBank: {
    color: "#040B22",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
  },
  txtStrBankAcc: {
    color: "#040B22",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "GeneralSansRegular",
  },
  innerviewsimg: {
    marginRight: 10
  },
});

export default RepaySummary;
