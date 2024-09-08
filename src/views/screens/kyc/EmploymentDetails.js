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
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "../../../constants/colors";
import Loader from "../../components/Loader";
import { SimpleLineIcons } from "react-native-vector-icons";
import APILink from "../../../constants/globals";
import RNPickerSelect from "react-native-picker-select";

const EmploymentDetails = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    jobtitle: "",
    emptype: "",
    empstrtdat: "",
    empnumber: "",
    incomedetails: "",
    bebtobl: "",
  });

  const [loading, setLoading] = React.useState(false);

  //Date
  const [completedDate, setCompletedDate] = useState(new Date());
  const [showCompleted, setShowCompleted] = useState(false);
  const [isHidden, setHidden] = useState(true);

  const onChange = (event, selectedDate) => {
    const completedDate = selectedDate || Date;
    const spltDat = completedDate.toString().split(" ");
    let mont = "";

    if (spltDat[1] == "Jan") {
      mont = "-01";
    } else if (spltDat[1] == "Feb") {
      mont = "-02";
    } else if (spltDat[1] == "Mar") {
      mont = "-03";
    } else if (spltDat[1] == "Apr") {
      mont = "-04";
    } else if (spltDat[1] == "May") {
      mont = "-05";
    } else if (spltDat[1] == "Jun") {
      mont = "-06";
    } else if (spltDat[1] == "Jul") {
      mont = "-07";
    } else if (spltDat[1] == "Aug") {
      mont = "-08";
    } else if (spltDat[1] == "Sep") {
      mont = "-09";
    } else if (spltDat[1] == "Oct") {
      mont = "-10";
    } else if (spltDat[1] == "Nov") {
      mont = "-11";
    } else if (spltDat[1] == "Dec") {
      mont = "-12";
    }
    let dat = spltDat[3]  + mont.toString()+ "-" + spltDat[2];
    //setShowCompleted(Platform.OS === "ios");
    setShowCompleted(!showCompleted);
    console.log("jgk"+mont);
    setInputs({ ...inputs, empstrtdat: dat });
    setCompletedDate(completedDate);
  };

  const showDatepicker = () => {
    setShowCompleted(!showCompleted);
  };

  //End Date

  const handleSubmitSave = async () => {
    if (inputs.jobtitle == "") {
      Alert.alert("Proceeding failed. Fill in the empty job title field");
      return;
    }
    if (inputs.emptype == "") {
      Alert.alert("Proceeding failed. Fill in the empty employee type field");
      return;
    }
    if (inputs.empstrtdat == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty employee start date field"
      );
      return;
    }
    if (inputs.empnumber == "") {
      Alert.alert("Proceeding failed. Fill in the empty employee number field");
      return;
    }
    if (inputs.incomedetails == "") {
      Alert.alert("Proceeding failed. Fill in the empty income details field");
      return;
    }
    if (inputs.bebtobl == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty debt obligations field"
      );
      return;
    }

    const obj = {
      debt_obligations: inputs.bebtobl,
      employee_no: inputs.empnumber,
      employment_start_date: inputs.empstrtdat,
      employment_type: inputs.emptype,
      income_details: inputs.incomedetails,
      job_title: inputs.jobtitle,
    };

    console.log(obj);
    const asynctoken = await AsyncStorage.getItem("TOKEN");
    const apiLink = APILink.getLink();
    let registerResponse = await fetch(
      `${apiLink}/kyc/users/employment-details`,
      {
        method: "patch",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      }
    );

    let responseJson = await registerResponse.json();
    try {
      if (responseJson.data) {
        Alert.alert("Saving successfull");
        await AsyncStorage.setItem("IndEmployment", "Yes");
        navigation.navigate("CompleteProfile");
      }
    } catch (e) {
      console.log("Errors Occured");
    }
  };

  const handleSubmitSaveContinue = async () => {
    if (inputs.jobtitle == "") {
      Alert.alert("Proceeding failed. Fill in the empty job title field");
      return;
    }
    if (inputs.emptype == "") {
      Alert.alert("Proceeding failed. Fill in the empty employee type field");
      return;
    }
    if (inputs.empstrtdat == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty employee start date field"
      );
      return;
    }
    if (inputs.empnumber == "") {
      Alert.alert("Proceeding failed. Fill in the empty employee number field");
      return;
    }
    if (inputs.incomedetails == "") {
      Alert.alert("Proceeding failed. Fill in the empty income details field");
      return;
    }
    if (inputs.bebtobl == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty debt obligations field"
      );
      return;
    }

    const obj = {
      debt_obligations: inputs.bebtobl,
      employee_no: inputs.empnumber,
      employment_start_date: inputs.empstrtdat,
      employment_type: inputs.emptype,
      income_details: inputs.incomedetails,
      job_title: inputs.jobtitle,
    };

    console.log(obj);
    const asynctoken = await AsyncStorage.getItem("TOKEN");
    const apiLink = APILink.getLink();
    let registerResponse = await fetch(
      `${apiLink}/kyc/users/employment-details`,
      {
        method: "patch",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      }
    );

    let responseJson = await registerResponse.json();
    try {
      if (responseJson.data) {
        Alert.alert("Saving successfull");
        await AsyncStorage.setItem("IndEmployment", "Yes");
        navigation.navigate("DocumentUpload");
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
                onPress={() => navigation.navigate("ContactDetails")}
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
                Step 3 of 4
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.welcometxt}>Employment Information</Text>
              <Text style={styles.instruction}>
                Give us more information about you
              </Text>
            </View>
            {isHidden ? (
              <View>
                {showCompleted && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    placeholder="Completed Date"
                    value={completedDate}
                    mode="date"
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            ) : null}
            <TouchableOpacity
              onPress={() => navigation.navigate("DocumentUpload")}
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "34%",
              }}
            >
              <Text
                style={{
                  color: "#FEFCE9",
                  fontSize: 14,
                  fontWeight: "500",
                  fontFamily: "GeneralSansRegular",
                  backgroundColor: "#E9B22B",
                  padding: 7,
                  borderRadius: 6,
                  marginTop: 15,
                  height: 35,
                }}
              >
                {`Skip       >>`}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FEFCE9",
              borderWidth: 1,
              borderColor: "#D4D4D8",
              padding: 7,
              borderRadius: 6,
              marginTop: 20,
              width: "100%",
              height: 80,
            }}
          >
            <View>
              <Image
                style={{ width: 28, height: 25 }}
                source={require("../../../../assets/securitybrown.png")}
              />
            </View>
            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "400",
                  fontFamily: "GeneralSansRegular",
                  marginLeft: 5,
                }}
              >
                If employed, please complete this form. It provides benefits for
                workers. If unemployed, skip to the next section.
              </Text>
            </View>
          </View>
          <View style={styles.innerview}>
            <View style={styles.innera}>
              <Text style={styles.label}>Job Title</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.jobtitle}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, jobtitle: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Employment Type</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  onValueChange={(text) =>
                    setInputs({ ...inputs, emptype: text })
                  }
                  items={[
                    { label: "Part time", value: "Part time", key: "1" },
                    { label: "Seasonal", value: "Seasonal", key: "2" },
                    { label: "Temporary", value: "Temporary", key: "3" },
                    {
                      label: "Independent contractor",
                      value: "Independent contractor",
                      key: "4",
                    },
                    { label: "Casual", value: "Casual", key: "5" },
                    { label: "Intern", value: "Intern", key: "6" },
                    {
                      label: "Leased employee",
                      value: "Leased employee",
                      key: "23",
                    },
                    {
                      label: "Apprenticeship",
                      value: "Apprenticeship",
                      key: "7",
                    },
                    { label: "Contract", value: "Contract", key: "8" },
                    { label: "Fixed-term", value: "Fixed-term", key: "9" },
                    { label: "Probation", value: "Probation", key: "10" },
                    { label: "Employee", value: "Employee", key: "11" },
                    {
                      label: "Employment on commission",
                      value: "Employment on commission",
                      key: "12",
                    },
                    {
                      label: "Self-employment",
                      value: "Self-employment",
                      key: "13",
                    },
                    { label: "At will", value: "At will", key: "14" },
                    { label: "Freelancer", value: "Freelancer", key: "15" },
                    { label: "Outworker", value: "Outworker", key: "16" },
                    {
                      label: "Agency worker",
                      value: "Agency worker",
                      key: "17",
                    },
                    { label: "Consultant", value: "Consultant", key: "18" },
                    {
                      label: "Contingency worker",
                      value: "Contingency worker",
                      key: "19",
                    },
                    { label: "Labour hire", value: "Labour hire", key: "20" },
                    { label: "Volunteering", value: "Volunteering", key: "21" },
                    {
                      label: "Different types of employment",
                      value: "Different types of employment",
                      key: "22",
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Employment Start Date</Text>
              <Pressable
                onPress={() => showDatepicker()}
                style={styles.inputContainer}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                  pointerEvents="none"
                >
                  <TextInput
                    autoCorrect={false}
                    value={inputs.empstrtdat}
                    style={styles.textinputEnabled}
                  />
                </View>
                <Image
                  style={{
                    width: 20,
                    height: 18,
                    marginRight: 10,
                    marginTop: 13,
                  }}
                  source={require("../../../../assets/calendar.png")}
                />
              </Pressable>
            </View>
            <View style={[styles.innera, { marginTop: 20 }]}>
              <Text style={styles.label}>Employment Number</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.empnumber}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, empnumber: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Income Details</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                
                  onValueChange={(text) =>
                    setInputs({ ...inputs, incomedetails: text })
                  }
                  items={[
                    { label: "Salary", value: "Salary", key: "1" },
                    {
                      label: "Business profits",
                      value: "Business profits",
                      key: "2",
                    },
                    {
                      label: "Tangible assets",
                      value: "Tangible assets",
                      key: "3",
                    },
                    {
                      label: "Intangible assets",
                      value: "Intangible assets",
                      key: "4",
                    },
                    {
                      label: "Capital gains",
                      value: "Capital gains",
                      key: "5",
                    },
                    { label: "Dividends", value: "Dividends", key: "6" },
                    { label: "Interest", value: "Interest", key: "9" },
                    { label: "Rent-seeking", value: "Rent-seeking", key: "7" },
                    { label: "Speculation", value: "Speculation", key: "8" },
                  ]}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Debt Obligations</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                
                  onValueChange={(text) =>
                    setInputs({ ...inputs, bebtobl: text })
                  }
                  items={[
                    {
                      label: "Bond Anticipation Notes",
                      value: "Bond Anticipation Notes",
                      key: "1",
                    },
                    {
                      label: "General Obligation Bonds",
                      value: "General Obligation Bonds",
                      key: "2",
                    },
                    {
                      label: "Urban Renewal Bonds",
                      value: "Urban Renewal Bonds",
                      key: "3",
                    },
                    { label: "Loans", value: "Loans", key: "4" },
                    {
                      label: "Capital Leases",
                      value: "Capital Leases",
                      key: "5",
                    },
                  ]}
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
                onPress={() => handleSubmitSaveContinue()}
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

export default EmploymentDetails;
