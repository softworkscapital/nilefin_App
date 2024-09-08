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
  Modal,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../constants/colors";
import Loader from "../components/Loader";
import {
  SimpleLineIcons,
  MaterialIcons,
  AntDesign,
} from "react-native-vector-icons";
import APILink from "../../constants/globals";
import { useFonts } from "expo-font";
import AwesomeAlert from "react-native-awesome-alerts";

const OneOfThreeB = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  // Password checking codes
  const [password, setPassword] = useState("");
  const [searchkey, setSearchkey] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [codes, setCodes] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [strength, setStrength] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+263");

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

  const Item = ({ name, dial_code }) => (
    <TouchableOpacity
      onPress={() => changeState(dial_code)}
      style={{
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
      }}
    >
      <View style={{ width: "80%" }}>
        <Text style={styles.label}>{name} </Text>
      </View>
      <View style={{ width: "20%" }}>
        <Text style={styles.label}>{dial_code} </Text>
      </View>
    </TouchableOpacity>
  );

  const changeState = (cde) => {
    setCountryCode(cde);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <Item name={item.name} dial_code={item.dial_code} code={item.code} />
  );

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

  function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    // if (checkPassword(inputs.password) == false) {
    //   doAlert(
    //     'Password need lowercase, uppercase, symbols, numbers and a minimum of 8 characters.',
    //     'Submission Error'
    //   );
    //   return;
    // }
    return re.test(str);
  }

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
        "Proceeding failed. Fill in the empty client name field",
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

    
    await AsyncStorage.setItem("CIDID", "0");
    await AsyncStorage.setItem("CIDEmail", inputs.email);
    await AsyncStorage.setItem("CIDName", inputs.fullName);

    var s = inputs.phone;
    while(s.charAt(0) === '0')
    {
    s = s.substring(1);
    }

    // if(inputs.phone.indexOf('0') == 0) {
    // }else{
    // }
    await AsyncStorage.setItem("CIDMobileNum", countryCode + s);
    await AsyncStorage.setItem("CIDMobileCode", countryCode);
    await AsyncStorage.setItem("CIDPin", inputs.password);
    await AsyncStorage.setItem("PrevPage", "OneOfThreeB");
    navigation.navigate("TwoOfThreeA");
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

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        "https://countriesnow.space/api/v0.1/countries/codes"
      );
      const data = await resp.json();
      setCodes(data.data);
      setFilteredUsers(data.data);
    };
    fetchData();
  }, []);

  const handleFilter = (txt) => {
    const filtered = codes.filter((onecode) => onecode.name.includes(txt));
    setFilteredUsers(filtered);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignItems: "center" }}>
              <View
                style={[styles.innera, { width: "95%", alignItems: "center" }]}
              >
                <Text style={styles.label}>type to search...</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inneraview}>
                    <AntDesign
                      name="search1"
                      size={25}
                      style={styles.innerviewsimg}
                    />
                  </View>
                  <TextInput
                    autoCorrect={false}
                    value={searchkey}
                    onChangeText={(text) => {
                      setSearchkey(text);
                      handleFilter(text);
                    }}
                    style={styles.textinputDisabled}
                  />
                </View>
              </View>
            </View>
            <View style={{ height: 250 }}>
              {codes && (
                <FlatList
                  data={filteredUsers}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.code}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    
      <Loader visible={loading} />
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
              onPress={() => navigation.navigate("Splash")}
              style={{ marginRight: 10, marginTop: 16 }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../../assets/arrow-left.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: "#000000",
                fontSize: 18,
                fontFamily: "GeneralSansRegular",
                fontWeight: "500",
                marginTop: 15,
              }}
            >
              Back
            </Text>
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
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: "500",
                fontFamily: "GeneralSansRegular",
                backgroundColor: COLORS.cyan,
                padding: 7,
                borderRadius: 6,
                marginTop: 6,
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
            <Text style={styles.label}>Full Name (Start with your name)</Text>
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
            <Text style={styles.label}>Phone number</Text>
            <View style={[styles.inputContainer, { paddingLeft: 7 }]}>
              <TouchableOpacity
                style={{
                  borderRightWidth: 1,
                  borderRightColor: "gray",
                  height: 40,
                  marginTop: 8,
                  flexDirection: "row",
                }}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    fontFamily: "GeneralSansRegular",
                  }}
                >
                  {countryCode}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={20}
                  style={{
                    marginTop: 7,
                  }}
                />
              </TouchableOpacity>
              <TextInput
                autoCorrect={false}
                value={inputs.phone}
                keyboardType="numeric"
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
                    removeLastPswdChar();
                  }
                }}
                value={
                  passwordVisibility ? inputs.password : inputs.starpassword
                }
                onChangeText={(text) => {
                  addNextPswdChar(text);
                }}
                style={styles.textinputEnabled}
              />
              <Text
                style={styles.toggletext}
                onPress={() => setPasswordVisibility(!passwordVisibility)}
              >
                {passwordVisibility ? "Hide" : "Show"}
              </Text>
            </View>
          </View>

          <View style={styles.innera}>
            <Text style={styles.label}>Confirm Password</Text>
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
                style={styles.toggletext}
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
          <Text style={styles.dnthave}>
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Signin")}
              style={styles.registertxt}
            >
              {" "}
              Login
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#dcdcdc",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scroller: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  welcometxt: {
    color: "#040B22",
    fontSize: 20,
    fontFamily: "GeneralSansMedium",
    fontWeight: "600",
    marginTop: 10,
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
    fontFamily: "GeneralSansRegular",
    fontWeight: "500",
    color: "#040B22",
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
    fontSize: 16,
    fontWeight: "600",
    color: "#040B22",
    flex: 1,
  },
  textinputEnabled: {
    fontSize: 16,
    fontWeight: "600",
    color: "#040B22",
    flex: 1,
  },
  toggletext: {
    color: "#112C8E",
    fontWeight: "600",
    fontFamily: "GeneralSansRegular",
    fontSize: 16,
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
    fontWeight: "500",
    fontSize: 18,
    fontFamily: "GeneralSansRegular",
  },
  dnthave: {
    color: "#0D0D20",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "GeneralSansRegular",
  },
  registertxt: {
    color: "#0891B2",
    fontWeight: "600",
    fontSize: 16,
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
    marginTop: 16,
    marginRight: 30,
    width: 40,
    height: 40,
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

export default OneOfThreeB;
