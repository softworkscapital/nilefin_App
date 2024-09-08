import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Linking,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";

const CallUs = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const makeCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:+26300077729";
    } else {
      phoneNumber = "telprompt:+26300077729";
    }

    Linking.openURL(phoneNumber);
  };

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
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("FaqsSupport")}
              style={{ marginRight: 10, marginTop: 5, flexDirection: "row" }}
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
          <Text style={styles.welcometxt}>Call Us</Text>

          <View style={styles.kycItemsView}>
            <View>
              <Image
                style={{ width: 137, height: 125.32 }}
                source={require("../../../../assets/callusbig.png")}
              />
            </View>
            <View>
              <Text
                style={{
                  color: "#040B22",
                  fontSize: 20,
                  fontWeight: "600",
                  marginTop: 15,
                  fontFamily: "GeneralSansMedium",
                }}
              >
                Tap on the number to reach out.
              </Text>
            </View>
            <TouchableOpacity onPress={() => makeCall()}>
              <Text
                style={{
                  color: "#1435AB",
                  fontSize: 20,
                  fontWeight: "600",
                  marginTop: 15,
                  textDecorationLine: "underline",
                  fontFamily: "GeneralSansMedium",
                }}
              >
                +263 000 777 29
              </Text>
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
  kycItemsView: {
    flex: 8,
    marginTop: "23%",
    alignItems: "center",
  },
});

export default CallUs;
