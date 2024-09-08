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
import RNPickerSelect from "react-native-picker-select";
import { useIsFocused } from "@react-navigation/native";
import { useFonts } from "expo-font";

const LoanDetailsB = ({ navigation, props }) => {
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
  const [checked, setChecked] = React.useState(false);

  const handleSubmit = async () => {
    
    if (inputs.purpose == "") {
      Alert.alert("Proceeding failed. Fill in the empty loan purpose field");
      return;
    }

    if (inputs.amount == "") {
      Alert.alert("Proceeding failed. Fill in the empty loan amount field");
      return;
    }

    if (inputs.term == "") {
      Alert.alert("Proceeding failed. Fill in the empty loan term field");
      return;
    }

    if (inputs.intrate == "") {
      Alert.alert("Proceeding failed. Fill in the empty loan intrest rate field");
      return;
    }

    if (checked == false) {
      Alert.alert("Proceeding failed. Checkbox is not checked");
      return;
    }

    await AsyncStorage.setItem("LoanPurpose", inputs.purpose);
    await AsyncStorage.setItem("LoanAmnt", inputs.amount);
    await AsyncStorage.setItem("LoanTerm", inputs.term);
    await AsyncStorage.setItem("LoanIntrate", inputs.intrate);
   
    navigation.navigate("LoanSummary")
  };

  useEffect(() => {
    const findFormData = async () => {
    try {
      const asyncScore = await AsyncStorage.getItem("CreditScore");
      const asyncIncome = await AsyncStorage.getItem("AnualIncome");
      const asyncStatus = await AsyncStorage.getItem("EmpStatus");

      const asyncPurpose = await AsyncStorage.getItem("LoanPurpose");
      const asyncAmnt = await AsyncStorage.getItem("LoanAmnt");
      const asyncTerm = await AsyncStorage.getItem("LoanTerm");
      const asyncIntrate = await AsyncStorage.getItem("LoanIntrate");
      console.log({CreditScore},"CreditScore")

      if (asyncScore) {
        setInputs({... inputs,
          score: asyncScore,
          income: asyncIncome,
          lstatus: asyncStatus,
        });
        
        console.log("previous loan data found");
      } else {
        console.log("No previous loan data found");
      }
      if (asyncPurpose) {
        setInputs({... inputs,
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
    } catch (error) {
      console.log(error);
    }
  };
    // setInputs({
    //   score: "",
    //   income: "",
    //   lstatus: "",
    // });

    if (isFocused) {
      findFormData();
    }
  }, [inputs, props, isFocused]);

 

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
                onPress={() => navigation.navigate("LoanDetails")}
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
                Step 2 of 2
              </Text>
            </View>
          </View>
          <Text style={styles.welcometxt}>Loan Details</Text>
          <Text style={styles.instruction}>
            Please provide the required information for your request
          </Text>
          <View style={styles.innerview}>
            <View style={styles.innera}>
              <Text style={styles.label}>Loan Purpose</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  onValueChange={(text) =>
                    setInputs({ ...inputs, purpose: text })
                  }
                  items={[
                    {
                      label: "Major Purchases",
                      value: "major purchases",
                      key: 1,
                    },
                    { label: "School Fees", value: "school fees", key: 2 },
                    { label: "Investing", value: "investing", key: 3 },
                    {
                      label: "Renovations",
                      value: "renovations",
                      key: 4,
                    },
                    {
                      label: "Debt Consolidation",
                      value: "debt consolidation",
                      key: 5,
                    },
                    {
                      label: "Business Ventures",
                      value: "business ventures",
                      key: 6,
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.innera}>
              <Text style={styles.label}>Loan Amount</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  keyboardType="numeric"
                  value={inputs.amount}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, amount: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
              <Text style={styles.txtMinA}>Maximum amount that can be borrowed</Text>
              <Text style={styles.txtMaxAmnt}>$ 150,000</Text>
            </View>

            <View style={styles.innera}>
              <Text style={styles.label}>Loan Term</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  onValueChange={(text) =>
                    setInputs({ ...inputs, term: text })
                  }
                  items={[
                    { label: "1 Month", value: "1", key:1 },
                    { label: "2 Months", value: "2", key: 2 },
                    {
                      label: "3 Months",
                      value: "3",
                      key: 3,
                    },
                    {
                      label: "4 Months",
                      value: "4",
                      key: 4,
                    },
                    {
                      label: "5 Months",
                      value: "5",
                      key: 5,
                    },
                    {
                      label: "6 Months",
                      value: "6",
                      key: 6,
                    },
                    {
                      label: "7 Months",
                      value: "7",
                      key: 7,
                    },
                    {
                      label: "8 Months",
                      value: "8",
                      key: 8,
                    },
                    {
                      label: "9 Months",
                      value: "9",
                      key: 9,
                    },
                    {
                      label: "10 Months",
                      value: "10",
                      key: 10,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Desired Interest Rate</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  onValueChange={(text) =>
                    setInputs({ ...inputs, intrate: text })
                  }
                  items={[
                    { label: "5%", value: "5", key: 1 },
                    { label: "15%", value: "15", key: 1 },
                    { label: "25%", value: "25", key: 2},
                    {
                      label: "35%",
                      value: "35",
                      key: 3,
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
              onPress={() => handleSubmit()}
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
  },
  txtMinA: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "GeneralSansRegular",
  },
  txtMaxAmnt: {
    color: "#64748B",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
  },
});

export default LoanDetailsB;
