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

const DocUploadB = ({ navigation }) => {
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
                onPress={() => navigation.navigate("EmploymentDetails")}
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
            Proof Of Address
          </Text>
          <View style={styles.selectContainer}>
            <RNPickerSelect
              placeholder={""}
              onValueChange={(text) => setInputs({ ...inputs, resproof: text })}
              items={[
                { label: "Utility bill", value: "Utility bill", key: "1" },
                { label: "Bank statement", value: "Bank statement", key: "2" },
                { label: "Contract", value: "Contract", key: "3" },
                {
                  label: "Driving license",
                  value: "Driving license",
                  key: "4",
                },
                {
                  label: "Property tax receipt",
                  value: "Property tax receipt",
                  key: "5",
                },
                { label: "Tax assessment", value: "Tax assessment", key: "6" },
                {
                  label: "Car insurance",
                  value: "Car insurance",
                  key: "6",
                },
                {
                  label: "Lease or mortgage statement",
                  value: "Lease or mortgage statement",
                  key: "7",
                },
                {
                  label: "Car registration",
                  value: "Car registration",
                  key: "8",
                },
                {
                  label: "Credit card bill",
                  value: "Credit card bill",
                  key: "9",
                },
                {
                  label: "Employment letter",
                  value: "Employment letter",
                  key: "10",
                },
                {
                  label: "Mortgage statement",
                  value: "Mortgage statement",
                  key: "11",
                },
                {
                  label: "Residence permit",
                  value: "Residence permit",
                  key: "12",
                },
                {
                  label: "Voter registration card",
                  value: "Voter registration card",
                  key: "13",
                },
                { label: "Insurance", value: "Insurance", key: "14" },
                { label: "Landline bill", value: "Landline bill", key: "15" },
                {
                  label: "Local government ID",
                  value: "Local government ID",
                  key: "16",
                },
                {
                  label: "Pension statement",
                  value: "Pension statement",
                  key: "17",
                },
                { label: "Bills", value: "Bills", key: "18" },
                {
                  label: "Company",
                  value: "Company",
                  key: "19",
                },
                {
                  label: "Insurance policy",
                  value: "Insurance policy",
                  key: "20",
                },
                { label: "Mail", value: "Mail", key: "21" },
                {
                  label: "Statement from financial institution",
                  value: "Statement from financial institution",
                  key: "22",
                },
                {
                  label: "Tax forms",
                  value: "Tax forms",
                  key: "23",
                },
              ]}
            />
          </View>

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
          <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
            Government Issued ID Card
          </Text>
          <View style={styles.selectContainer}>
            <RNPickerSelect
              placeholder={""}
              onValueChange={(text) => setInputs({ ...inputs, resproof: text })}
              items={[
                { label: "Driver license", value: "Driver license", key: "1" },
                { label: "Passport", value: "Passport", key: "2" },
                { label: "National ID", value: "National ID", key: "3" },
                {
                  label: "Certificate of Citizenship",
                  value: "Certificate of Citizenship",
                  key: "4",
                },
                {
                  label: "Birth Certificate",
                  value: "Birth Certificate",
                  key: "5",
                },
              ]}
            />
          </View>

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
          <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
            Property Ownership Documents{" "}
          </Text>
          <View style={styles.selectContainer}>
          <RNPickerSelect
              placeholder={""}
              onValueChange={(text) => setInputs({ ...inputs, resproof: text })}
              items={[
                { label: "Gift deed", value: "Gift deed", key: "1" },
                { label: "Certificate", value: "Certificate", key: "2" },
                { label: "Warranty deed", value: "Warranty deed", key: "3" },
                {
                  label: "Mortgage deed",
                  value: "Mortgage deed",
                  key: "4",
                },
                { label: "Quitclaim deed", value: "Quitclaim deed", key: "5" },
                { label: "Deed of trust", value: "Deed of trust", key: "6" },
                {
                  label: "Rental agreement",
                  value: "Rental agreement",
                  key: "6",
                },
                {
                  label: "Title deed",
                  value: "Title deed",
                  key: "7",
                },
                { label: "Completion certificate", value: "Completion certificate", key: "8" },
                { label: "Payment receipts", value: "Payment receipts", key: "9" },
                { label: "Allotment letter", value: "Allotment letter", key: "10" },
                { label: "Title transfer document", value: "Title transfer document", key: "10" },
                { label: "Tax deed", value: "Tax deed", key: "11" },
                {
                  label: "Chattel mortgage",
                  value: "Chattel mortgage",
                  key: "12",
                },
                {
                  label: "Freehold title",
                  value: "Freehold title",
                  key: "13",
                },
                { label: "Grant of Probate", value: "Grant of Probate", key: "14" },
                { label: "Joint Development Agreement", value: "Joint Development Agreement", key: "15" },
                { label: "Khata certificate", value: "Khata certificate", key: "16" },
                {
                  label: "Land agreement",
                  value: "Land agreement",
                  key: "17",
                },
                
              ]}
            />
          </View>

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
  selectContainer: {
    height: 55,
    backgroundColor: "#F0F2FA",
    paddingHorizontal: 2,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#D0D7EE",
    marginTop: 5,
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
    marginTop: 20,
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
    marginTop: 20,
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

export default DocUploadB;
