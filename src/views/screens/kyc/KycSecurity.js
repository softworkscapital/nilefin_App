import React, { useEffect, useState } from "react";
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

const KycSecurity = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "50%",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Kyc")}
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
          <Text style={styles.welcometxt}>Security</Text>
          <Text style={styles.instruction}>
            Update your app security information
          </Text>
          <View style={styles.kycItemsView}>
            <TouchableOpacity style={styles.kycItem}>
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 24, height: 28, marginTop: 10 }}
                  source={require("../../../../assets/fingerprint.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>
                  Enable Face ID/Fingerprint
                </Text>
                <Text style={styles.kycInstructionText}>
                  Unlock your app with your biometric
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
            <TouchableOpacity
              onPress={() => navigation.navigate("ChangePassword")}
              style={styles.kycItem}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 24, height: 28, marginTop: 10 }}
                  source={require("../../../../assets/changepass.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Change Password</Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 28,
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
              onPress={() => navigation.navigate("NewTransPin")}
              style={styles.kycItem}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 24, height: 28, marginTop: 10 }}
                  source={require("../../../../assets/changepin.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Set Transection PIN</Text>
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
              onPress={() => navigation.navigate("ResetTransPin")}
              style={styles.kycItem}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 24, height: 28, marginTop: 10 }}
                  source={require("../../../../assets/changepin.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Change Transection PIN</Text>
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
    marginTop: 40,
  },
  kycItem: {
    flexDirection: "row",
    marginTop: 8,
    paddingTop: 5,
    paddingBottom: 18,
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
    marginTop: 12,
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
  }
});

export default KycSecurity;
