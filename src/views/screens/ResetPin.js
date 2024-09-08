import React, { useState, useEffect, useCallback } from 'react';
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";
import COLORS from '../../constants/colors';
import Loader from '../components/Loader';
import { SimpleLineIcons } from 'react-native-vector-icons';
import APILink from "../../constants/globals";
import AwesomeAlert from "react-native-awesome-alerts";

const ResetPin = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });
  const [inputs, setInputs] = React.useState({
    email: ''
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
        password: inputs.password + '' + res,
        starpassword: inputs.starpassword + '*',
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
    if (inputs.email == '') {
      doAlert("Proceeding failed. Fill in the empty client id field", "Proceed Error");
      return;
    }
    const apiLink = APILink.getLink();
    let authresp = await fetch(`${apiLink}/users/forgot-password`, {
      method: "post",
      body: JSON.stringify({
        email: inputs.email
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await authresp.json();
    console.log(resJson);
    if (resJson.status == "success"){
      //Save In Async
      await AsyncStorage.setItem("ResetEmail", inputs.email);
      navigation.navigate('Checkmail');
    }else{
      Alert.alert("The provided email is invalid");
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
      <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "50%",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("ThreeOfThree")}
              style={{ marginRight: 10, marginTop: 5, flexDirection: "row" }}
            >
              <Image style={{ width: 20, height: 20 }} source={require("../../../assets/arrow-left.png")} />
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
          
        </View>
        <Text style={styles.welcometxt}>Let’s Reset that Password 🔓</Text>
        <Text style={styles.instruction}>
          Enter the email associated with this account. You will recieve
          password reset code.
        </Text>
        <View style={styles.innerview}>
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
                style={styles.textinput}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleSubmit()}
            activeOpacity={0.7}
            style={styles.btn}>
            <Text style={styles.btnText}>Reset Password</Text>
            <Image
              style={{ width: 20, height: 18, marginLeft: 7 }}
              source={require('../../../assets/arrow-white.png')}
            />
            <Image
              style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
              source={require('../../../assets/arow-blue.png')}
            />
          </TouchableOpacity>
          <Text style={styles.dnthave}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Signin')}
              style={styles.registertxt}>
              {' '}
              Login
            </Text>
          </Text>
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
    fontWeight: '600',
    fontFamily: 'GeneralSansMedium',
    marginTop: 10,
  },
  instruction: {
    color: COLORS.coolgray,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'GeneralSansRegular',
    marginVertical: 10,
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
    fontFamily: 'GeneralSansRegular',
    color: COLORS.egyptionblue,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
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
  btn: {
    height: 55,
    width: '100%',
    backgroundColor: COLORS.signed,
    marginTop: 160,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.login,
    flexDirection: 'row',
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'GeneralSansMedium',
  },
  dnthave: {
    color: COLORS.blk,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'GeneralSansRegular',
    textAlign: 'center',
  },
  registertxt: {
    color: COLORS.link,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'GeneralSansMedium',
  },
});

export default ResetPin;
