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
import { useIsFocused } from "@react-navigation/native";
import { useFonts } from "expo-font";

const LoanSummary = ({ navigation, props }) => {
  
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const isFocused = useIsFocused();

  const [inputs, setInputs] = React.useState({
    score: "",
    income: "",
    lstatus: "",
    purpose: "",
    amount: "",
    term: "",
    intrate: ""
  });

  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleSubmit = async () => {
    //console.log(inputs);

    const obj = {
      "annual_income": inputs.income,
      "amount": inputs.amount,
      "credit_score": inputs.score,
      "employment_status": inputs.lstatus,
      "interest_rate": parseInt(inputs.intrate),
      "purpose": inputs.purpose,
      "term": inputs.term
  };

    console.log(obj);
    const asynctoken = await AsyncStorage.getItem("TOKEN");
    //console.log(asynctoken)
    const apiLink = APILink.getLink();
console.log(apiLink);
 
    let registerResponse = await fetch(
      `${apiLink}/loans`,
      {
        method: "post",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      });
      console.log(registerResponse);


    let responseJson = await registerResponse.json();
    let responseJsontxt = await registerResponse.text();
    console.log("RESP"+responseJson);

    try {
      if (responseJson.data) {

        navigation.navigate("Congratulations");
      }
    } catch (e) {
      console.log("Errors Occured");
    }
    try {
      if (responseJson.status=="failed") {
        Alert.alert(responseJson.message);
      }
    } catch (e) {
      console.log("Errors Occured");
    }

  };

  useEffect(() => {
    if (isFocused) {
      findFormData();
    }
  }, [props, isFocused]);

  const findFormData = async () => {
    try {
      const asyncScore = await AsyncStorage.getItem("CreditScore");
      const asyncIncome = await AsyncStorage.getItem("AnualIncome");
      const asyncStatus = await AsyncStorage.getItem("EmpStatus");

      const asyncPurpose = await AsyncStorage.getItem("LoanPurpose");
      const asyncAmnt = await AsyncStorage.getItem("LoanAmnt");
      const asyncTerm = await AsyncStorage.getItem("LoanTerm");
      const asyncIntrate = await AsyncStorage.getItem("LoanIntrate");
      
      if (asyncScore) { 
        console.log("previous loan data found");
        if (asyncPurpose) {
          setInputs({
            score: asyncScore,
            income: asyncIncome,
            lstatus: asyncStatus,
            purpose: asyncPurpose,
            amount: asyncAmnt,
            term: asyncTerm,
            intrate: asyncIntrate
          });
          setChecked(true);
          console.log("current loan data found");
        } else {
          console.log("No current loan data found");
        }
      } else {
        console.log("No previous loan data found");
      }
     
    } catch (error) {
      console.log(error);
    }
  };


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
                onPress={() => navigation.navigate("LoanDetailsB")}
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
          </View>
          <Text style={styles.welcometxt}>Loan Summary</Text>

          <View style={styles.innerview}>
            <Text style={styles.txtRequested}>Requested Loan Amount</Text>
            <Text style={styles.txtAmnt}>${inputs.amount}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ContactDetails")}
              activeOpacity={0.7}
              style={styles.btnUnder}
            >
              <Text style={styles.btnUnderText}>Under Review</Text>
            </TouchableOpacity>
           
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.txtLnDet}>Loan Details</Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: 20,
                }}
              >
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabel}>Credit Score</Text>
                </View>
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabelAmnt}>{inputs.score}</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: 10,
                }}
              >
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabel}>Annual Income</Text>
                </View>
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabelAmnt}>$ {inputs.income}</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: 10,
                }}
              >
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabel}>Employment Status</Text>
                </View>
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabelAmnt}>{inputs.lstatus}</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: 10,
                }}
              >
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabel}>Loan Purpose</Text>
                </View>
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabelAmnt}>{inputs.purpose}</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: 10,
                }}
              >
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabel}>Loan Term</Text>
                </View>
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabelAmnt}>{inputs.term} Months</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: 10,
                }}
              >
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabel}>Interest Rate</Text>
                </View>
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text style={styles.txtLabelAmnt}>{inputs.intrate} %</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
              onPress={() => handleSubmit()}
              activeOpacity={0.7}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Apply for loan</Text>
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
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    fontFamily: "GeneralSansRegular",
  },
  innerview: {
    marginVertical: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  txtRequested: {
    color: "#040B22",
    fontWeight: "500",
    fontFamily: "GeneralSansRegular",
    fontSize: 14,
  },
  txtAmnt: {
    color: "#040B22",
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
    fontSize: 32,
    marginTop: 8,
  },
  btnUnderText: {
    color: "#E9B22B",
    fontWeight: "500",
    fontSize: 10,
    fontFamily: "GeneralSansMedium",
  },
  btnUnder: {
    height: 32,
    width: 110,
    backgroundColor: "#FFFFFF",
    borderColor: "#E9B22B",
    marginTop: 3,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  txtLnDet: {
    color: "#040B22",
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
    fontSize: 16,
    marginTop: 8,
  },
  txtLabel: {
    color: "#1435AB",
    fontWeight: "500",
    fontFamily: "GeneralSansRegular",
    fontSize: 14,
    marginTop: 8,
  },
  txtLabelAmnt: {
    color: "#040B22",
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
    fontSize: 16,
    marginTop: 8,
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

export default LoanSummary;
