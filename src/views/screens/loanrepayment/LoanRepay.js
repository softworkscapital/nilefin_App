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

const LoanRepay = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [inputs, setInputs] = React.useState({
    dob: "",
    gender: "",
    mstatus: "",
    nationality: "",
    citizenship: "",
    dependents: "",
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
                onPress={() => navigation.navigate("FirstTimeWelcome")}
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
          <Text style={styles.welcometxt}>Repay My Loan</Text>
          <Text style={styles.instruction}>Content will be generated</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ width: "50%", alignItems: "flex-start" }}>
              <Text style={styles.txtOwned}>Amount Owed</Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.txtPercIntrest}>18% Interest Applied</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ width: "8%", alignItems: "flex-start" }}>
              <Text style={styles.txtZdollar}>$</Text>
            </View>
            <View style={{ width: "60%", alignItems: "flex-start" }}>
              <Text style={styles.txtZdollarAmnt}>100,000.00</Text>
            </View>
            <View style={{ width: "32%", alignItems: "flex-start" }}></View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10, width: "85%" }}>
            <View style={{ width: "50%", alignItems: "flex-start" }}>
              <TouchableOpacity onPress={()=>{navigation.navigate('RepayLoanA')}} style={styles.btnBigFilled}>
                <Text style={styles.txtBtnFilled}>Repay Loan</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ width: "50%", alignItems: "flex-start", marginLeft: 5 }}
            >
              <TouchableOpacity style={styles.btnBigOutline}>
                <Text style={styles.txtBtnOutline}>Loan Details</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              width: "100%",
              backgroundColor: "#CFFAFE",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
            }}
          >
            <View
              style={{
                width: "10%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../../assets/exclamation.png")}
                style={{ width: 24, height: 24 }}
              />
            </View>
            <View
              style={{ width: "90%", alignItems: "flex-start", marginLeft: 5 }}
            >
              <Text style={styles.txtStr}>
                Your next payment of{" "}
                <Text style={styles.txtStrBold}>$20,000.00</Text> is due on
                26th March, 2023.
              </Text>
            </View>
          </View>
          <Text style={styles.txtSchedule}>Repayment Schedule (9 months)</Text>
          <View style={{ flexDirection: "row", marginTop: 30, width: "100%" }}>
            <View style={{ width: "50%", alignItems: "flex-start", justifyContent: 'center', flexDirection: 'clumn' }}>
              <Text style={styles.txtMoney}>$20,000.00</Text>
              <Text style={styles.txtMoneyDate}>26th March,2023</Text>
            </View>
            <View
              style={{ width: "50%", alignItems: "flex-end", justifyContent: 'flex-start' }}
            >
              <TouchableOpacity style={styles.btnSmallOutline}>
                <Text style={styles.txtSmlBtnOutline}>Unpaid</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
            <View style={{ width: "50%", alignItems: "flex-start", justifyContent: 'center', flexDirection: 'clumn' }}>
              <Text style={styles.txtMoney}>$20,000.00</Text>
              <Text style={styles.txtMoneyDate}>26th March,2023</Text>
            </View>
            <View
              style={{ width: "50%", alignItems: "flex-end", justifyContent: 'flex-start' }}
            >
              <TouchableOpacity style={styles.btnSmallOutline}>
                <Text style={styles.txtSmlBtnOutline}>Unpaid</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
            <View style={{ width: "50%", alignItems: "flex-start", justifyContent: 'center', flexDirection: 'clumn' }}>
              <Text style={styles.txtMoney}>$20,000.00</Text>
              <Text style={styles.txtMoneyDate}>26th March,2023</Text>
            </View>
            <View
              style={{ width: "50%", alignItems: "flex-end", justifyContent: 'flex-start' }}
            >
              <TouchableOpacity style={styles.btnSmallOutline}>
                <Text style={styles.txtSmlBtnOutline}>Unpaid</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
            <View style={{ width: "50%", alignItems: "flex-start", justifyContent: 'center', flexDirection: 'clumn' }}>
              <Text style={styles.txtMoney}>$20,000.00</Text>
              <Text style={styles.txtMoneyDate}>26th March,2023</Text>
            </View>
            <View
              style={{ width: "50%", alignItems: "flex-end", justifyContent: 'flex-start' }}
            >
              <TouchableOpacity style={styles.btnSmallOutline}>
                <Text style={styles.txtSmlBtnOutline}>Unpaid</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  txtOwned: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    fontFamily: "GeneralSansMedium",
  },
  txtPercIntrest: {
    color: "#C98920",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 10,
    fontFamily: "GeneralSansRegular",
  },
  txtZdollar: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "400",
    marginTop: 10,
    fontFamily: "GeneralSansRegular",
  },
  txtZdollarAmnt: {
    color: "#000000",
    fontSize: 40,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
  },
  btnBigFilled: {
    height: 56,
    width: "100%",
    backgroundColor: "#1435AB",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.login,
    flexDirection: "row",
  },
  txtBtnFilled: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
  },
  btnBigOutline: {
    height: 56,
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#1435AB",
    flexDirection: "row",
  },
  txtBtnOutline: {
      color: "#1435AB",
      fontSize: 18,
      fontWeight: "500",
      fontFamily: "GeneralSansMedium",
    },
    txtStr: {
        color: "#040B22",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "GeneralSansRegular",
    },
    txtStrBold: {
        color: "#040B22",
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "GeneralSansMedium",
    },
    txtSchedule: {
        color: "#040B22",
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "GeneralSansMedium",
        marginTop: 40,
    },
    btnSmallOutline: {
      height: 22,
      width: 64,
      backgroundColor: "#FFFFFF",
      marginVertical: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#1435AB",
      flexDirection: "row",
    },
    txtSmlBtnOutline: {
        color: "#1435AB",
        fontSize: 12,
        fontWeight: "500",
        fontFamily: "GeneralSansMedium",
      },
    txtMoney: {
        color: "#040B22",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "GeneralSansMedium",
      },
    txtMoneyDate: {
        color: "#040B22",
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "GeneralSansRegular",
      },
    instruction: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 5,
  }
});

export default LoanRepay;
