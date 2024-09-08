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
import RNPickerSelect from "react-native-picker-select";
import COLORS from "../../../constants/colors";
import * as Progress from "react-native-progress";

const CopDocUploadB = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [inputs, setInputs] = React.useState({
    resproof: "",
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
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("CopDocumentUpload")}
                style={{ marginRight: 10, marginTop: 5, flexDirection: "row" }}
              >
                <Image style={{width: 20, height: 20}} source={require("../../../../assets/arrow-left.png")} />
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
                Step 4 of 4
              </Text>
            </View>
          </View>
          <Text style={styles.welcometxt}>Document Upload</Text>
          <Text style={styles.instruction}>
            Please provide the required information.
          </Text>

          <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
          Certificate Of Incoperation 
          </Text>
          <View style={styles.uploadingView}>
            <View>
              <Text style={styles.txtUploadingText}>Uploading</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%" }}>
                <Text style={styles.txtMinsRemainingText}>
                  48 % - 2 minutes remaining
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "50%",
                }}
              >
                <Image
                  style={{ width: 20, height: 20, marginRight: 5 }}
                  source={require("../../../../assets/pause.png")}
                />
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../../../assets/cancel.png")}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                marginTop: 5,
              }}
            >
              <Progress.Bar
                progress={0.5}
                color={"#000000"}
                width={330}
                height={2}
              />
            </View>
          </View>

          <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
          Directorship Documents 
          </Text>
          <View style={styles.uploadStateView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../../../../assets/uploadicon.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "80%",
                flexDirection: "column",
              }}
            >
              <Text style={styles.txtUploadStateTop}>Image.jpg</Text>
              <Text style={styles.txtUploadStateBtm}>
                200 KB – 100% uploaded
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../../../assets/tick.png")}
              />
            </View>
          </View>
          <View style={styles.uploadStateOpt}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Text style={[styles.txtOptions, { marginRight: 10 }]}>View</Text>
              <Text style={styles.txtOptions}>Delete</Text>
            </View>
          </View>
          <Text style={[styles.txtUploadingText, { marginTop: 3 }]}>
          Constitution 
          </Text>
       

          <View style={styles.uploadStateView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../../../../assets/uploadicon.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "80%",
                flexDirection: "column",
              }}
            >
              <Text style={styles.txtUploadStateTop}>
                International Passport.jpg
              </Text>
              <Text style={styles.txtUploadStateBtm}>
                200 KB – 100% uploaded
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../../../assets/tick.png")}
              />
            </View>
          </View>
          <View style={styles.uploadStateOpt}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Text style={[styles.txtOptions, { marginRight: 10 }]}>View</Text>
              <Text style={styles.txtOptions}>Delete</Text>
            </View>
          </View>
          <Text style={[styles.txtUploadingText, { marginTop: 2 }]}>
          Financial Statements 
          </Text>
          <View style={styles.uploadStateView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../../../../assets/uploadicon.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "80%",
                flexDirection: "column",
              }}
            >
              <Text style={styles.txtUploadStateTop}>Mortgage Statements.jpg</Text>
              <Text style={styles.txtUploadStateBtm}>
                200 KB – 100% uploaded
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../../../assets/tick.png")}
              />
            </View>
          </View>
          <View style={styles.uploadStateOpt}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Text style={[styles.txtOptions, { marginRight: 10 }]}>View</Text>
              <Text style={styles.txtOptions}>Delete</Text>
            </View>
          </View>
          <Text style={[styles.txtUploadingText, { marginTop: 2 }]}>
          Bank Statement
          </Text>
          <View style={styles.uploadStateView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../../../../assets/uploadicon.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "80%",
                flexDirection: "column",
              }}
            >
              <Text style={styles.txtUploadStateTop}>Mortgage Statements.jpg</Text>
              <Text style={styles.txtUploadStateBtm}>
                200 KB – 100% uploaded
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../../../assets/tick.png")}
              />
            </View>
          </View>
          <View style={styles.uploadStateOpt}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Text style={[styles.txtOptions, { marginRight: 10 }]}>View</Text>
              <Text style={styles.txtOptions}>Delete</Text>
            </View>
          </View>
          <Text style={[styles.txtUploadingText, { marginTop: 2 }]}>
          Articles of Association/PBC Document  
          </Text>
          <View style={styles.uploadStateView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../../../../assets/uploadicon.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "80%",
                flexDirection: "column",
              }}
            >
              <Text style={styles.txtUploadStateTop}>Mortgage Statements.jpg</Text>
              <Text style={styles.txtUploadStateBtm}>
                200 KB – 100% uploaded
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../../../assets/tick.png")}
              />
            </View>
          </View>
          <View style={styles.uploadStateOpt}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Text style={[styles.txtOptions, { marginRight: 10 }]}>View</Text>
              <Text style={styles.txtOptions}>Delete</Text>
            </View>
          </View>
          <Text style={[styles.txtUploadingText, { marginTop: 2 }]}>
          Company Documents-MOA 
          </Text>
          <View style={styles.uploadStateView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../../../../assets/uploadicon.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "80%",
                flexDirection: "column",
              }}
            >
              <Text style={styles.txtUploadStateTop}>Mortgage Statements.jpg</Text>
              <Text style={styles.txtUploadStateBtm}>
                200 KB – 100% uploaded
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../../../assets/tick.png")}
              />
            </View>
          </View>
          <View style={styles.uploadStateOpt}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Text style={[styles.txtOptions, { marginRight: 10 }]}>View</Text>
              <Text style={styles.txtOptions}>Delete</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("KycCompleted")}
              activeOpacity={0.7}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Complete</Text>
              <Image
                style={{ width: 20, height: 18, marginLeft: 7 }}
                source={require("../../../../assets/arrow-white.png")}
              />
              <Image
                style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
                source={require("../../../../assets/arow-blue.png")}
              />
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
  btn: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.signed,
    marginTop: 3,
    marginLeft: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.login,
    flexDirection: "row",
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "500",
    fontSize: 18,
  },
  uploadingView: {
    width: "100%",
    marginTop: 2,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A1A1AA",
    height: 64,
    flexDirection: "column",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  txtUploadingText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
  },
  txtMinsRemainingText: {
    color: "#000000",
    fontWeight: "400",
    fontSize: 12,
    fontFamily: "GeneralSansRegular",
  },
  uploadStateView: {
    width: "100%",
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A1A1AA",
    height: 64,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  txtUploadStateTop: {
    color: "#344054",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
  },
  txtUploadStateBtm: {
    color: "#667085",
    fontWeight: "400",
    fontSize: 12,
    fontFamily: "GeneralSansRegular",
  },
  uploadStateOpt: {
    width: "100%",
    marginTop: 5,
    flexDirection: "row",
    paddingVertical: 5,
  },
  txtOptions: {
    color: "#505050",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
  },
});

export default CopDocUploadB;
