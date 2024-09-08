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
import COLORS from "../../constants/colors";
import APILink from "../../constants/globals";
import { useFonts } from "expo-font";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewPin = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [inputs, setInputs] = React.useState({
    newpassword: "",
    cnpassword: "",
  });

  const [newpasswordVisibility, setNewPasswordVisibility] = useState(true);
  const [cnpasswordVisibility, setCnPasswordVisibility] = useState(true);
  const [loading, setLoading] = React.useState(false);

  const changePinHandler = async () => {
    if (inputs.newpassword != inputs.cnpassword) {
      Alert.alert("Failed. Pin confirmation is incorrect.");
      return;
    }
    const asyncmail = await AsyncStorage.getItem("ResetEmail");
    const asyncpin = await AsyncStorage.getItem("EmailResetOTP");

    const obj = {
      email: asyncmail,
      token: asyncpin,
      new_password: inputs.newpassword,
    };
    console.log(obj);

    const apiLink = APILink.getLink();
    let res = await fetch(`${apiLink}/users/reset-password`, {
      method: "post",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseJson = await res.json();
    try {
      if (responseJson.status == "success") {
        setInputs({
          ...inputs,
          newpassword: "",
          cnpassword: ""
        });
        Alert.alert("Pin changed successfully");
        navigation.navigate("Signin");
        return;
      }
    } catch (e) {
      console.log(e);
    }
    try {
      if (responseJson.status == "failed") {
        Alert.alert(responseJson.message);
      }
    } catch (e) {
      console.log(e);
    }

  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/vectorbg.png")}
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
            onPress={() => navigation.navigate("Checkmail")}
            style={{ marginRight: 10, marginTop: 16, flexDirection: "row" }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../assets/arrow-left.png")}
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
        <Text style={styles.welcometxt}>Set New Password</Text>
        <Text style={styles.instruction}>
          Please provide a new password to proceed.
        </Text>
        <ScrollView style={styles.kycItemsView}>
          <View style={styles.innera}>
            <Text style={styles.label}>New Password</Text>
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
                maxLength={20}
                secureTextEntry={newpasswordVisibility}
                value={inputs.newpassword}
                style={styles.textinputEnabled}
                onChangeText={(pin) =>
                  setInputs({ ...inputs, newpassword: pin })
                }
              />
              <Text
                style={[styles.toggletext, { backgroundColor: COLORS.white }]}
                onPress={() => setNewPasswordVisibility(!newpasswordVisibility)}
              >
                {newpasswordVisibility ? "Show" : "Hide"}
              </Text>
            </View>
          </View>

          <View style={styles.innera}>
            <Text style={styles.label}>Confirm New Password</Text>
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
                maxLength={20}
                secureTextEntry={cnpasswordVisibility}
                value={inputs.cnpassword}
                onChangeText={(text) =>
                  setInputs({
                    ...inputs,
                    cnpassword: text,
                  })
                }
                style={styles.textinputEnabled}
              />
              <Text
                style={[styles.toggletext, { backgroundColor: COLORS.white }]}
                onPress={() => setCnPasswordVisibility(!cnpasswordVisibility)}
              >
                {cnpasswordVisibility ? "Show" : "Hide"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btndown}
            onPress={() => changePinHandler()}
          >
            <Text style={styles.btndowntext}>Change Password</Text>
            <Image
              style={{ width: 24, height: 24, marginLeft: 10 }}
              source={require("../../../assets/sendmsg.png")}
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

export default NewPin;
