import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";

const ChatWithUs = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const makeChat = () => {
    Linking.openURL("whatsapp://send?text=Hello&phone=263783020000");
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
          <Text style={styles.welcometxt}>Hello</Text>
          <Text style={styles.instruction}>
            Need assistance? {"\n"}
            {"\n"}Click
            <Text style={styles.instructionbold}> ‘send a message’</Text> to get
            started.
          </Text>

          <View
            onPress={() => navigation.navigate("CallUs")}
            style={styles.kycItem}
          >
            <View>
              <Image
                style={{ width: 44, height: 40.25, marginTop: 10 }}
                source={require("../../../../assets/chatus.png")}
              />
            </View>
            <View>
              <Text style={styles.starttxt}>Start a conversation</Text>
            </View>
            <View>
              <Text style={styles.usualreply}>
                Our usual reply time is
                <Text style={styles.usualreplybold}> a few minutes</Text>
              </Text>
            </View>
            <View style={styles.persons}>
              <View>
                <Image
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 52,
                    borderWidth: 2,
                    borderColor: "#FFFFFF",
                    marginTop: 10,
                  }}
                  source={require("../../../../assets/person.png")}
                />
              </View>
              <View>
                <Image
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 52,
                    borderWidth: 2,
                    borderColor: "#FFFFFF",
                    marginTop: 10,
                    marginLeft: -17,
                  }}
                  source={require("../../../../assets/person.png")}
                />
              </View>
              <View>
                <Image
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 52,
                    borderWidth: 2,
                    borderColor: "#FFFFFF",
                    marginTop: 10,
                    marginLeft: -17,
                  }}
                  source={require("../../../../assets/person.png")}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  makeChat();
                }}
                activeOpacity={0.7}
                style={styles.btn}
              >
                <Image
                  style={{ width: 24, height: 24, marginRight: 10 }}
                  source={require("../../../../assets/sendmsg.png")}
                />
                <Text style={styles.btntext}>Send us a message</Text>
              </TouchableOpacity>
            </View>
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
  instruction: {
    color: "#040B22",
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 10,
    fontFamily: "GeneralSansRegular",
  },
  usualreply: {
    color: "#040B22",
    fontSize: 14,
    fontWeight: "400",
    marginVertical: 10,
    fontFamily: "GeneralSansRegular",
  },
  instructionbold: {
    color: "#040B22",
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 10,
    fontFamily: "GeneralSansMedium",
  },
  usualreplybold: {
    color: "#040B22",
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 10,
    fontFamily: "GeneralSansMedium",
  },
  kycItem: {
    flexDirection: "column",
    marginTop: 20,
    paddingTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: "#164E633D",
    borderRadius: 10,
  },
  starttxt: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    fontFamily: "GeneralSansMedium",
  },
  persons: {
    flexDirection: "row",
    marginTop: 20,
  },
  btn: {
    height: 55,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#1435AB",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  btntext: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 18,
    fontFamily: "GeneralSansMedium",
  },
});

export default ChatWithUs;
