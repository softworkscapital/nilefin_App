import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SimpleLineIcons } from "react-native-vector-icons";
import COLORS from "../../../constants/colors";
import APILink from "../../../constants/globals";
import { useFonts } from "expo-font";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResetTransPin = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [inputs, setInputs] = React.useState({
    clientId: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    starpassword: "",
    newpassword: "",
    starnewpassword: "",
    cnpassword: "",
    starcnpassword: "",
  });

  const [oldpin, setOldPin] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [newpasswordVisibility, setNewPasswordVisibility] = useState(false);
  const [cnpasswordVisibility, setCnPasswordVisibility] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const changePinHandler = async () => {
    if (inputs.password == "") {
      Alert.alert("Failed. Old pin is not there.");
      return;
    }

    if (inputs.newpassword != inputs.cnpassword) {
      Alert.alert("Failed. Pin confirmation is incorrect.");
      return;
    }

    const asynctoken = await AsyncStorage.getItem("TOKEN");

    const obj = {
      old_transaction_pin: inputs.password,
      transaction_pin: inputs.newpassword,
    };
    //console.log(obj)

    const apiLink = APILink.getLink();
    let authresp = await fetch(`${apiLink}/settings/change-transaction-pin`, {
      method: "patch",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${asynctoken}`,
      },
    });

    let resJson = await authresp.json();
    console.log(resJson);
    if (resJson.message == "Transaction pin updated successfully") {
      setInputs({
        ...inputs,
        password: "",
        starpassword: "",
        newpassword: "",
        starnewpassword: "",
        cnpassword: "",
        starcnpassword: "",
      });
      Alert.alert("Pin changed successfully");
    } else if (resJson.message == "invalid old transaction pin") {
      Alert.alert("Pin change failed. Invalid old pin");
    } else {
      Alert.alert("Pin change failed. Try again");
    }
  };

  const addNextPswdChar = (text) => {
    if (text.length > inputs.password.length) {
      let res = text.charAt(text.length - 1);
      setInputs({
        ...inputs,
        password: inputs.password + "" + res,
        starpassword: inputs.starpassword + "*",
      });
    }
  };
  const addNewPswdChar = (text) => {
    if (text.length > inputs.newpassword.length) {
      let res = text.charAt(text.length - 1);
      setInputs({
        ...inputs,
        newpassword: inputs.newpassword + "" + res,
        starnewpassword: inputs.starnewpassword + "*",
      });
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
  };
  const removeLastNewPswdChar = () => {
    setInputs({
      ...inputs,
      newpassword: inputs.newpassword.substring(
        0,
        inputs.newpassword.length - 1
      ),
      starnewpassword: inputs.starnewpassword.substring(
        0,
        inputs.starnewpassword.length - 1
      ),
    });
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

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const asyncmail = await AsyncStorage.getItem("CIDEmail");
  //       const asyncpin = await AsyncStorage.getItem("PIN");
  //       setOldPin(asyncpin);
  //       setInputs({
  //         ...inputs,
  //         email: asyncmail,
  //       });
  //     };
  //     fetchData();
  //   }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/vectorbg.png")}
        resizeMode="cover"
        style={styles.imageBackGr}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "50%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("KycSecurity")}
            style={{ marginRight: 10, marginTop: 16, flexDirection: "row" }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../../assets/arrow-left.png")}
            />
            <Text
              style={{
                color: "#000000",
                fontSize: 16,
                marginLeft: 10,
                fontFamily: "GeneralSansRegular",
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.welcometxt}>Transection Pin Change</Text>
        <Text style={styles.instruction}>
          Please provide the required information to get started.
        </Text>
        <ScrollView style={styles.kycItemsView}>
          <View style={styles.innera}>
            <Text style={styles.label}>Old Transection Pin</Text>
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
                keyboardType="numeric"
                maxLength={6}
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
            <Text style={styles.label}>New Pin</Text>
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
                keyboardType="numeric"
                maxLength={6}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    removeLastNewPswdChar();
                  }
                }}
                value={
                  newpasswordVisibility
                    ? inputs.newpassword
                    : inputs.starnewpassword
                }
                onChangeText={(text) => addNewPswdChar(text)}
                style={styles.textinputEnabled}
              />
              <Text
                style={[styles.toggletext, { backgroundColor: COLORS.white }]}
                onPress={() => setNewPasswordVisibility(!newpasswordVisibility)}
              >
                {newpasswordVisibility ? "Hide" : "Show"}
              </Text>
            </View>
          </View>

          <View style={styles.innera}>
            <Text style={styles.label}>Confirm Pin</Text>
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
                keyboardType="numeric"
                maxLength={6}
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
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btndown}
            onPress={() => changePinHandler()}
          >
            <Text style={styles.btndowntext}>Change Pin</Text>
            <Image
              style={{ width: 24, height: 24, marginLeft: 10 }}
              source={require("../../../../assets/sendmsg.png")}
            />
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackGr: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  welcometxt: {
    color: "#040B22",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    fontFamily: "GeneralSansMedium",
  },
  instruction: {
    color: "#040B22",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 10,
    fontFamily: "GeneralSansRegular",
  },
  kycItemsView: {
    flex: 8,
    marginTop: 20,
  },
  innera: {
    marginBottom: 20,
  },
  innerviewsimg: {
    marginRight: 10,
    marginTop: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.egyptionblue,
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
  textinputEnabled: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    flex: 1,
    height: "93%",
  },
  toggletext: {
    color: COLORS.egyptionblue,
    fontSize: 16,
    marginTop: 13,
    fontFamily: "GeneralSansRegular",
  },
  btndown: {
    height: 55,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#1435AB",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 30,
  },
  btndowntext: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 18,
    fontFamily: "GeneralSansMedium",
  },
});

export default ResetTransPin;
