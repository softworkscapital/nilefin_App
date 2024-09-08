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
import { SimpleLineIcons } from "react-native-vector-icons";
import APILink from "../../../constants/globals";
import RNPickerSelect from "react-native-picker-select";

const CorporationFinancial = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    grmargin: "",
    anincome: "",
    moincome: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleSubmitSave = async () => {
    
    if (inputs.grmargin == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty gross profit margin field"
      );
      return;
    }

    if (inputs.anincome == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty anual gross income field"
      );
      return;
    }
    
    if (inputs.moincome == "") {
      Alert.alert("Proceeding failed. Fill in the empty monthly income field");
      return;
    }

    const obj = {
      annual_gross_income: inputs.anincome,
      gross_profit_margin: inputs.grmargin,
      monthly_income: inputs.moincome,
    };

    console.log(obj);
    const asynctoken = await AsyncStorage.getItem("TOKEN");
    const apiLink = APILink.getLink();
    let registerResponse = await fetch(`${apiLink}/kyc/businesses/financials`, {
      method: "patch",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${asynctoken}`,
      },
    });

    let responseJson = await registerResponse.json();
    try {
      if (responseJson.data) {
        Alert.alert("Saving successfull");
        await AsyncStorage.setItem("CopContact", "Yes");
        navigation.navigate("CopCompleteProfile");
      }
    } catch (e) {
      console.log("Errors Occured");
    }
  };
  const handleSubmitContinue = async () => {
    
    if (inputs.grmargin == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty gross profit margin field"
      );
      return;
    }

    if (inputs.anincome == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty anual gross income field"
      );
      return;
    }
    
    if (inputs.moincome == "") {
      Alert.alert("Proceeding failed. Fill in the empty monthly income field");
      return;
    }

    const obj = {
      annual_gross_income: inputs.anincome,
      gross_profit_margin: inputs.grmargin,
      monthly_income: inputs.moincome,
    };

    console.log(obj);
    const asynctoken = await AsyncStorage.getItem("TOKEN");
    const apiLink = APILink.getLink();
    let registerResponse = await fetch(`${apiLink}/kyc/businesses/financials`, {
      method: "patch",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${asynctoken}`,
      },
    });

    let responseJson = await registerResponse.json();
    try {
      if (responseJson.data) {
        Alert.alert("Saving successfull");
        await AsyncStorage.setItem("CopContact", "Yes");
        navigation.navigate("Directorship");
      }
    } catch (e) {
      console.log("Errors Occured");
    }
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
                onPress={() => navigation.navigate("CorporationDetails")}
                style={{ marginRight: 10, marginTop: 5, flexDirection: "row" }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../../../assets/arrow-left.png")}
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
                Step 2 of 4
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.welcometxt}>
                Corporation Financial Details
              </Text>
              <Text style={styles.instruction}>
                Please provide the required information.
              </Text>
            </View>
          </View>

          <View style={styles.innerview}>
            <View style={styles.innera}>
              <Text style={styles.label}>Gross Profit Margin</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.grmargin}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, grmargin: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Annual Gross Income</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.anincome}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, anincome: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Monthly Income</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.moincome}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, moincome: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => handleSubmitSave()}
                activeOpacity={0.7}
                style={styles.btn1}
              >
                <Text style={styles.btn1Text}>Save Progress</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSubmitContinue()}
                activeOpacity={0.7}
                style={styles.btn2}
              >
                <Text style={styles.btn2Text}>Continue</Text>
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
  instruction: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 5,
  },
  innerview: {
    marginVertical: 20,
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

  btn1: {
    height: 55,
    width: "50%",
    backgroundColor: "#FFFFFF",
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.login,
    flexDirection: "row",
  },
  btn1Text: {
    color: COLORS.signed,
    fontWeight: "500",
    fontSize: 18,
  },
  btn2: {
    height: 55,
    width: "50%",
    backgroundColor: COLORS.signed,
    marginTop: 3,
    marginLeft: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.login,
    flexDirection: "row",
  },
  btn2Text: {
    color: COLORS.white,
    fontWeight: "500",
    fontSize: 18,
  }
});

export default CorporationFinancial;
