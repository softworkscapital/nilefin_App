import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Modal,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import Loader from "../components/Loader";
import { useFonts } from "expo-font";

const TwoOfThreeA = ({ navigation }) => {
  
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [loading, setLoading] = React.useState(false);
  const [lenderModalVisible, setLenderModalVisible] = useState(false);
  const [borrowerModalVisible, setBorrowerModalVisible] = useState(false);
  const [prevScreen, setPrevScreen] = useState("");
  const [acnt, setAcnt] = useState("");
  const [subacnt, setSubacnt] = useState("");

  const storeUserSelection = async (account, type) => {
    const value = {
      acc: account,
      subacc: type,
    };
    setLenderModalVisible(false);
    setBorrowerModalVisible(false);

    try {
      await AsyncStorage.setItem("SelectedAccount", JSON.stringify(value));
      navigation.navigate("TwoOfThreeB");
      console.log(value)
    } catch (error) {
      console.log(error);
    }
  };

  const moveToTips = async () =>{
    await AsyncStorage.setItem("TipsFrom", "TwoOfThreeA");
    navigation.navigate("TipsAdvice");
  }

  const moveToConditions = async () =>{
    await AsyncStorage.setItem("TermsFrom", "TwoOfThreeA");
    navigation.navigate("TermsConditions");
  }

  useEffect(() => {
    const fetchData = async () => {
      //setLoading(true);
      const asyncScreen = await AsyncStorage.getItem("PrevPage");
      setPrevScreen(asyncScreen);
    };
    fetchData();
  }, []);

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
          <Modal
            animationType="slide"
            transparent={true}
            visible={borrowerModalVisible}
            onRequestClose={() => {
              setBorrowerModalVisible(!borrowerModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#155E75",
                      alignSelf: "flex-start",
                      borderRadius: 63,
                      width: 63,
                      height: 63,
                      marginTop: 20,
                      marginLeft: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 28, height: 25 }}
                      source={require("../../../assets/FolderWhite.png")}
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        setBorrowerModalVisible(!borrowerModalVisible)
                      }
                      style={{ marginTop: 25, marginRight: 10 }}
                    >
                      <AntDesign
                        name="closesquareo"
                        size={34}
                        color="#155E75"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#040B22",
                      fontSize: 20,
                      fontWeight: "600",
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
                      color: "black",
                      fontSize: 16,
                      fontWeight: "400",
                      fontFamily: "GeneralSansMedium",
                      marginRight: 10,
                    }}
                  >
                    Select a sub account type to help understand how you will be
                    using this app
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => storeUserSelection("borrower", "individual")}
                  style={{
                    marginTop: 25,
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: "#899AD5",
                    backgroundColor: "#F0F2FA",
                    marginRight: 10,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      marginVertical: 10,
                    }}
                  >
                    <Image
                      style={{ width: 32, height: 32 }}
                      source={require("../../../assets/usersuccess.png")}
                    />
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#040B22",
                        fontSize: 16,
                        fontWeight: "400",
                        fontFamily: "GeneralSansMedium",
                        marginLeft: 10,
                      }}
                    >
                      For an individual
                    </Text>
                    <Text
                      style={{
                        color: "#040B22",
                        fontSize: 12,
                        fontWeight: "400",
                        fontFamily: "GeneralSansRegular",
                        marginLeft: 10,
                        marginTop: 4,
                      }}
                    >
                      You will be using Wisrod P2P Platform alone
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => storeUserSelection("borrower", "coporate")}
                  style={{
                    marginTop: 15,
                    marginRight: 10,
                    marginBottom: 20,
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: "#0891B2",
                    backgroundColor: "#F1FEFF",
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      marginVertical: 10,
                    }}
                  >
                    <Image
                      style={{ width: 32, height: 32 }}
                      source={require("../../../assets/team.png")}
                    />
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#040B22",
                        fontSize: 16,
                        fontWeight: "400",
                        fontFamily: "GeneralSansMedium",
                        marginLeft: 10,
                      }}
                    >
                      For Corporate
                    </Text>
                    <Text
                      style={{
                        color: "#040B22",
                        fontSize: 12,
                        fontWeight: "400",
                        fontFamily: "GeneralSansRegular",
                        marginLeft: 10,
                        marginTop: 4,
                      }}
                    >
                      The Wisrod P2P Platform will use by a group
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={lenderModalVisible}
            onRequestClose={() => {
              setLenderModalVisible(!lenderModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#112C8E",
                      alignSelf: "flex-start",
                      borderRadius: 63,
                      width: 63,
                      height: 63,
                      marginTop: 20,
                      marginLeft: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 28, height: 25 }}
                      source={require("../../../assets/FolderWhite.png")}
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => setLenderModalVisible(!lenderModalVisible)}
                      style={{ marginTop: 25, marginRight: 10 }}
                    >
                      <AntDesign
                        name="closesquareo"
                        size={34}
                        color="#112C8E"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#040B22",
                      fontSize: 20,
                      fontWeight: "600",
                      fontFamily: "GeneralSansMedium",
                      marginTop: 12,
                    }}
                  >
                    Lender’s Account
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
                      color: "black",
                      fontSize: 16,
                      fontWeight: "400",
                      fontFamily: "GeneralSansMedium",
                      marginRight: 10,
                    }}
                  >
                    Select a sub account type to help understand how you will be
                    using this app
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => storeUserSelection("lender", "individual")}
                  style={{
                    marginTop: 25,
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: "#899AD5",
                    backgroundColor: "#F0F2FA",
                    marginRight: 10,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      marginVertical: 10,
                    }}
                  >
                    <Image
                      style={{ width: 32, height: 32 }}
                      source={require("../../../assets/usersuccess.png")}
                    />
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#040B22",
                        fontSize: 16,
                        fontWeight: "400",
                        fontFamily: "GeneralSansMedium",
                        marginLeft: 10,
                      }}
                    >
                      For an individual
                    </Text>
                    <Text
                      style={{
                        color: "#040B22",
                        fontSize: 12,
                        fontWeight: "400",
                        fontFamily: "GeneralSansRegular",
                        marginLeft: 10,
                        marginTop: 4,
                      }}
                    >
                      You will be using Wisrod P2P Platform alone
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => storeUserSelection("lender", "coporate")}
                  style={{
                    marginTop: 15,
                    marginRight: 10,
                    marginBottom: 20,
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: "#0891B2",
                    backgroundColor: "#F1FEFF",
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      marginVertical: 10,
                    }}
                  >
                    <Image
                      style={{ width: 32, height: 32 }}
                      source={require("../../../assets/team.png")}
                    />
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#040B22",
                        fontSize: 16,
                        fontWeight: "400",
                        fontFamily: "GeneralSansMedium",
                        marginLeft: 10,
                      }}
                    >
                      For Corporate
                    </Text>
                    <Text
                      style={{
                        color: "#040B22",
                        fontSize: 12,
                        fontWeight: "400",
                        fontFamily: "GeneralSansRegular",
                        marginLeft: 10,
                        marginTop: 4,
                      }}
                    >
                      The Wisrod P2P Platform will use by a group
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate(prevScreen)}
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
              marginTop: 12,
              fontFamily: "GeneralSansMedium",
            }}
          >
            Select Account Type
          </Text>
          <Text
            style={{
              color: COLORS.coolgray,
              fontSize: 16,
              fontWeight: "400",
              marginVertical: 10,
              fontFamily: "GeneralSansRegular",
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
            <TouchableOpacity
              onPress={() => setBorrowerModalVisible(true)}
              style={{
                flex: 1,
                flexDirection: "column",
                height: 200,
                borderRadius: 7,
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: "#EBECF0",
              }}
            >
              <View
                style={{
                  backgroundColor: "#72747a",
                  borderRadius: 63,
                  width: 63,
                  height: 63,
                  marginTop: 20,
                  marginLeft: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 28, height: 25 }}
                  source={require("../../../assets/FolderWhite.png")}
                />
              </View>
              <View
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: "#080813",
                    marginTop: 12,
                    fontSize: 16,
                    fontWeight: "700",
                    fontFamily: "GeneralSansMedium",
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
                    color: "#7A869A",
                    fontSize: 14,
                    fontWeight: "400",
                    fontFamily: "GeneralSansRegular",
                    marginVertical: 10,
                  }}
                >
                  With this account you can access & Apply for quick loans.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setLenderModalVisible(true)}
              style={{
                flex: 1,
                flexDirection: "column",
                height: 200,
                margin: 10,
                borderRadius: 7,
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: "#EBECF0",
              }}
            >
              <View
                style={{
                  backgroundColor: "#72747a",
                  borderRadius: 63,
                  width: 63,
                  height: 63,
                  marginTop: 20,
                  marginLeft: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 28, height: 25 }}
                  source={require("../../../assets/FolderWhite.png")}
                />
              </View>
              <View
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: "#080813",
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
                    color: "#7A869A",
                    fontSize: 14,
                    fontWeight: "400",
                    fontFamily: "GeneralSansRegular",
                    marginVertical: 10,
                  }}
                >
                  Invest in high interest & secure loans and make good returns.
                </Text>
              </View>
            </TouchableOpacity>
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
              <Text onPress={() => moveToConditions()} style={{ color: COLORS.signed }}>Terms & Conditions </Text>
              and
              <Text style={{ color: COLORS.signed }}> Privacy Policy </Text>.
            </Text>
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
});

export default TwoOfThreeA;
