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

const RepayLoanE = ({ navigation }) => {
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
                onPress={() => navigation.navigate("RepayLoanC")}
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

          <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
            <View
              style={{
                width: "50%",
                alignItems: "flex-start",
              }}
            >
              <TouchableOpacity style={styles.btnSelected}>
                <Text style={styles.txtBtnSelectedTop}>Next repayment</Text>
                <View style={{ flexDirection: "row", marginTop: 7 }}>
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#0891B2",
                      height: 24,
                      width: 24,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#0891B2",
                        height: 17,
                        width: 17,
                        borderRadius: 10,
                      }}
                    ></View>
                  </View>
                  <View>
                    <Text style={styles.txtBtnSelectedBtm}>$1,000,000</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                alignItems: "flex-start",
                marginLeft: 5,
                flexDirection: "column",
              }}
            >
              <TouchableOpacity style={styles.btnNonSelected}>
                <Text style={styles.txtBtnNonSelectedTop}>Full repayment</Text>
                <View style={{ flexDirection: "row", marginTop: 7 }}>
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#030712",
                      height: 24,
                      width: 24,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  ></View>
                  <View>
                    <Text style={styles.txtBtnNonSelectedBtm}>
                      $100,000,000
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.innera}>
            <Text style={styles.label}>Custom Amount</Text>
            <View style={styles.inputContainer}>
              <TextInput
                autoCorrect={false}
                keyboardType="numeric"
                value={inputs.dependents}
                onChangeText={(text) =>
                  setInputs({ ...inputs, dependents: text })
                }
                style={styles.textinputEnabled}
              />
            </View>
            <Text style={styles.txtMinAmnt}>Minimum of $1,000,000</Text>
          </View>
          <Text style={styles.txtSchedule}>Payment Method</Text>
          <View style={{ flexDirection: "row", width: "100%", marginTop: 20 }}>
            <View style={{ width: "30" }}>
              <TouchableOpacity style={styles.btnBank}>
                <Text style={styles.txtBtnBank}>Bank Transfer</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "30" }}>
              <TouchableOpacity onPress={()=>navigation.navigate('RepayLoanUsdA')} style={styles.btnUssd}>
                <Text style={styles.txtBtnUssd}>
                  USSD Code{" "}
                  <Text style={[styles.txtBtnUssd, { fontSize: 8 }]}>
                    (MOMO)
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "30" }}>
              <TouchableOpacity onPress={()=>navigation.navigate('RepayLoanDcardA')} style={[styles.btnUssd, { width: 99 }]}>
                <Text style={styles.txtBtnUssd}>Debit Card</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("FirstTimeWelcome")} style={[styles.btnPending, { width: 99 }]}>
            <Text style={styles.txtBtnPending}>Approved</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <View style={{ width: "8%", alignItems: "flex-start" }}>
              <Text style={styles.txtZdollar}>$</Text>
            </View>
            <View style={{ width: "60%", alignItems: "flex-start" }}>
              <Text style={styles.txtZdollarAmnt}>100,000.00</Text>
            </View>
            <View style={{ width: "32%", alignItems: "flex-start" }}></View>
          </View>
          <Text style={styles.txtUpload}>Proof of Payment</Text>

          <View style={styles.uploadStateView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../../../../assets/uploadicon.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "80%",
                flexDirection: "column",
              }}
            >
              <Text style={styles.txtUploadStateTop}>Image.jpg</Text>
              <Text style={styles.txtUploadStateBtm}>
                200 KB – 100% uploaded
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../../../assets/tick.png")}
              />
            </View>
          </View>
          <View style={styles.uploadStateOpt}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Text style={[styles.txtOptions, { marginRight: 10 }]}>View</Text>
              <Text style={styles.txtOptions}>Delete</Text>
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
  btnSelected: {
    height: 78,
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#0891B2",
    flexDirection: "column",
  },
  btnNonSelected: {
    height: 78,
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#030712",
    flexDirection: "column",
  },
  txtBtnSelectedTop: {
    color: "#0891B2",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
  },
  txtBtnNonSelectedTop: {
    color: "#030712",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
  },
  txtBtnSelectedBtm: {
    color: "#0891B2",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
    marginLeft: 10,
  },
  txtBtnNonSelectedBtm: {
    color: "#030712",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
    marginLeft: 10,
  },
  txtSchedule: {
    color: "#040B22",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
    marginTop: 15,
  },
  instruction: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 5,
  },
  innera: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 12,
    fontWeight: "500",
    color: "#040B22",
  },
  inputContainer: {
    height: 55,
    backgroundColor: "#F0F2FA",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#D0D7EE",
  },
  textinputEnabled: {
    fontSize: 16,
    fontWeight: "600",
    color: "#040B22",
    flex: 1,
  },
  txtMinAmnt: {
    fontSize: 12,
    fontWeight: "500",
    color: "#3B57B9",
    fontFamily: "GeneralSansRegular",
  },
  btnBank: {
    height: 40,
    width: 110,
    backgroundColor: "#164E63",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 23,
    flexDirection: "row",
  },
  txtBtnBank: {
    color: "#F6F7FA",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
  },
  btnUssd: {
    height: 40,
    width: 130,
    backgroundColor: "#E8FDFF",
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 23,
    flexDirection: "row",
  },
  txtBtnUssd: {
    color: "#164E63",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
  },
  btnPending: {
    marginTop: 30,
    height: 32,
    width: 77,
    backgroundColor: "#F0FDF4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 21,
    flexDirection: "row",
  },
  txtBtnPending: {
    color: "#2CA04C",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
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
  txtUpload: {
    marginTop: 25,
    fontSize: 14,
    fontWeight: "500",
    color: "#040B22",
    fontFamily: "GeneralSansMedium",
  },
  uploadStateView: {
    width: "100%",
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A1A1AA",
    height: 64,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  txtUploadStateTop: {
    color: "#344054",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
  },
  txtUploadStateBtm: {
    color: "#667085",
    fontWeight: "400",
    fontSize: 12,
    fontFamily: "GeneralSansRegular",
  },
  uploadStateOpt: {
    width: "100%",
    marginTop: 5,
    flexDirection: "row",
    paddingVertical: 5,
  },
  txtOptions: {
    color: "#505050",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
  },
});

export default RepayLoanE;