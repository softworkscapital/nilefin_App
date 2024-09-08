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
  Alert
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "react-native-paper";
import COLORS from "../../constants/colors";
import Loader from "../components/Loader";
import { SimpleLineIcons } from "react-native-vector-icons";
import APILink from "../../constants/globals";
import { useFonts } from 'expo-font';
import AwesomeAlert from "react-native-awesome-alerts";

const ClientIDSignup = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'GeneralSansMedium': require('../../../assets/font/GeneralSans-Medium.otf'),
    'GeneralSansRegular': require('../../../assets/font/GeneralSans-Regular.otf'),
    'SFProTextRegular': require('../../../assets/font/SF-Pro-Text-Regular.otf')
  });

  const [inputs, setInputs] = React.useState({
    clientid: "",
    password: "",
    starpassword: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const [showAlert, setShowAlert] = React.useState(false);
  const [alerttext, setAlerttext] = React.useState("");
  const [alerttitle, setAlerttitle] = React.useState("");

  const doAlert = (txt, ttl) => {
    setShowAlert(!showAlert);
    setAlerttext(txt);
    setAlerttitle(ttl);
  };

  const addNextChar = (text) => {
    if (text.length > inputs.password.length) {
      let res = text.charAt(text.length - 1);
      setInputs({
        ...inputs,
        password: inputs.password + "" + res,
        starpassword: inputs.starpassword + "*",
      });
    }
  };
  const removeLastChar = () => {
    setInputs({
      ...inputs,
      password: inputs.password.substring(0, inputs.password.length - 1),
      starpassword: inputs.starpassword.substring(
        0,
        inputs.starpassword.length - 1
      ),
    });
  };

const handleSubmit = async () => {
    if (inputs.clientid == "") {
      doAlert("Proceeding failed. Fill in the empty client id field", "Error Info");
      return;
    }
    if (inputs.password == "") {
      doAlert("Proceeding failed. Fill in the empty pasword field", "Error Info");
      return;
    }

    const obj = {
      clientid: "flashup4all@gmail.com",
      password: "Ahe@d123",
    };

    const apiLink = APILink.getLink();
    let authresp = await fetch(`${apiLink}/login`, {
      method: "post",
      body: JSON.stringify({
        client_id: inputs.clientid,
        password: inputs.password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await authresp.json();
    console.log(resJson);
    // if (resJson.error_code !== undefined) {
    //   if (resJson.error_code === "NOT_FOUND") {
    //doAlert("No account exist with this client id", "Error Info");
    //   }
    // }
    // if (resJson.errors.email !== undefined) {
    //   if (resJson.errors.email === "email/password do not match") {
    //doAlert("No account exist with this client id", "Error Info");
    //   }
    // }

    try {
      if (resJson.message == "Account not verified") {
        Alert.alert("Login failed. Account not verified");
        return;
      }
    } catch (e) {
      console.log("hhh" + e);
    }

    try {
      if (resJson.data.user.client_id === inputs.clientid) {
        let personalDone = "No";
        let identificationDone = "No";
        let employmentDone = "No";
        let docuploadDone = "No";
        let donePercent = 20;
        //Check completion leveles
        if (resJson.data.user.account_type == "individual") {
          if (resJson.data.user.user_profile.dob != null) {
            //Two is completed
            personalDone = "Yes";
            donePercent = parseFloat(donePercent) + 20;
          }
          if (resJson.data.user.user_profile.social_security_no != null) {
            //Three is completed
            identificationDone = "Yes";
            donePercent = parseFloat(donePercent) + 20;
          }
          //if (resJson.data.user.user_profile.employment_details != {}) {
          if (
            resJson.data.user.user_profile.employment_details &&
            !Object.keys(resJson.data.user.user_profile.employment_details)
          ) {
            //Four is completed
            employmentDone = "Yes";
            donePercent = parseFloat(donePercent) + 20;
          }
          //Get uploaded docs
          const apiLink = APILink.getLink();
          let registerResponse = await fetch(`${apiLink}/kyc/users/documents`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resJson.data.token}`,
            },
          });

          let responseJson = await registerResponse.json();

          if (responseJson.data.length == 5) {
            //Three is completed
            docuploadDone = "Yes";
            donePercent = parseFloat(donePercent) + 20;
          }

          console.log("personalDone : " + personalDone);
          console.log("identificationDone: " + identificationDone);
          console.log("employmentDone: " + employmentDone);
          console.log("Docs Length: " + responseJson.data.length);
          //Save In Async
          await AsyncStorage.setItem("IndPersonal", personalDone);
          await AsyncStorage.setItem("IndContact", identificationDone);
          await AsyncStorage.setItem("IndEmployment", employmentDone);
          await AsyncStorage.setItem("IndDocument", docuploadDone);
          await AsyncStorage.setItem("IndPerc", donePercent.toString());
        } else {
          if (
            resJson.data.user.user_profile.residential_address != "" ||
            resJson.data.user.user_profile.residential_address != null
          ) {
            //Two is completed
            personalDone = "Yes";
            donePercent = parseFloat(donePercent) + 20;
          }
          // if (resJson.data.user.user_profile.social_security_no != null) {
          //   //Three is completed
          //   identificationDone = "Yes";
          //   donePercent = parseFloat(donePercent) + 20;
          // }
          // //if (resJson.data.user.user_profile.employment_details != {}) {
          // if (
          //   resJson.data.user.user_profile.employment_details &&
          //   !Object.keys(resJson.data.user.user_profile.employment_details)
          // ) {
          //   //Four is completed
          //   employmentDone = "Yes";
          //   donePercent = parseFloat(donePercent) + 20;
          // }
          //Get uploaded docs
          const apiLink = APILink.getLink();
          let registerResponse = await fetch(`${apiLink}/kyc/users/documents`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resJson.data.token}`,
            },
          });

          let responseJson = await registerResponse.json();

          if (responseJson.data.length == 7) {
            //Three is completed
            docuploadDone = "Yes";
            donePercent = parseFloat(donePercent) + 20;
          }

          console.log("CoporationDone : " + personalDone);
          console.log("FinancialsDone: " + identificationDone);
          console.log("DirectorshipDone: " + employmentDone);
          console.log("Docs Length: " + responseJson.data.length);
          //Save In Async
          await AsyncStorage.setItem("CopPersonal", personalDone);
          await AsyncStorage.setItem("CopContact", identificationDone);
          await AsyncStorage.setItem("CopEmployment", employmentDone);
          await AsyncStorage.setItem("CopDocument", docuploadDone);
          await AsyncStorage.setItem("CopPerc", donePercent.toString());
        }

        var imgPath = resJson.data.user.user_profile.avatar;
        if (imgPath == null) {
          imgPath = "NotSet";
        }
        
        AsyncStorage.multiSet([
          ["TOKEN", resJson.data.token],
          ["PIN", inputs.password],
          ["CIDID", resJson.data.user.client_id],
          ["USRIMG", imgPath],
          ["ACCTYPE", resJson.data.user.account_type],
          ["USRTYPE", resJson.data.user.user_type],
          ["USRBALANCE", resJson.data.user.wallet.available_balance],
          ["CIDEmail", resJson.data.user.email],
          [
            "CIDName",
            resJson.data.user.user_profile.first_name +
              " " +
              resJson.data.user.user_profile.last_name,
          ],
          ["CIDMobileNum", resJson.data.user.phone_number],
          [
            "CPINSET",
            resJson.data.user.is_transaction_pin_set ? "Set" : "NotSet",
          ],
        ]);
        navigation.navigate("FirstTimeWelcome");
      }
    } catch (e) {
      console.log(e);
      setShowFailureAlert(true);
    }
  };

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "50%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Signin')}
            style={{ marginRight: 10, marginTop: 5, flexDirection:'row' }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../assets/arrow-left.png')} />
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              marginLeft: 10,
              fontFamily: 'GeneralSansRegular'
            }}>
            Back
          </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.welcometxtsml}>Welcome 🎉</Text>
        <Text style={styles.welcometxt}>Good to have you here!</Text>
        <Text style={styles.instruction}>
          Provide your Client ID default PIN that was sent to you to get you
          started here
        </Text>
        <View style={styles.innerview}>
          <View style={styles.innera}>
            <Text style={styles.label}>Client ID</Text>
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
                value={inputs.clientid}
                onChangeText={(text) =>
                  setInputs({ ...inputs, clientid: text })
                }
                style={styles.textinput}
              />
            </View>
          </View>
          <View style={styles.innera}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <SimpleLineIcons
                name="lock"
                size={25}
                style={styles.innerviewsimg}
              />
              <TextInput
                autoCorrect={false}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    removeLastChar();
                  }
                }}
                value={
                  passwordVisibility ? inputs.password : inputs.starpassword
                }
                onChangeText={(text) => addNextChar(text)}
                style={styles.textinput}
              />
              <Text
                style={styles.toggletext}
                onPress={() => setPasswordVisibility(!passwordVisibility)}
              >
                {passwordVisibility ? "Hide" : "Show"}
              </Text>
            </View>
          </View>

          <View style={styles.innerb}>
            <View style={styles.innerba}>
              <View style={styles.innerbaone}>
                <Checkbox
                  color={COLORS.login}
                  uncheckedColor={COLORS.login}
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <Text style={styles.keepme}>Keep me signed in</Text>
            </View>
            <View style={styles.forgotview}>
              <Text style={styles.forgottext}>Forgot Client ID</Text>
            </View>
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
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.dnthave}
          >
            Already have an account?{" "}
            <Text style={styles.registertxt}> Login</Text>
          </Text>
          <View style={styles.viewc}>
            <View style={styles.lines} />
            <View>
              <Text style={styles.linesor}>Or</Text>
            </View>
            <View style={styles.lines} />
          </View>
          <View style={styles.viewd}>
            <View>
              <Image
                style={styles.viewdimgs}
                source={require("../../../assets/google.png")}
              />
            </View>
            <View>
              <Image
                style={styles.viewdimgs}
                source={require("../../../assets/Facebook.png")}
              />
            </View>
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
  welcometxtsml: {
    color: COLORS.egyptionblue,
    fontSize: 20,
    fontWeight: '400',
    marginTop: 10,
    fontFamily: 'GeneralSansRegular'
  },
  welcometxt: {
    color: COLORS.egyptionblue,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    fontFamily: 'GeneralSansMedium'
  },
  instruction: {
    color: COLORS.coolgray,
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 10,
    fontFamily: 'GeneralSansRegular'
  },
  innerview: {
    marginVertical: 20,
  },
  innera: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.egyptionblue,
    fontFamily: 'GeneralSansRegular'
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
  textinput: {
    color: COLORS.egyptionblue,
    flex: 1,
  },
  toggletext: {
    color: COLORS.egyptionblue,
    fontSize: 16,
    marginTop: 13,
    fontWeight: '500',
    fontFamily: 'GeneralSansRegular'
  },
  innerb: {
    flexDirection: "row",
  },
  innerba: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "50%",
  },
  innerbaone: {
    marginTop: 4,
  },
  keepme: {
    color: COLORS.signed,
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '500',
    fontFamily: 'GeneralSansRegular'
  },
  forgotview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "50%",
  },
  forgottext: {
    color: COLORS.link,
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
    fontFamily: 'GeneralSansMedium'
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
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'GeneralSansMedium'
  },
  dnthave: {
    color: COLORS.blk,
    textAlign: "center",
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'GeneralSansRegular'
  },
  registertxt: {
    color: COLORS.link,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'GeneralSansMedium'
  },
  viewc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "87%",
    marginTop: 15,
    marginLeft: "6%",
  },
  lines: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.orlines,
  },
  linesor: {
    width: 50,
    textAlign: "center",
    color: COLORS.ortext,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'GeneralSansRegular'
  },
  viewd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 15,
    marginLeft: "2%",
  },
  viewdimgs: {
    marginRight: 30,
    marginTop: 16,
    width: 40,
    height: 40,
  },
});

export default ClientIDSignup;
