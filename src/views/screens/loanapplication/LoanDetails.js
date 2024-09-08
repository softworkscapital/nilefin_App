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
import { useIsFocused } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { useFonts } from "expo-font";

const LoanDetails = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [inputs, setInputs] = React.useState({
    score: "",
    income: "",
    lstatus: "",
  });

  const isFocused = useIsFocused();
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const saveLoanStart = async () => {
    if (inputs.score == "") {
      Alert.alert("Proceeding failed. Fill in the empty credit score");
      return;
    } else {
      console.log(inputs.score)
    }
    if (inputs.income == "") {
      Alert.alert("Proceeding failed. Fill in the empty anual income");
      return;
    }
    if (inputs.lstatus == "") {
      Alert.alert("Proceeding failed. Fill in the empty employment status");
      return;
    }
    if (checked == false) {
      Alert.alert("Proceeding failed. Checkbox is not checked");
      return;
    }

    await AsyncStorage.setItem("CreditScore", inputs.score);
    await AsyncStorage.setItem("AnualIncome", inputs.income);
    await AsyncStorage.setItem("EmpStatus", inputs.lstatus);

    navigation.navigate("LoanDetailsB");
  };

  useEffect(() => {
   
    setInputs({
      score: "",
      income: "",
      lstatus: "",
    });

    if (isFocused) {
      findFormData();
    }
  }, [props, isFocused]);

  const findFormData = async () => {
    try {
      const [asyncScore, asyncIncome, asyncStatus] = await Promise.all([
        AsyncStorage.getItem("CreditScore"),
        AsyncStorage.getItem("AnualIncome"),
        AsyncStorage.getItem("EmpStatus"),
      ]);
  
      if (asyncScore) {
        setInputs({
          score: asyncScore,
          income: asyncIncome || "N/A", // Default value if income is missing
          lstatus: asyncStatus || "Unknown", // Default value if status is missing
        });
        setChecked(true);
        console.log("Loan data found");
      } else {
        console.log("No loan data found");
      }
    } catch (error) {
      console.error("Error retrieving loan data:", error);
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
                onPress={() => navigation.navigate("LoanApply")}
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
                Step 1 of 2
              </Text>
            </View>
          </View>
          <Text style={styles.welcometxt}>Loan Details</Text>
          <Text style={styles.instruction}>
            Please provide the required information for your request
          </Text>
          <View style={styles.innerview}>
            <View style={styles.innera}>
              <Text style={styles.label}>Credit Score</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.score}
                  onChangeText={(text) => setInputs({ ...inputs, score: text })}
                  style={styles.textinputEnabled}
                />
              </View>
            </View>

            <View style={styles.innera}>
              <Text style={styles.label}>Annual Income</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  keyboardType="numeric"
                  value={inputs.income}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, income: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>

            <View style={styles.innera}>
              <Text style={styles.label}>Employment Status</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  onValueChange={(text) =>
                    setInputs({ ...inputs, lstatus: text })
                  }
                  items={[
                    { label: "Unemployed", value: "unemployed", key: 1 },
                    { label: "Employed", value: "employed", key: 2 },
                    {
                      label: "Student",
                      value: "student",
                      key: 3,
                    },
                    {
                      label: "Business",
                      value: "business",
                      key: 4,
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.innerba}>
              <View style={styles.innerbaone}>
                <Checkbox
                  color={"#000000"}
                  uncheckedColor={"#000000"}
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <Text style={styles.keepme}>
                By checking this box, I hereby consent to a credit check as part
                of my loan application.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => saveLoanStart()}
              activeOpacity={0.7}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Continue</Text>
              <Image
                style={{ width: 20, height: 18, marginLeft: 7 }}
                source={require("../../../../assets/arrow-white.png")}
              />
              <Image
                style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
                source={require("../../../../assets/arow-blue.png")}
              />
            </TouchableOpacity>
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
    fontSize: 14,
    fontWeight: "500",
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
  selectContainer: {
    height: 55,
    backgroundColor: "#F0F2FA",
    paddingHorizontal: 2,
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
  innerba: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "90%",
  },
  innerbaone: {
    marginTop: 4,
  },
  keepme: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 10,
    fontFamily: "GeneralSansRegular",
  }
});

export default LoanDetails;
