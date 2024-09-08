import React, { useEffect } from "react";
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

const KycDetails = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "50%",
            marginTop: 20,
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
        <Text style={styles.welcometxt}>KYC Details</Text>
        <Text style={styles.instruction}>
          See compliance status and information
        </Text>
        <View style={styles.kycItemsView}>
          <ScrollView>
            <TouchableOpacity style={styles.kycItem}>
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/addKyc.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Additional KYC</Text>
                <Text style={styles.kycInstructionText}>
                  Other required informations we need
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
              onPress={() => navigation.navigate("KycDoc")}
              style={styles.kycItemLast}
            >
              <View style={styles.kycItemA}>
                <Image
                  style={{ width: 44, height: 40.25, marginTop: 10 }}
                  source={require("../../../../assets/docUpload.png")}
                />
              </View>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Documents Uploaded</Text>
                <Text style={styles.kycInstructionText}>
                  See status of documents you upload
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
          </ScrollView>
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
  welcometxt: {
    color: "#040B22",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
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
  }
});

export default KycDetails;
