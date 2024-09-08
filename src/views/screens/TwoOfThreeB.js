import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../constants/colors";
import Loader from "../components/Loader";
import { useIsFocused } from "@react-navigation/native";
import { useFonts } from "expo-font";
import APILink from "../../constants/globals";

const TwoOfThreeB = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [loading, setLoading] = React.useState(false);
  const isFocused = useIsFocused();
  const [account, setAccount] = useState("");
  const [subaccount, setSubAccount] = useState("");

  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    user_type: "",
    account_type: "",
    password: "",
  });

  const moveToConditions = async () => {
    await AsyncStorage.setItem("TermsFrom", "TwoOfThreeB");
    navigation.navigate("TermsConditions");
  };

  const moveToTips = async () => {
    await AsyncStorage.setItem("TipsFrom", "TwoOfThreeB");
    navigation.navigate("TipsAdvice");
  };

  const registerUser = async () => {
    console.log(userData);
    //Register user
    const apiLink = APILink.getLink();
    let registerResponse = await fetch(`${apiLink}/register`, {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

   let responseJson = await registerResponse.json();
  console.log("Resp: " + JSON.stringify(responseJson));

    try {
      // Code that might throw an exception
      if (responseJson.data.account_type != "") {
      //if (responseJson.status == 201) {
        navigation.navigate("ThreeOfThree");
      }
      return;
    } catch (error) {
      // Code to handle the exception
      console.log(`An error occurred: ${error.message}`);
      //console.log(`Email error: ${error.message}`);

    }

    // try {
    //   // Code that might throw an exception
    //   if (responseJson.errors.password != "") {
    //     Alert.alert(
    //       "Password must at least one upper case character at least one lower case character"
    //     );
    //     return;
    //   }
    // } catch (error) {
    //   // Code to handle the exception
    //   console.log(`An error occurred: ${error.message}`);
    // }

    // try {
    //   // Code that might throw an exception
    //   if (responseJson.errors.last_name != "") {
    //     Alert.alert(
    //       "Enter your first name and last name separated by space."
    //     );
    //     return;
    //   }
    // } catch (error) {
    //   // Code to handle the exception
    //   console.log(`An error occurred: ${error.message}`);
    // }

    try {
      // Code that might throw an exception
      if (responseJson.errors.phone_number) {
        Alert.alert(responseJson.errors.phone_number[0]);
      }
      return;
    } catch (error) {
      // Code to handle the exception
      console.log(`An error occurredkk: ${error.message}`);
    }

    try {
      // Code that might throw an exception
      if (responseJson.errors.email) {
        Alert.alert(responseJson.errors.email[0]);
      }
      return;
    } catch (error) {
      // Code to handle the exception
      console.log(`An error occurred: ${error.message}`);
    }

    try {
      // Code that might throw an exception
      if (responseJson.errors.phone_number) {
        Alert.alert(responseJson.errors.phone_number[0]);
      }
      return;
    } catch (error) {
      // Code to handle the exception
      console.log(`An error occurred: ${error.message}`);
    }
    
  };

  useEffect(() => {
    setAccount("");
    setSubAccount("");
    setUserData({
      fullname: "",
      email: "",
      phone_number: "",
      user_type: "",
      account_type: "",
      password: "",
    });

    if (isFocused) {
      findSelectedAccount();
    }
  }, [props, isFocused]);

  const findSelectedAccount = async () => {
    try {
      const asyncname = await AsyncStorage.getItem("CIDName");
      const asyncemail = await AsyncStorage.getItem("CIDEmail");
      const asyncphone = await AsyncStorage.getItem("CIDMobileNum");
      const asyncpin = await AsyncStorage.getItem("CIDPin");
     
      let usrData = await AsyncStorage.getItem("SelectedAccount");

      if (usrData) {
        usrData = JSON.parse(usrData);
        setAccount(usrData.acc);
        setSubAccount(usrData.subacc);
        console.log("aaaaaaa",account);
        console.log(usrData.subacc);

        setUserData({
          fullname: asyncname,
          email: asyncemail,
          phone_number: asyncphone,
          user_type: account,
          account_type: subaccount,
          password: asyncpin,
        });
        console.log("user data found");
        console.log(userData.account_type);
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToPrevScreen = async () => {
    try {
      navigation.goBack();
    } catch (exception) {
      console.log(exception);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ImageBackground
        source={require("../../../assets/vectorbg.png")}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => goToPrevScreen()}
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
                Step 2 of 3
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: COLORS.egyptionblue,
              fontSize: 20,
              fontWeight: "600",
              fontFamily: "GeneralSansMedium",
              marginTop: 12,
            }}
          >
            Selected Account Type
          </Text>
          <Text
            style={{
              color: COLORS.coolgray,
              fontSize: 16,
              fontWeight: "400",
              fontFamily: "GeneralSansRegular",
              marginVertical: 10,
            }}
          >
            What kind of account are you creating? You can also have multiple
            accounts when you get in.
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: 15,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                height: 200,
                borderRadius: 7,
                backgroundColor: account === "borrower" ? "#155E75" : "#FFFFF",
                borderWidth: 1,
                borderColor: account === "borrower" ? "#ABAFBB" : "#EBECF0",
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#779ca1",
                    borderRadius: 63,
                    width: 63,
                    height: 63,
                    marginTop: 20,
                    marginLeft: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {account === "borrower" && (
                    <Image
                      style={{ width: 28, height: 25 }}
                      source={require("../../../assets/FolderBlack.png")}
                    />
                  )}
                  {account === "lender" && (
                    <Image
                      style={{ width: 28, height: 25 }}
                      source={require("../../../assets/FolderWhite.png")}
                    />
                  )}
                </View>
                {account === "borrower" && (
                  <View
                    style={{
                      backgroundColor:
                        subaccount === "coporate" ? "#FEEDD6" : "#DAFBFB",
                      width: "50%",
                      height: "30%",
                      marginRight: 10,
                      marginTop: -10,
                      borderRadius: 6,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          subaccount === "coporate" ? "#7B2D17" : "#164E63",
                        fontSize: 14,
                        fontWeight: "500",
                        fontFamily: "GeneralSansRegular",
                      }}
                    >
                      {subaccount}
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: account === "borrower" ? "#F3F4F6" : "#080813",
                    fontSize: 16,
                    fontWeight: "700",
                    fontFamily: "GeneralSansMedium",
                    marginTop: 12,
                  }}
                >
                  Borrower's Account
                </Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: account === "borrower" ? "#F3F4F6" : "#080813",
                    fontSize: 14,
                    fontWeight: "500",
                    fontFamily: "GeneralSansRegular",
                    marginVertical: 10,
                  }}
                >
                  With this account you can access & Apply for quick loans.
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                height: 200,
                margin: 10,
                borderRadius: 7,
                backgroundColor: account === "lender" ? "#155E75" : "#FFFFF",
                borderWidth: 1,
                borderColor: account === "lender" ? "#ABAFBB" : "#EBECF0",
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#779ca1",
                    borderRadius: 63,
                    width: 63,
                    height: 63,
                    marginTop: 20,
                    marginLeft: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {account === "lender" && (
                    <Image
                      style={{ width: 28, height: 25 }}
                      source={require("../../../assets/FolderBlack.png")}
                    />
                  )}
                  {account === "borrower" && (
                    <Image
                      style={{ width: 28, height: 25 }}
                      source={require("../../../assets/FolderWhite.png")}
                    />
                  )}
                </View>
                {account === "lender" && (
                  <View
                    style={{
                      backgroundColor:
                        subaccount === "coporate" ? "#FEEDD6" : "#DAFBFB",
                      width: "50%",
                      height: "30%",
                      marginRight: 10,
                      marginTop: -10,
                      borderRadius: 6,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          subaccount === "coporate" ? "#7B2D17" : "#164E63",
                        fontSize: 14,
                        fontWeight: "500",
                        fontFamily: "GeneralSansRegular",
                      }}
                    >
                      {subaccount}
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: account === "lender" ? "#F3F4F6" : "#080813",
                    fontSize: 16,
                    fontWeight: "700",
                    fontFamily: "GeneralSansMedium",
                    marginTop: 12,
                  }}
                >
                  Lenders's Account
                </Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: account === "lender" ? "#F3F4F6" : "#080813",
                    fontSize: 14,
                    fontWeight: "500",
                    fontFamily: "GeneralSansRegular",
                    marginVertical: 10,
                  }}
                >
                  Invest in high interest & secure loans and make good returns.
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "88%", marginLeft: "3%" }}>
            <Text
              style={{
                color: COLORS.othergray,
                fontSize: 14,
                fontWeight: "500",
                fontFamily: "GeneralSansRegular",
                marginVertical: 10,
                textAlign: "center",
              }}
            >
              By registering on Wisrod, you agree to our{" "}
              <Text
                onPress={() => moveToConditions()}
                style={{ color: COLORS.signed }}
              >
                Terms & Conditions{" "}
              </Text>
              and
              <Text style={{ color: COLORS.signed }}> Privacy Policy </Text>.
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => registerUser()}
              activeOpacity={0.7}
              style={{
                height: 55,
                width: "100%",
                backgroundColor: "#1435AB",
                marginVertical: 20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "500",
                  fontFamily: "GeneralSansMedium",
                }}
              >
                Register
              </Text>

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
          <TouchableOpacity
            onPress={() => moveToTips()}
            style={{
              flexDirection: "row",
              backgroundColor: COLORS.cyanlight,
              padding: 7,
              borderRadius: 6,
              marginLeft: "15%",
              marginTop: 6,
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ marginLeft: 5 }}>
              <Image
                style={{ width: 28, height: 25 }}
                source={require("../../../assets/security-ques.png")}
              />
            </View>
            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: "400",
                  fontFamily: "GeneralSansRegular",
                  marginLeft: 10,
                }}
              >
                Need help? Learn more
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TwoOfThreeB;
