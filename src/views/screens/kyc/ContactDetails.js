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

const ContactDetails = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    ssn: "",
    tin: "",
    address: "",
    nok: "",
    nokrltn: "",
    nokcontact: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleSubmitSave = async () => {
    if (inputs.ssn == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty social security number field"
      );
      return;
    }
    if (inputs.tin == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty tax identification number field"
      );
      return;
    }
    if (inputs.address == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty residential address field"
      );
      return;
    }
    if (inputs.nok == "") {
      Alert.alert("Proceeding failed. Fill in the empty next of keen field");
      return;
    }
    if (inputs.nokrltn == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty next of keen relationship field"
      );
      return;
    }
    if (inputs.nokcontact == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty next of keen contact field"
      );
      return;
    }

    const obj = {
      social_security_no: inputs.ssn,
      residential_address: inputs.address,
      tax_id: inputs.tin,
      next_of_kin: {
        contact: inputs.nokcontact,
        name: inputs.nok,
        relationship: inputs.nokrltn,
      },
    };

    console.log(obj);
    const asynctoken = await AsyncStorage.getItem("TOKEN");
    const apiLink = APILink.getLink();
    let registerResponse = await fetch(`${apiLink}/kyc/users/identification`, {
      method: "patch",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${asynctoken}`,
      },
    });

    let responseJson = await registerResponse.json();
    console.log(responseJson);
    try {
      if (responseJson.data) {
        Alert.alert("Saving successfull");
        await AsyncStorage.setItem("IndContact", "Yes");
        navigation.navigate("CompleteProfile");
      }
    } catch (e) {
      console.log("Errors Occured");
    }
  };
  const handleSubmitContinue = async () => {
    if (inputs.ssn == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty social security number field"
      );
      return;
    }
    if (inputs.tin == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty tax identification number field"
      );
      return;
    }
    if (inputs.address == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty residential address field"
      );
      return;
    }
    if (inputs.nok == "") {
      Alert.alert("Proceeding failed. Fill in the empty next of keen field");
      return;
    }
    if (inputs.nokrltn == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty next of keen relationship field"
      );
      return;
    }
    if (inputs.nokcontact == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty next of keen contact field"
      );
      return;
    }

    const obj = {
      social_security_no: inputs.ssn,
      residential_address: inputs.address,
      tax_id: inputs.tin,
      next_of_kin: {
        contact: inputs.nokcontact,
        name: inputs.nok,
        relationship: inputs.nokrltn,
      },
    };

    console.log(obj);
    const asynctoken = await AsyncStorage.getItem("TOKEN");
    const apiLink = APILink.getLink();
    let registerResponse = await fetch(`${apiLink}/kyc/users/identification`, {
      method: "patch",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${asynctoken}`,
      },
    });

    let responseJson = await registerResponse.json();
    console.log(responseJson)
    try {
      if (responseJson.data) {
        Alert.alert("Saving successfull");
        await AsyncStorage.setItem("IndContact", "Yes");
        navigation.navigate("EmploymentDetails");
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
                onPress={() => navigation.navigate("PersonalDetails")}
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
          <Text style={styles.welcometxt}>
            Identification & Contact Information
          </Text>
          <Text style={styles.instruction}>
            We need your a way to identify you.
          </Text>
          <View style={styles.innerview}>
            <View style={styles.innera}>
              <Text style={styles.label}>Social Security Number</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.ssn}
                  onChangeText={(text) => setInputs({ ...inputs, ssn: text })}
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Tax Identification Number</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.tin}
                  onChangeText={(text) => setInputs({ ...inputs, tin: text })}
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Residential Address</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.address}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, address: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <Text style={styles.welcometxt}>Emergency Contact</Text>
            <View style={[styles.innera, { marginTop: 20 }]}>
              <Text style={styles.label}>Next of Kin Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.nok}
                  onChangeText={(text) => setInputs({ ...inputs, nok: text })}
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>
                Next of Kin Nature of Relationship
              </Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  
                  onValueChange={(text) =>
                    setInputs({ ...inputs, nokrltn: text })
                  }
                  items={[
                    { label: "Parent", value: "parent", key: "1" },
                    { label: "Grandparent", value: "grandparent", key: "2" },
                    { label: "Spouse", value: "spouse", key: "3" },
                    { label: "Aunt", value: "aunt", key: "4" },
                    { label: "Uncle", value: "uncle", key: "5" },
                    { label: "Sibling", value: "sibling", key: "6" },
                    { label: "Child", value: "child", key: "6" },
                    { label: "Niece", value: "niece", key: "7" },
                    { label: "Nephew", value: "nephew", key: "8" },
                    { label: "Cousin", value: "cousin", key: "9" },

                    { label: "Relative", value: "relative", key: "10" },
                    { label: "Friend", value: "friend", key: "11" },
                    { label: "Pastor", value: "pastor", key: "12" },
                  ]}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Next of Kin Contact Email</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.nokcontact}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, nokcontact: text })
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

export default ContactDetails;
