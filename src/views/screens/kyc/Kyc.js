import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useFonts } from "expo-font";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Touchable } from "react-native-web";

const Kyc = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });
  



  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [userdata, setUserData] = React.useState({
    userid: "",
    email: "",
    fullname: "",
    acntype: "",
    usertype: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      const fetchProducts = async () => {
        const userID = await AsyncStorage.getItem("CIDID");
        const userEmail = await AsyncStorage.getItem("CIDEmail");
        const userName = await AsyncStorage.getItem("CIDName");

        const acc = await AsyncStorage.getItem("ACCTYPE");
        const usr = await AsyncStorage.getItem("USRTYPE");

        setUserData({
          ...userdata,
          userid: userID,
          email: userEmail,
          fullname: userName,
          acntype: acc,
          usertype: usr,
        });
      };

      fetchProducts();
    }, [userdata])
  );

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
        <ScrollView>
          <View style={styles.upperView}>
            <View>
              <Image
                style={{ width: 80, height: 80 }}
                source={require("../../../../assets/user.png")}
              />
            </View>
            <View>
              <Text style={styles.welcomeText}>{userdata.fullname}</Text>
            </View>
            <View>
              <Text style={styles.acntText}>
                {userdata.acntype == "individual" ? "Individual" : ""}
                {userdata.acntype == "corporate" ? "Corporate" : ""}
                Account
              </Text>

              <Text style={styles.acntText}>
              {userdata.usertype}

              </Text>

            </View>
          </View>
          <View style={styles.kycItemsView}>
            <TouchableOpacity
              onPress={() => navigation.navigate("KycDetails")}
              style={styles.kycItem}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/send1.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>KYC Details</Text>
                <Text style={styles.kycInstructionText}>
                  Give us more information about you
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/chevron.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("KycSecurity")}
              style={styles.kycItem}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/send2.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Security</Text>
                <Text style={styles.kycInstructionText}>
                  Give us more information about you
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/chevron.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("FundWallet")}
              style={styles.kycItem}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/copfindetails.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Wallet Funding</Text>
                <Text style={styles.kycInstructionText}>
                  Top up you wallet via wallet funding page
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/chevron.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("FaqsSupport")}
              style={styles.kycItem}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/send3.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>FAQs and Support</Text>
                <Text style={styles.kycInstructionText}>
                  Give us more information about you
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/chevron.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ReferFriends")}
              style={styles.kycItem}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/send4.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Refer Friends</Text>
                <Text style={styles.kycInstructionText}>
                  Give us more information about you
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/chevron.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.kycItem}>
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/send5.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>
                  Switch to Lender’s Account
                </Text>
                <Text style={styles.kycInstructionText}>
                  Give us more information about you
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.kycItemLast}>
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/send6.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Legal</Text>
                <Text style={styles.kycInstructionText}>
                  Give us more information about you
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/chevron.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Signin")}
              style={styles.signOutView}
            >
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>





        <View style={styles.footer}>
                    <TouchableOpacity

                        onPress={() => { 
                          if(userdata.usertype== "lender"){  navigation.navigate("FirstTimeWelcome2") }
                          else if(userdata.usertype== "borrower"){  navigation.navigate("FirstTimeWelcome") }}}
                        >
                        <View style={styles.tabview}>
                            <Image
                                style={{ width: 28, height: 28, marginTop: 3 }}
                                source={require("../../../../assets/tabnavigator/homeblack.png")}
                            />
                        </View>
                        <View style={styles.tabtextview}>
                            <Text style={styles.tabtext}>Home</Text>
                        </View>
                    </TouchableOpacity>
        
                        
                    {userdata.usertype == "lender" && (
                      <>
                                         <TouchableOpacity
                                onPress={() => navigation.navigate("LoanMarket")} >
                                 <View style={styles.tabview}>
                                    <Image
                                        style={{ width: 28, height: 28, marginTop: 3 }}
                                        source={require("../../../../assets/tabnavigator/market.png")}
                                    />
                                </View>
                                <View style={styles.tabtextview}>
                                    <Text style={styles.tabtext}>Market</Text>
                                </View>
                            </TouchableOpacity>   
                      </>

                    )}

                  
        
                
                    <TouchableOpacity



                        onPress={() => { 
                          if(userdata.usertype== "lender"){  navigation.navigate("MyLoans") }
                          else if(userdata.usertype== "borrower"){  navigation.navigate("LoanRepay") }}}
                    >
                        <View style={styles.tabview}>
                            <Image
                                style={{ width: 28, height: 28, marginTop: 3 }}
                                source={require("../../../../assets/tabnavigator/loanblack.png")}
                            />
                        </View>
                        <View style={styles.tabtextview}>
                            <Text style={styles.tabtext}>Loans</Text>
                        </View>
                    </TouchableOpacity>

                    {userdata.usertype == "lender" && (

                    <TouchableOpacity onPress={() => navigation.navigate("FundWallet")}>
                        <View style={styles.tabview}>
                            <Image
                                style={{ width: 28, height: 28, marginTop: 3 }}
                                source={require("../../../../assets/tabnavigator/historyblack.png")}
                            />
                        </View>
                        <View style={styles.tabtextview}>
                            <Text style={styles.tabtext}>Wallet</Text>
                        </View>
                    </TouchableOpacity>

                    )}

                      {userdata.usertype == "borrower" && (

                        <TouchableOpacity    onPress={() => navigation.navigate("MyTransections")} >
                        <View>
                                  <View style={styles.tabview}>
                                    <Image
                                      style={{ width: 28, height: 28, marginTop: 3 }}
                                      source={require("../../../../assets/tabnavigator/historyblack.png")}
                                    />
                                  </View>
                                  <View style={styles.tabtextview}>
                                    <Text style={styles.tabtext}>History</Text>
                                  </View>
                                </View> 
                        </TouchableOpacity>

                      )
                      }

                    <TouchableOpacity onPress={() => navigation.navigate("Kyc")}>
                        <View style={styles.tabviewselected}>
                            <Image
                                style={{ width: 28, height: 28, marginTop: 3 }}
                                source={require("../../../../assets/tabnavigator/accountwhite.png")}
                            />
                        </View>
                        <View style={styles.tabtextview}>
                            <Text style={styles.tabtextselected}>My Account</Text>
                        </View>
                    </TouchableOpacity>

        </View>
      



        
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
  upperView: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: "#155E75",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
    marginTop: 15,
  },
  acntText: {
    color: "#040B22",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "GeneralSansRegular",
    marginTop: 5,
  },
  kycItemsView: {
    flex: 8,
    marginTop: 20,
  },
  kycItem: {
    flexDirection: "row",
    marginTop: 8,
    paddingTop: 15,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: "#D4D4D8",
  },
  kycItemLast: {
    flexDirection: "row",
    marginTop: 8,
    paddingTop: 15,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "#D4D4D8",
    borderBottomWidth: 1,
    borderBottomColor: "#D4D4D8",
  },
  kycItemA: {
    flex: 1,
    paddingRight: 5,
  },
  kycItemB: {
    flex: 8,
    marginLeft: "7%",
  },
  kycHeaderText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    fontFamily: "GeneralSansMedium",
  },
  kycInstructionText: {
    color: "#6B778C",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 5,
    fontFamily: "GeneralSansRegular",
  },
  kycItemC: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  signOutView: {
    justifyContent: "center",
    alignItems: "center",
  },
  signOutText: {
    color: "#DC3C26",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    fontFamily: "GeneralSansMedium",
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
    fontFamily: "GeneralSansRegular",
  },
  tabtextselected: {
    color: "#1435AB",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
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

export default Kyc;
