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
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "react-native-paper";
import COLORS from "../../constants/colors";
import Loader from "../components/Loader";
import { SimpleLineIcons } from "react-native-vector-icons";
import APILink from "../../constants/globals";
import { useFonts } from "expo-font";
import AwesomeAlert from "react-native-awesome-alerts";

const SignInCID = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
    starpassword: "",
  });

  const [showAlert, setShowAlert] = React.useState(false);
  const [showFailureAlert, setShowFailureAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");

  const doAlert = (errMsg) => {
    setAlertMsg(errMsg);
    setShowAlert(true);
    closeAlert();
  };

  const closeAlert = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };

  const closenowAlert = () => {
    setShowAlert(false);
  };

  const closeFailureAlert = () => {
    setShowFailureAlert(false);
  };

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const moveToHandler = () => {
    navigation.navigate("FacebookHandler");
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

  const signIn = async () => {
    if (inputs.email == "") {
      doAlert("Error. Fill in the empty email field");
      return;
    }
    if (inputs.password == "") {
      doAlert("Error. Fill in the empty password field");
      return;
    }

    const obj = {
      email: "flashup4all@gmail.com",
      password: "Ahe@d123",
    };

    const apiLink = APILink.getLink();
    let authresp = await fetch(`${apiLink}/login`, {
      method: "post",
      body: JSON.stringify({
        email: inputs.email,
        password: inputs.password,
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
      if (resJson.data.user.email === inputs.email) {
        
        AsyncStorage.multiSet([
          ["TOKEN", resJson.data.token],
          ["PIN", inputs.password],
          ["CIDID", resJson.data.user.client_id],
          ["ACCTYPE", resJson.data.user.account_type],
          ["USRTYPE", resJson.data.user.user_type],
          ["CIDEmail", resJson.data.user.email],
          [
            "CIDName",
            resJson.data.user.user_profile.first_name +
              " " +
              resJson.data.user.user_profile.last_name,
          ],
          ["CIDMobileNum", resJson.data.user.phone_number],
        ]);
        navigation.navigate("FirstTimeWelcome");
      }
    } catch (e) {
      setShowFailureAlert(true);
    }
  };

  const renderCustomAlertView = () => (
    <View style={{ width: "100%" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "10%" }}>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../../../assets/infored.png")}
          />
        </View>
        <View style={{ width: "90%" }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              fontFamily: "GeneralSansRegular",
              color: "#1B1A23",
              marginLeft: 5,
              marginTop: 5,
            }}
          >
            {alertMsg}
          </Text>
        </View>
      </View>
    </View>
  );

  const failureCustomAlertView = () => (
    <View style={{ width: "100%" }}>
      <View style={{ flexDirection: "row", width: '100%' }}>
        <View style={{ flexDirection: "row", width: '18%' }}>
          <Image
            style={styles.viewdimgs}
            source={require("../../../assets/modalicon.png")}
          />
        </View>
        <View style={{ flexDirection: "row", width: '82%' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              fontFamily: "GeneralSansMedium",
              marginTop: 25,
            }}
          >
            Invalid Login Credentials
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "400",
            fontFamily: "GeneralSansRegular",
            marginTop: 10,
            color: "#4C4A7B",
          }}
        >
          You are required to input the correct login information, Check and try
          again.
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setShowFailureAlert(false);
          }}
          style={styles.btnRetry}
        >
          <Text style={styles.txtRetry}>Retry To Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        customView={renderCustomAlertView()}
        showCancelButton={false}
        showConfirmButton={false}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#1435AB"
        onDismiss={() => closenowAlert()}
        alertContainerStyle={{
          backgroundColor: "rgba(218, 227, 242,0.7)",
          justifyContent: "flex-start",
        }}
        contentContainerStyle={{
          backgroundColor: "pink",
          borderWidth: 1,
          borderRadius: 12,
          borderColor: "red",
          width: 320,
          marginTop: 20,
          paddingVertical: 0,
        }}
      />
      <AwesomeAlert
        show={showFailureAlert}
        showProgress={false}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        customView={failureCustomAlertView()}
        showCancelButton={false}
        showConfirmButton={false}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#1435AB"
        onDismiss={() => closeFailureAlert()}
        alertContainerStyle={{
          backgroundColor: "rgba(218, 227, 242,0.7)",
          justifyContent: "center",
        }}
        contentContainerStyle={{
          backgroundColor: "white",
          borderRadius: 12,
          width: 320,
          marginTop: 20,
          paddingVertical: 0,
        }}
      />

      <Loader visible={loading} />
      <ImageBackground
        source={require("../../../assets/vectorbg.png")}
        resizeMode="cover"
      >
        <View>
          <ScrollView contentContainerStyle={styles.scroller}>
            <Text style={styles.welcometxt}>Welcome 🎉</Text>
            <Text style={styles.goodtxt}>Good to have you here!</Text>
            <Text style={styles.instruction}>
              Enter your login details to sign into your account securely.
            </Text>
            <View style={styles.innerview}>
              <View style={styles.innera}>
                <Text style={styles.label}>Email Address</Text>
                <View
                  style={{
                    height: 55,
                    backgroundColor: COLORS.light,
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                >
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
                    onChangeText={(text) =>
                      setInputs({ ...inputs, email: text })
                    }
                    style={styles.textinput}
                  />
                </View>
              </View>
              <View style={styles.innera}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={{
                    height: 55,
                    backgroundColor: COLORS.light,
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
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
                <TouchableOpacity
                  onPress={() => navigation.navigate("ResetPin")}
                  style={styles.forgotview}
                >
                  <Text style={styles.forgottext}>Forgot password</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  signIn();
                }}
                activeOpacity={0.7}
                style={styles.btnone}
              >
                <Text style={styles.btnonetext}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientIDSignup")}
                activeOpacity={0.7}
                style={{
                  height: 55,
                  width: "100%",
                  backgroundColor: "white",
                  marginVertical: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: COLORS.login,
                }}
              >
                <Text style={styles.btntwotext}>Get Access with Client ID</Text>
              </TouchableOpacity>
              <Text style={styles.dnthave}>
                Don't have an account?{" "}
                <Text
                  onPress={() => {
                    navigation.navigate("OneOfThreeB");
                  }}
                  style={styles.registertxt}
                >
                  {" "}
                  Register
                </Text>
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
                  <TouchableOpacity
                    onPress={() => navigation.navigate("FacebookHandler")}
                  >
                    <Image
                      style={styles.viewdimgs}
                      source={require("../../../assets/google.png")}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("FacebookHandler")}
                >
                  <Image
                    style={styles.viewdimgs}
                    source={require("../../../assets/Facebook.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
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
    color: "#6B778C",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
    fontFamily: "GeneralSansRegular",
  },
  goodtxt: {
    color: "#040B22",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    fontFamily: "GeneralSansMedium",
  },
  btnRetry: {
    backgroundColor: "#1435AB",
    width: 136,
    height: 48,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 20,
    marginBottom: 20,
  },
  txtRetry: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
  },
  instruction: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 10,
    fontFamily: "GeneralSansRegular",
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
    fontWeight: "500",
    color: "#040B22",
    fontFamily: "GeneralSansRegular",
  },
  inneraview: {
    marginTop: 4,
  },
  innerviewsimg: {
    marginRight: 10,
    marginTop: 10,
  },
  textinput: {
    color: "#040B22",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  toggletext: {
    color: "#112C8E",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 13,
    fontFamily: "GeneralSansRegular",
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
    color: "#1435AB",
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
    fontFamily: "GeneralSansRegular",
  },
  forgotview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "50%",
  },
  forgottext: {
    color: "#0891B2",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
    fontFamily: "GeneralSansMedium",
  },
  btnone: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.login,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  btnonetext: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 18,
    fontFamily: "GeneralSansMedium",
  },
  btntwotext: {
    color: "#1435AB",
    fontWeight: "500",
    fontSize: 18,
    fontFamily: "GeneralSansMedium",
  },
  dnthave: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "GeneralSansRegular",
  },
  registertxt: {
    color: "#0891B2",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
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
    fontFamily: "GeneralSansRegular",
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
  }
});

export default SignInCID;
