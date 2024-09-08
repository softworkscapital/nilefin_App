import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import COLORS from "../../../constants/colors";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APILink from "../../../constants/globals";
import { Ionicons } from "react-native-vector-icons";

const CompleteProfile = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });
  const isFocused = useIsFocused();
  const [personal, setPersonal] = useState(false);
  const [contact, setContact] = useState(false);
  const [employment, setEmployment] = useState(false);
  const [document, setDocument] = useState(false);

  const moveToDocs = async () => {
    try {
      const asynctoken = await AsyncStorage.getItem("TOKEN");
      const apiLink = APILink.getLink();
      let registerResponse = await fetch(`${apiLink}/kyc/users/documents`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      });

      let responseJson = await registerResponse.json();

      if (responseJson.data.length == 5) {
        //Completed
        await AsyncStorage.setItem("IndDocument", "Yes");
      }

      responseJson.data.map((item) => {
        if (item.type == "profile_picture") {
          AsyncStorage.setItem("PROPICSET", "Yes");
        }

        if (item.type == "proof_of_address") {
          AsyncStorage.setItem("PROADDRSET", "Yes");
        }

        if (item.type == "id_card") {
          AsyncStorage.setItem("IDSET", "Yes");
        }

        if (item.type == "property_document") {
          AsyncStorage.setItem("PRODOCSET", "Yes");
        }

        if (item.type == "next_of_kin_id_card") {
          AsyncStorage.setItem("NOKSET", "Yes");
        }
      });

      navigation.navigate("DocumentUpload");
    } catch (error) {
      console.log(error);
    }
  };

  const findCompleted = async () => {
    try {
      await AsyncStorage.removeItem("PROPICSET");
      await AsyncStorage.removeItem("PROADDRSET");
      await AsyncStorage.removeItem("IDSET");
      await AsyncStorage.removeItem("PRODOCSET");
      await AsyncStorage.removeItem("NOKSET");
      console.log("Data removed");
    } catch (exception) {
      console.log(exception);
    }
    try {
      let persData = await AsyncStorage.getItem("IndPersonal");
      let contData = await AsyncStorage.getItem("IndContact");
      let empData = await AsyncStorage.getItem("IndEmployment");
      let docData = await AsyncStorage.getItem("IndDocument");

      if (persData == "Yes") {
        setPersonal(true);
        console.log("Personal Done");
      } else {
        console.log("No Personal Data");
      }

      if (contData == "Yes") {
        setContact(true);
        console.log("Contact Done");
      } else {
        console.log("No Contact Data");
      }

      if (empData == "Yes") {
        setEmployment(true);
        console.log("Employment Done");
      } else {
        console.log("No Employment Data");
      }

      if (docData == "Yes") {
        setDocument(true);
        console.log("Documents Done");
      } else {
        console.log("No Documents Data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      findCompleted();
    }
  }, [props, isFocused]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/vectorbg.png")}
        resizeMode="stretch"
        style={styles.imageBackGr}
      >
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "50%",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("FirstTimeWelcome")}
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
          <Text style={styles.welcometxt}>Complete Profile Setup</Text>

          <View style={styles.kycItem}>
            <View>
              <Text style={styles.kycLevel}>KYC Level</Text>
            </View>

            <View style={styles.levels}>
              <View style={{ height: 3, flex: 1, backgroundColor: "#0E7490" }}>
                <Image
                  style={{ width: 16, height: 16, marginTop: -7.5 }}
                  source={require("../../../../assets/kycticked.png")}
                />
              </View>
              <View
                style={{
                  height: 3,
                  flex: 1,
                  backgroundColor: personal
                    ? "#0E7490"
                    : "rgba(14, 116, 144, 0.3)",
                  marginLeft: 3,
                }}
              >
                {personal == false && (
                  <Image
                    style={{ width: 16, height: 16, marginTop: -7.5 }}
                    source={require("../../../../assets/kycnonticked.png")}
                  />
                )}
                {personal && (
                  <Image
                    style={{ width: 16, height: 16, marginTop: -7.5 }}
                    source={require("../../../../assets/kycticked.png")}
                  />
                )}
              </View>
              <View
                style={{
                  height: 3,
                  flex: 1,
                  backgroundColor: contact
                    ? "#0E7490"
                    : "rgba(14, 116, 144, 0.3)",
                  marginLeft: 3,
                }}
              >
                {contact == false && (
                  <Image
                    style={{ width: 16, height: 16, marginTop: -7.5 }}
                    source={require("../../../../assets/kycnonticked.png")}
                  />
                )}
                {contact && (
                  <Image
                    style={{ width: 16, height: 16, marginTop: -7.5 }}
                    source={require("../../../../assets/kycticked.png")}
                  />
                )}
              </View>
              <View
                style={{
                  height: 3,
                  flex: 1,
                  backgroundColor: employment
                    ? "#0E7490"
                    : "rgba(14, 116, 144, 0.3)",
                  marginLeft: 3,
                }}
              >
                {employment == false && (
                  <Image
                    style={{ width: 16, height: 16, marginTop: -7.5 }}
                    source={require("../../../../assets/kycnonticked.png")}
                  />
                )}
                {employment && (
                  <Image
                    style={{ width: 16, height: 16, marginTop: -7.5 }}
                    source={require("../../../../assets/kycticked.png")}
                  />
                )}
                {document == false && (
                  <Image
                    style={{
                      width: 16,
                      height: 16,
                      marginTop: -15.5,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/kycnonticked.png")}
                  />
                )}
                {document && (
                  <Image
                    style={{
                      width: 16,
                      height: 16,
                      marginTop: -15.5,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/kycticked.png")}
                  />
                )}
              </View>
            </View>

            <View style={styles.levelsLabels}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 10,
                    fontWeight: "500",
                    marginLeft: -5,
                    fontFamily: "GeneralSansRegular",
                  }}
                >
                  Start
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 10,
                    fontWeight: "500",
                    marginLeft: -5,
                    fontFamily: "GeneralSansRegular",
                  }}
                >
                  Level 2
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 10,
                    fontWeight: "500",
                    marginLeft: -5,
                    fontFamily: "GeneralSansRegular",
                  }}
                >
                  Level 3
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 10,
                    fontWeight: "500",
                    marginLeft: -15,
                    fontFamily: "GeneralSansRegular",
                  }}
                >
                  Level 4
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 10,
                    fontWeight: "500",
                    marginLeft: 45,
                    fontFamily: "GeneralSansRegular",
                  }}
                >
                  Level 5
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: COLORS.cyanlight,
                borderRadius: 12,
                paddingVertical: 20,
                paddingHorizontal: 12,
                marginLeft: "2%",
                marginTop: 30,
                marginBottom: 10,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../../../assets/alert.png")}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: "#040B22",
                    fontSize: 12,
                    fontWeight: "400",
                    fontFamily: "GeneralSansRegular",
                    marginLeft: 10,
                  }}
                >
                  Upgrade your account to level 5 to become fully eligible to
                  request a loan
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.kycItemsView}>
            <TouchableOpacity
              onPress={() => {personal ? console.log("Personal Completed") : navigation.navigate("PersonalDetails")}}
              style={styles.kycListItem}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/personal.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Personal Details</Text>
                <Text style={styles.kycInstructionText}>
                  Give us more information about you
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  {personal == false && (
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
                  )}
                  {personal && (
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                        marginTop: 10,
                        marginRight: 10,
                        alignSelf: "flex-end",
                      }}
                      source={require("../../../../assets/greentick.png")}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {contact ? console.log("Contact Completed") : navigation.navigate("ContactDetails")}}
              style={styles.kycListItem}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/identification.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>
                  Identification & Contact Information
                </Text>
                <Text style={styles.kycInstructionText}>
                  We need your a way to identify you
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  {contact == false && (
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
                  )}
                  {contact && (
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                        marginTop: 10,
                        marginRight: 10,
                        alignSelf: "flex-end",
                      }}
                      source={require("../../../../assets/greentick.png")}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {employment ? console.log("Employment Completed") : navigation.navigate("EmploymentDetails")}}
              style={styles.kycListItem}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/addKyc.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Employment Information</Text>
                <Text style={styles.kycInstructionText}>
                  Give us more information about you
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  {employment == false && (
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
                  )}
                  {employment && (
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                        marginTop: 10,
                        marginRight: 10,
                        alignSelf: "flex-end",
                      }}
                      source={require("../../../../assets/greentick.png")}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                document ? console.log("Docs Completed") : moveToDocs();
              }}
              style={styles.kycListItemLast}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/docUpload.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Document Upload</Text>
                <Text style={styles.kycInstructionText}>
                  Provide supporting documents to hel...
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  {document == false && (
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
                  )}
                  {document && (
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                        marginTop: 10,
                        marginRight: 10,
                        alignSelf: "flex-end",
                      }}
                      source={require("../../../../assets/greentick.png")}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
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
    marginTop: 10,
    fontFamily: "GeneralSansMedium",
  },
  kycItem: {
    flexDirection: "column",
    marginTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingRight: "6%",
    borderWidth: 3,
    borderColor: "#164E633D",
    borderStyle: "dashed",
    backgroundColor: "#edfeff",
    borderRadius: 10,
  },
  kycLevel: {
    color: "#164E63",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 10,
    marginLeft: "2%",
    fontFamily: "GeneralSansMedium",
  },
  levels: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: "2%",
  },
  levelsLabels: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: "2%",
  },
  kycItemsView: {
    marginTop: 40,
  },
  kycListItem: {
    flexDirection: "row",
    marginTop: 8,
    paddingTop: 10,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: "#D4D4D8",
  },
  kycListItemLast: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 30,
    paddingTop: 10,
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
  kycItemC: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
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
});

export default CompleteProfile;
