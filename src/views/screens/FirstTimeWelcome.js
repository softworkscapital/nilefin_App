import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../constants/colors";
import Loader from "../components/Loader";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const FirstTimeWelcome = ({ navigation }) => {
  const [completed, setCompleted] = React.useState(1);
  const [compPercentage, setCompPercentage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const isFocused = useIsFocused();
  const [userdata, setUserData] = React.useState({
    userid: "",
    email: "",
    fullname: "",
    acntype: "",
    usertype: "",
    userimg: "",
    userbal: "",
  });

  const goToPrevScreen = async () => {
    try {
      navigation.navigate("TwoOfThreeB");
    } catch (exception) {
      console.log(exception);
    }
  };

  const completeProfile = async () => {
    const accountType = await AsyncStorage.getItem("ACCTYPE");

    if (accountType == "individual") {
      navigation.navigate("CompleteProfile");
    } else {
      navigation.navigate("CopCompleteProfile");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchProducts = async () => {
        setCompleted(1);
        const userID = await AsyncStorage.getItem("CIDID");
        const userEmail = await AsyncStorage.getItem("CIDEmail");
        const userName = await AsyncStorage.getItem("CIDName");

        const acc = await AsyncStorage.getItem("ACCTYPE");
        const accbal = await AsyncStorage.getItem("USRBALANCE");
        const img = await AsyncStorage.getItem("USRIMG");
        const usr = await AsyncStorage.getItem("USRTYPE");
        const usrmail = await AsyncStorage.getItem("TOKEN");
        console.log("mail" + img);
        //setCompleted(1);
        let initialVal = 1;
        if (acc == "individual") {
          let persData = await AsyncStorage.getItem("IndPersonal");
          let contData = await AsyncStorage.getItem("IndContact");
          let empData = await AsyncStorage.getItem("IndEmployment");
          let docData = await AsyncStorage.getItem("IndDocument");

          if (persData == "Yes") {
            initialVal = parseInt(initialVal) + 1;
          }
          if (contData == "Yes") {
            initialVal = parseInt(initialVal) + 1;
          }
          if (empData == "Yes") {
            initialVal = parseInt(initialVal) + 1;
            console.log("third yes");
          }
          if (docData == "Yes") {
            initialVal = parseInt(initialVal) + 1;
          }
          setCompleted(initialVal);
          if (parseInt(initialVal) == 1) {
            setCompPercentage("20");
          } else if (parseInt(initialVal) == 2) {
            setCompPercentage("40");
          } else if (parseInt(initialVal) == 3) {
            setCompPercentage("60");
          } else if (parseInt(initialVal) == 4) {
            setCompPercentage("80");
          } else if (parseInt(initialVal) == 5) {
            setCompPercentage("100");
          }
        } else {
          let persData = await AsyncStorage.getItem("CopPersonal");
          let contData = await AsyncStorage.getItem("CopContact");
          let empData = await AsyncStorage.getItem("CopEmployment");
          let docData = await AsyncStorage.getItem("CopDocument");
          let compData = await AsyncStorage.getItem("CopPerc");

          if (persData == "Yes") {
            initialVal = parseInt(initialVal) + 1;
          }
          if (contData == "Yes") {
            initialVal = parseInt(initialVal) + 1;
          }
          if (empData == "Yes") {
            initialVal = parseInt(initialVal) + 1;
            console.log("third yes");
          }
          if (docData == "Yes") {
            initialVal = parseInt(initialVal) + 1;
          }
          setCompleted(initialVal);
          if (parseInt(initialVal) == 1) {
            setCompPercentage("20");
          } else if (parseInt(initialVal) == 2) {
            setCompPercentage("40");
          } else if (parseInt(initialVal) == 3) {
            setCompPercentage("60");
          } else if (parseInt(initialVal) == 4) {
            setCompPercentage("80");
          } else if (parseInt(initialVal) == 5) {
            setCompPercentage("100");
          }
        }

        setUserData({
          ...userdata,
          userid: userID,
          email: userEmail,
          fullname: userName,
          acntype: acc,
          usertype: usr,
          userimg: img,
          userbal: accbal,
        });
      };

      fetchProducts();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ImageBackground
        source={require("../../../assets/vectorbg.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroller}>
          <View style={styles.firstview}>
            <View style={styles.picview}>
              {userdata.userimg == "NotSet" && (
                <Image
                  style={{ width: 40, height: 40, marginTop: 10 }}
                  source={require("../../../assets/user.png")}
                />
              )}
              {userdata.userimg != "NotSet" && (
                <Image
                  style={{ width: 40, height: 40, marginTop: 10 }}
                  source={{ uri: userdata.userimg }}
                />
              )}
            </View>
            <View style={styles.textsview}>
              <Text style={styles.welcometxt}>Welcome 🎉</Text>
              <Text style={styles.usernametxt}>{userdata.fullname}{'/'} {userdata.acntype}{'/'} {userdata.usertype} </Text>

            </View>
            <View style={styles.notificationview}>
              <View>
                <Image
                  style={{
                    width: 32,
                    height: 32,
                    marginTop: 10,
                    alignSelf: "flex-end",
                  }}
                  source={require("../../../assets/notificationon.png")}
                />
              </View>
            </View>
          </View>
          <View style={styles.secondview}>
            <ImageBackground
              source={require("../../../assets/balback.png")}
              resizeMode="cover"
              style={{ width: "98%" }}
            >
              <Text style={styles.baltext}>Balance</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.amnttext}>
                  US$<Text style={styles.startext}>{userdata.userbal}</Text>
                </Text>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 5,
                    marginTop: 15,
                  }}
                  source={require("../../../assets/tracking.png")}
                />
              </View>
            </ImageBackground>
          </View>

          <View style={styles.thirdviewshell}>
            <View style={styles.thirdview}>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoanApply")}
                activeOpacity={0.7}
                style={styles.btnone}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.btnonetext}>Apply for a loan</Text>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginLeft: 5,
                    }}
                    source={require("../../../assets/sendbutton.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => completeProfile()}
            style={styles.fourthview}
          >
            <View style={styles.picview}>
              <Image
                style={{ width: 40, height: 40, marginTop: 10 }}
                source={require("../../../assets/userverified.png")}
              />
            </View>
            <View style={styles.textsview}>
              <Text style={styles.welcometxt}>Complete Profile Setup</Text>
              <Text style={styles.usernametxt}>
                {completed}/5 | {compPercentage}% Complete
              </Text>
            </View>
            <View style={styles.notificationview}>
              <View>
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    marginTop: 20,
                    alignSelf: "flex-end",
                  }}
                  source={require("../../../assets/navigationeast.png")}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.fifthview}>
            <Text style={styles.credittxt}>Check your credit score</Text>
            <Text style={styles.creditsmalltxt}>
              Last checked on october 29, 2023
            </Text>
            <View style={styles.fifthinnerview}>
              <Text style={styles.scoretxt}>0</Text>
              <Text style={styles.scorelowertxt}>Unchecked</Text>
            </View>
          </View>
          <View style={styles.seventhview}>
            <View>
              <Text style={styles.rangetxt}>300</Text>
            </View>
            <View>
              <Text style={styles.rangetxt}>850</Text>
            </View>
          </View>
          <View style={styles.sixthview}>
            <View
              style={{
                flex: 1,
                height: 5,
                backgroundColor: "#CF0218",
                margin: 2,
              }}
            ></View>

            <View
              style={{
                flex: 1,
                height: 5,
                backgroundColor: "#FF8C14",
                margin: 2,
              }}
            ></View>
            <View
              style={{
                flex: 1,
                height: 5,
                backgroundColor: "#FECD2D",
                margin: 2,
              }}
            ></View>
            <View
              style={{
                flex: 1,
                height: 5,
                backgroundColor: "#87CD1F",
                margin: 2,
              }}
            ></View>
            <View
              style={{
                flex: 1,
                height: 5,
                backgroundColor: "#56A74B",
                margin: 2,
              }}
            ></View>
          </View>
          <View style={styles.eighthview}>
            <Image
              style={{
                width: 15,
                height: 11,
                marginLeft: "5%",
              }}
              source={require("../../../assets/pointer.png")}
            />
          </View>
          <TouchableOpacity
                        style={styles.ninethview}
                        onPress={() => navigation.navigate('ReferFriends')}
                    >
                        <View style={styles.ninepicview}>
                            <Image
                                style={{ width: 40, height: 40, marginTop: 10 }}
                                source={require("../../../assets/gift.png")}
                            />
                        </View>
                        <View style={styles.refview}>
                            <Text style={styles.refearntxt}>Refer and Earn</Text>
                            <Text style={styles.refearnsmaltxt}>
                                Refer a friend and earn extra money up to US$5 for every
                                referral you make.{" "}
                                <Text style={{ fontWeight: "800" }}>T&C Applied</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
        </ScrollView>
        <View style={styles.footer}>
          <View>
            <View style={styles.tabviewselected}>
              <Image
                style={{ width: 28, height: 28, marginTop: 3 }}
                source={require("../../../assets/tabnavigator/homewhite.png")}
              />
            </View>
            <View style={styles.tabtextview}>
              <Text style={styles.tabtextselected}>Home</Text>
            </View>
          </View>
          {userdata.usertype == "lender" && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoanMarket")}
              >
                <View style={styles.tabview}>
                  <Image
                    style={{ width: 28, height: 28, marginTop: 3 }}
                    source={require("../../../assets/tabnavigator/market.png")}
                  />
                </View>
                <View style={styles.tabtextview}>
                  <Text style={styles.tabtext}>Market</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            onPress={() =>navigation.navigate("LoanRepay")
            }
          >
            <View style={styles.tabview}>
              <Image
                style={{ width: 28, height: 28, marginTop: 3 }}
                source={require("../../../assets/tabnavigator/loanblack.png")}
              />
            </View>
            <View style={styles.tabtextview}>
              <Text style={styles.tabtext}>Loans</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyTransections")}>
            <View style={styles.tabview}>
              <Image
                style={{ width: 28, height: 28, marginTop: 3 }}
                source={require("../../../assets/tabnavigator/historyblack.png")}
              />
            </View>
            <View style={styles.tabtextview}>
              <Text style={styles.tabtext}>History</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Kyc")}>
            <View style={styles.tabview}>
              <Image
                style={{ width: 28, height: 28, marginTop: 3 }}
                source={require("../../../assets/tabnavigator/accountblack.png")}
              />
            </View>
            <View style={styles.tabtextview}>
              <Text style={styles.tabtext}>My Account</Text>
            </View>
          </TouchableOpacity>
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
  firstview: {
    flex: 1,
    flexDirection: "row",
  },
  picview: {
    flex: 1,
  },
  textsview: {
    flex: 8,
    marginLeft: "5%",
  },
  welcometxt: {
    color: COLORS.egyptionblue,
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
  },
  usernametxt: {
    color: "#155E75",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  notificationview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  secondview: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "#1435AB",
    borderRadius: 10,
    marginTop: 40,
    paddingLeft: 20,
    paddingBottom: 50,
  },
  baltext: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 24,
  },
  amnttext: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
  startext: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 5,
  },
  thirdviewshell: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -45,
  },
  thirdview: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#0A237D",
    borderRadius: 10,
    marginTop: 10,
    width: "70%",
  },
  btnone: {
    height: 55,
    width: "80%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.login,
  },
  btnonetext: {
    color: COLORS.login,
    fontWeight: "500",
    fontSize: 18,
  },
  fourthview: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "#F2E5D10D",
    borderRadius: 10,
    marginTop: 30,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    borderWidth: 2,
    borderColor: "164E63",
    borderStyle: "dashed",
  },
  fifthview: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "#F2E5D10D",
    borderRadius: 10,
    marginTop: 30,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
  },
  credittxt: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 18,
  },
  creditsmalltxt: {
    color: "#4F4F4F",
    fontWeight: "500",
    fontSize: 14,
  },
  fifthinnerview: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  scoretxt: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 40,
  },
  scorelowertxt: {
    color: "#4E4E4E",
    backgroundColor: "#ECECEC",
    fontWeight: "500",
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
  },
  sixthview: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  seventhview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  eighthview: {
    marginTop: 1,
  },
  rangetxt: {
    color: "#898989",
    fontWeight: "600",
    fontSize: 12,
  },
  ninethview: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "#D5FBB6",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 40,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  ninepicview: {
    flex: 1,
  },
  refearntxt: {
    color: "#190503",
    fontWeight: "700",
    fontSize: 18,
    marginTop: 6,
  },
  refearnsmaltxt: {
    color: "#2E3A59",
    fontWeight: "500",
    fontSize: 12,
  },
  refview: {
    flex: 8,
    marginLeft: "5%",
  },
  footer: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 20,
  },
  tabtextview: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabtext: {
    color: "#6B7280",
    fontWeight: "500",
    fontSize: 14,
  },
  tabtextselected: {
    color: "#1435AB",
    fontWeight: "500",
    fontSize: 14,
  },
  tabview: {
    margin: 2,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tabviewselected: {
    margin: 2,
    padding: 10,
    backgroundColor: "#1435AB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FirstTimeWelcome;
