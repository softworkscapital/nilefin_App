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
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../constants/colors";
import Loader from "../components/Loader";
import { SimpleLineIcons } from "react-native-vector-icons";
import APILink from "../../constants/globals";
import { useFonts } from "expo-font";
import AwesomeAlert from "react-native-awesome-alerts";

const OneOfThreeA = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

   // Password checking codes
   const [password, setPassword] = useState("");
   const [suggestions, setSuggestions] = useState([]);
   const [strength, setStrength] = useState("");
 
   const validatePassword = (input) => {
     let newSuggestions = [];
     if (input.length < 8) {
       newSuggestions.push("Password should be at least 8 characters long");
     }
     if (!/\d/.test(input)) {
       newSuggestions.push("Add at least one number");
     }
 
     if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
       newSuggestions.push("Include both upper and lower case letters");
     }
 
     if (!/[^A-Za-z0-9]/.test(input)) {
       newSuggestions.push("Include at least one special character");
     }
 
     setSuggestions(newSuggestions);
 
     // Determine password strength based on suggestions
     if (newSuggestions.length === 0) {
       setStrength("Very Strong");
     } else if (newSuggestions.length <= 1) {
       setStrength("Strong");
     } else if (newSuggestions.length <= 2) {
       setStrength("Moderate");
     } else if (newSuggestions.length <= 3) {
       setStrength("Weak");
     } else {
       setStrength("Too Weak");
     }
   };

  const [inputs, setInputs] = React.useState({
    clientId: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    starpassword: "",
    cnpassword: "",
    starcnpassword: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [cnpasswordVisibility, setCnPasswordVisibility] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  const addNextPswdChar = (text) => {
    if (text.length > inputs.password.length) {
      let res = text.charAt(text.length - 1);
      setInputs({
        ...inputs,
        password: inputs.password + "" + res,
        starpassword: inputs.starpassword + "*",
      });

      setPassword(inputs.password + "" + res);
      validatePassword(inputs.password + "" + res);
    }
  };
  const addNextCnpswdChar = (text) => {
    if (text.length > inputs.cnpassword.length) {
      let res = text.charAt(text.length - 1);
      setInputs({
        ...inputs,
        cnpassword: inputs.cnpassword + "" + res,
        starcnpassword: inputs.starcnpassword + "*",
      });
    }
  };
  const removeLastPswdChar = () => {
    setInputs({
      ...inputs,
      password: inputs.password.substring(0, inputs.password.length - 1),
      starpassword: inputs.starpassword.substring(
        0,
        inputs.starpassword.length - 1
      ),
    });
    setPassword(inputs.password.substring(0, inputs.password.length - 1));
    validatePassword(inputs.password.substring(0, inputs.password.length - 1));
  };

  const removeLastCnpswdChar = () => {
    setInputs({
      ...inputs,
      cnpassword: inputs.cnpassword.substring(0, inputs.cnpassword.length - 1),
      starcnpassword: inputs.starcnpassword.substring(
        0,
        inputs.starcnpassword.length - 1
      ),
    });
  };

  function isStringContainSpace(str) {
    //console.log(str.indexOf(' '));
    return str.indexOf(" ");
  }

  function containsOnlyDigits(str) {
    return /^\d+$/.test(str);
  }

  const validateEmail = (text) => {
    
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) == false) {
      return false;
    }
    else {
      return true;
    }
  }

  const handleSubmit = async () => {
    if (isStringContainSpace(inputs.fullName) == -1) {
      doAlert("Proceeding failed. Type in your full name", "Error Info");
      return;
    }

    if (containsOnlyDigits(inputs.phone) == false) {
      doAlert("Proceeding failed. Phone number must contain only numbers", "Error Info");
      return;
    }
    if (validateEmail(inputs.email) == false) {
      doAlert("Proceeding failed. Your email is not in correct format", "Error Info");
      return;
    }
    if (inputs.fullName == "") {
      doAlert(
        "Proceeding failed. Fill in the empty full name field",
        "Error Info"
      );
      return;
    }
    let regex = /^[a-zA-Z ]+$/;

    if (regex.test(inputs.fullName) == false) {
      doAlert(
        "Proceeding failed. Full name can not contain numbers","Error Info"
      );
      return;
    }
    
    if (inputs.phone == "") {
      doAlert("Proceeding failed. Fill in the empty phone field", "Error Info");

      return;
    }
    if (inputs.email == "") {
      doAlert("Proceeding failed. Fill in the empty email field", "Error Info");
      return;
    }
    if (inputs.password == "") {
      doAlert(
        "Proceeding failed. Fill in the empty password field",
        "Error Info"
      );
      return;
    }
    if (inputs.password !== inputs.cnpassword) {
      doAlert(
        "Proceeding failed. Password is not correctly confirmed",
        "Error Info"
      );
      return;
    }

    await AsyncStorage.setItem("CIDPin", inputs.password.toString());
    await AsyncStorage.setItem("PrevPage", "OneOfThreeA");
    navigation.navigate("TwoOfThreeA");
  };

  useEffect(() => {
    const apiLink = APILink.getLink();
    const fetchData = async () => {
      //setLoading(true);
      const asyncid = await AsyncStorage.getItem("CIDID");
      const asyncemail = await AsyncStorage.getItem("CIDEmail");
      const asyncname = await AsyncStorage.getItem("CIDName");
      const asyncphone = await AsyncStorage.getItem("CIDMobileNum");
      const asyncpin = await AsyncStorage.getItem("CIDPin");

      //setLoading(false);
      if (asyncpin === null) {
        setInputs({
          ...inputs,
          clientId: asyncid,
          fullName: asyncname,
          phone: asyncphone,
          email: asyncemail,
        });
      } else {
        let str = "";
        for (i = 1; i <= asyncpin.length; i++) {
          str += "*";
        }
        setInputs({
          ...inputs,
          clientId: asyncid,
          fullName: asyncname,
          phone: asyncphone,
          email: asyncemail,
          password: asyncpin,
          starpassword: str,
          starcnpassword: str,
          cnpassword: asyncpin,
        });
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <AwesomeAlert
        show={showAlert}
        contentContainerStyle={{ width: 307 }}
        showProgress={false}
        title={alerttitle}
        message={alerttext}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#1435AB"
        onCancelPressed={() => {
          doAlert("", "");
        }}
        onConfirmPressed={() => {
          doAlert("", "");
        }}
      />
      <Loader visible={loading} />
      <ImageBackground
        source={require("../../../assets/vectorbg.png")}
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
                onPress={() => navigation.navigate("ClientIDSignup")}
                style={{ marginRight: 10, marginTop: 5, flexDirection: "row" }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../../assets/arrow-left.png")}
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
                Step 1 of 3
              </Text>
            </View>
          </View>
          <Text style={styles.welcometxt}>Get Started 🎉</Text>
          <Text style={styles.instruction}>
            Please provide the required information to get started
          </Text>
          <View style={styles.innerview}>
            <View style={styles.innera}>
              <Text style={styles.labelfaint}>
                Full Name (Start with your name)
              </Text>
              <View style={styles.inputContainer}>
                <View style={styles.inneraview}>
                  <SimpleLineIcons
                    name="user"
                    size={25}
                    style={styles.innerviewsimg}
                  />
                </View>
                <TextInput
                  autoCorrect={false}
                  value={inputs.fullName}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, fullName: text })
                  }
                  style={styles.textinputDisabled}
                />
              </View>
            </View>

            <View style={styles.innera}>
              <Text style={styles.labelfaint}>Phone number</Text>
              <View style={styles.inputContainer}>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: "gray",
                    height: 40,
                    marginTop: 8,
                  }}
                >
                  <Text style={{ marginTop: 10, marginRight: 8 }}>+263</Text>
                </View>
                <TextInput
                  autoCorrect={false}
                  value={inputs.phone}
                  onChangeText={(text) => setInputs({ ...inputs, phone: text })}
                  style={[styles.textinputDisabled, { marginLeft: 8 }]}
                />
              </View>
            </View>

            <View style={styles.innera}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inneraview}>
                  <SimpleLineIcons
                    name="envelope"
                    size={25}
                    style={styles.innerviewsimg}
                  />
                </View>
                <TextInput
                  autoCorrect={false}
                  value={inputs.email}
                  onChangeText={(text) => setInputs({ ...inputs, email: text })}
                  style={styles.textinputDisabled}
                />
              </View>
            </View>

            <View style={styles.innera}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.inputContainer,
                  { backgroundColor: "COLORS.white" },
                ]}
              >
                <SimpleLineIcons
                  name="lock"
                  size={25}
                  style={styles.innerviewsimg}
                />
                <TextInput
                  autoCorrect={false}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      removeLastPswdChar();
                    }
                  }}
                  value={
                    passwordVisibility ? inputs.password : inputs.starpassword
                  }
                  onChangeText={(text) => addNextPswdChar(text)}
                  style={styles.textinputEnabled}
                />
                <Text
                  style={[styles.toggletext, { backgroundColor: COLORS.white }]}
                  onPress={() => setPasswordVisibility(!passwordVisibility)}
                >
                  {passwordVisibility ? "Hide" : "Show"}
                </Text>
              </View>
            </View>

            <View style={styles.innera}>
              <Text style={styles.label}>Confirm Password</Text>
              <View
                style={[
                  styles.inputContainer,
                  { backgroundColor: "COLORS.white" },
                ]}
              >
                <SimpleLineIcons
                  name="lock"
                  size={25}
                  style={styles.innerviewsimg}
                />
                <TextInput
                  autoCorrect={false}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      removeLastCnpswdChar();
                    }
                  }}
                  value={
                    cnpasswordVisibility
                      ? inputs.cnpassword
                      : inputs.starcnpassword
                  }
                  onChangeText={(text) => addNextCnpswdChar(text)}
                  style={styles.textinputEnabled}
                />
                <Text
                  style={[styles.toggletext, { backgroundColor: COLORS.white }]}
                  onPress={() => setCnPasswordVisibility(!cnpasswordVisibility)}
                >
                  {cnpasswordVisibility ? "Hide" : "Show"}
                </Text>
              </View>
            </View>
            {/* Pass Strength */}
            {/* <Text style={styles.strengthText}> 
                Password Strength: {strength} 
            </Text>  */}
            <Text style={styles.suggestionsText}>
              {suggestions.map((suggestion, index) => (
                <Text key={index}>
                  {suggestion}
                  {"\n"}
                </Text>
              ))}
            </Text>
            <View style={styles.strengthMeter}>
              <View
                style={{
                  width: `${
                    strength === "Very Strong"
                      ? 100
                      : strength === "Strong"
                      ? 75
                      : strength === "Moderate"
                      ? 50
                      : strength === "Weak"
                      ? 25
                      : 0
                  }%`,
                  height: 20,
                  backgroundColor:
                    strength === "Too Weak"
                      ? "#DE350B"
                      : strength === "Weak"
                      ? "#DE350B"
                      : strength === "Moderate"
                      ? "#FF991F"
                      : strength === "Strong"
                      ? "#57D9A3"
                      : "#00875A",
                }}
              ></View>
            </View>

            <TouchableOpacity
              onPress={() => handleSubmit()}
              activeOpacity={0.7}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Continue</Text>
              <Image
                style={{ width: 20, height: 18, marginLeft: 7 }}
                source={require("../../../assets/arrow-white.png")}
              />
              <Image
                style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
                source={require("../../../assets/arow-blue.png")}
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
    color: COLORS.egyptionblue,
    fontSize: 20,
    marginTop: 10,
    fontWeight: "700",
    fontFamily: "GeneralSansMedium",
  },
  instruction: {
    color: COLORS.coolgray,
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "400",
    fontFamily: "GeneralSansRegular",
  },
  innerview: {
    marginVertical: 20,
  },
  innera: {
    marginBottom: 20,
  },
  labelfaint: {
    marginVertical: 5,
    fontSize: 12,
    color: "#040B22",
    fontWeight: "500",
    fontFamily: "GeneralSansRegular",
  },
  label: {
    marginVertical: 5,
    fontSize: 12,
    color: COLORS.egyptionblue,
    fontWeight: "500",
    fontFamily: "GeneralSansRegular",
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  inneraview: {
    marginTop: 4,
  },
  innerviewsimg: {
    marginRight: 10,
    marginTop: 10,
  },
  textinputDisabled: {
    color: COLORS.egyptionblue,
    flex: 1,
  },
  textinputEnabled: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    flex: 1,
  },
  toggletext: {
    color: COLORS.egyptionblue,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "GeneralSansRegular",
    marginTop: 13,
  },
  btn: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.signed,
    marginTop: 40,
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
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
  },
  suggestionsText: {
    color: "red",
  },
  strengthMeter: {
    width: "100%",
    height: 6,
    backgroundColor: "#ccc",
    marginTop: 1,
    borderRadius: 3,
    overflow: "hidden",
  },
});

export default OneOfThreeA;
