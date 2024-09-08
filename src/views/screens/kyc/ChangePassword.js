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
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePassword = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [inputs, setInputs] = useState({
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
  const [loading, setLoading] = useState(false);

  const changePinHandler = async () => {
    if (inputs.password === "") {
      Alert.alert("Failed. Old password is not there.");
      return;
    }
    if (inputs.password !== oldpin) {
      Alert.alert("Failed. Old password is not correct.");
      return;
    }
    if (inputs.newpassword !== inputs.cnpassword) {
      Alert.alert("Failed. Password confirmation is incorrect.");
      return;
    }
    
    const asynctoken = await AsyncStorage.getItem("TOKEN");
    const obj = {
      old_password: oldpin,
      new_password: inputs.newpassword,
    };

    const apiLink = APILink.getLink();
    let authresp = await fetch(`${apiLink}/settings/change-password`, {
      method: "PATCH",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${asynctoken}`
      },
    });

    let resJson = await authresp.json(); // Changed from text() to json()
    if (resJson.success) {
      Alert.alert("Password changed successfully");
    } else {
      Alert.alert("Password change failed. Try again");
    }
  };

  const handlePasswordChange = (field, text) => {
    setInputs(prev => ({
      ...prev,
      [field]: text,
      [`star${field}`]: "*".repeat(text.length), // Update star representation
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const asyncmail = await AsyncStorage.getItem("CIDEmail");
      const asyncpin = await AsyncStorage.getItem("PIN");
      setOldPin(asyncpin);
      setInputs(prev => ({
        ...prev,
        email: asyncmail
      }));
    };
    fetchData();
  }, []);

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
        <View style={{ flexDirection: "row", justifyContent: "flex-start", width: "50%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("KycSecurity")}
            style={{ marginRight: 10, marginTop: 16, flexDirection: "row" }}
          >
            <Image style={{ width: 20, height: 20 }} source={require("../../../../assets/arrow-left.png")} />
            <Text style={{ color: "#000000", fontSize: 16, marginLeft: 10, fontFamily: "GeneralSansRegular" }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.welcometxt}>Change Password</Text>
        <Text style={styles.instruction}>Please provide the required information to get started.</Text>
        <ScrollView style={styles.kycItemsView}>
          <View style={styles.innera}>
            <Text style={styles.label}>Old Password</Text>
            <View style={styles.inputContainer}>
              <SimpleLineIcons name="lock" size={25} style={styles.innerviewsimg} />
              <TextInput
                autoCorrect={false}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handlePasswordChange("password", inputs.password.slice(0, -1));
                  }
                }}
                value={passwordVisibility ? inputs.password : inputs.starpassword}
                onChangeText={(text) => handlePasswordChange("password", text)}
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
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputContainer}>
              <SimpleLineIcons name="lock" size={25} style={styles.innerviewsimg} />
              <TextInput
                autoCorrect={false}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handlePasswordChange("newpassword", inputs.newpassword.slice(0, -1));
                  }
                }}
                value={newpasswordVisibility ? inputs.newpassword : inputs.starnewpassword}
                onChangeText={(text) => handlePasswordChange("newpassword", text)}
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
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <SimpleLineIcons name="lock" size={25} style={styles.innerviewsimg} />
              <TextInput
                autoCorrect={false}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handlePasswordChange("cnpassword", inputs.cnpassword.slice(0, -1));
                  }
                }}
                value={cnpasswordVisibility ? inputs.cnpassword : inputs.starcnpassword}
                onChangeText={(text) => handlePasswordChange("cnpassword", text)}
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
            onPress={changePinHandler}
          >
            <Text style={styles.btndowntext}>Change Password</Text>
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

export default ChangePassword;