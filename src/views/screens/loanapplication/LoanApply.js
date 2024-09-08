import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { useFonts } from "expo-font";
import COLORS from "../../../constants/colors";
import { AntDesign } from "react-native-vector-icons";

const LoanApply = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });
  const [screen, setScreen] = useState(1);

  if (!fontsLoaded) {
    return null;
  }


  const applyForLoan = async () => {
    try {
      const response = await axios.post('https://your-api-endpoint.com/loan-apply', {
        amount: loanDetails.amount,
        repaymentPlan: loanDetails.repaymentPlan,
        duration: loanDetails.duration,
      });
      // Handle success response
      Alert.alert("Success", "Your loan application has been submitted!");
      navigation.navigate("LoanDetails"); // Navigate to LoanDetails
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error submitting your application. Please try again.");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/vectorbg.png")}
        resizeMode="stretch"
        style={{ flex: 1 }}
      >
        <ScrollView>
        <View style={styles.firstFlex}>
          <TouchableOpacity onPress={()=>navigation.navigate('FirstTimeWelcome')}style={styles.tmview}>
            <AntDesign name="close" size={25} style={styles.tmtext} />
          </TouchableOpacity>
          <View style={styles.outercircle}>
            <View style={styles.viewFirstBox}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "10%",
                  backgroundColor: "#ECEFF9",
                  height: 40,
                  borderRadius: 25,
                  alignSelf: "center",
                }}
              ></View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: "50%",
                  flexDirection: "column",
                  marginLeft: 10,
                }}
              >
                <Text style={styles.txtHeadText}>
                  Quick and Low intrest loans
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: "40%",
                }}
              >
                <Text style={styles.txtAmnt}>+$ 150,000.00</Text>
              </View>
            </View>
            <View style={styles.viewSecondBox}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: "50%",
                  flexDirection: "column",
                  marginLeft: 10,
                }}
              >
                <Text style={styles.txtHeadTextSmall}>Flexible Repayment Plan</Text>
                <Text style={[styles.txtHeadTextBig, {fontFamily: 'GeneralSansMedium'}]}>$ 10,500.00</Text>
                <Text style={styles.txtHeadTextSmall}>9 Months</Text>
              </View>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  width: "40%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("FirstTimeWelcome")}
                  activeOpacity={0.7}
                  style={styles.greenBtn}
                >
                  <Text style={styles.txtGreenBtn}>Completed</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.secondFlex}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoanDetails")}
            activeOpacity={0.7}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Continue</Text>
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
    flexDirection: "column",
    backgroundColor: "white",
  },
  firstFlex: {
    flex: 7,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  outercircle: {
    width: 300,
    height: 300,
    marginTop: 100,
    borderRadius: 150,
    borderWidth: 0.5,
    backgroundColor: "#164E63",
  },
  tmview: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  tmtext: {
    color: "#000000",
  },
  secondFlex: {
    flex: 3,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    height: 55,
    width: "90%",
    backgroundColor: COLORS.signed,
    marginTop: 20,
    marginVertical: 20,
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
    fontFamily: "GeneralSansMedium",
  },
  viewFirstBox: {
    width: "115%",
    marginTop: 70,
    marginLeft: -20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#7686CB",
    backgroundColor: "#FFFFFF",
    height: 64,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  viewSecondBox: {
    width: "115%",
    marginTop: 10,
    marginLeft: -20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#7686CB",
    backgroundColor: "#FFFFFF",
    height: 100,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  txtHeadText: {
    color: "#344054",
    fontWeight: "500",
    fontSize: 13,
    fontFamily: "GeneralSansMedium",
  },
  txtHeadTextSmall: {
    color: "#344054",
    fontWeight: "500",
    fontSize: 13,
    fontFamily: "GeneralSansRegular",
  },
  txtHeadTextBig: {
    color: "#344054",
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
  },
  txtAmnt: {
    color: "#27923C",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
  },
  greenBtn: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#27923C",
    width: 100,
    height: 25,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  txtGreenBtn: {
    justifyContent:"center",
    alignContent:"center",
    color: "#27923C",
    fontWeight: "500",
    fontSize: 10,
    fontFamily: "GeneralSansRegular",
  },
});
export default LoanApply;
