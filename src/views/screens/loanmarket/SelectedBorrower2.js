import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Dimensions,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "react-native-paper";
import COLORS from "../../../constants/colors";
import Loader from "../../components/Loader";
import APILink from "../../../constants/globals";
import { useIsFocused } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Progress from "react-native-progress";
import {
  Ionicons,
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";

const SelectedBorrower = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [pinset, setPinset] = React.useState(null);
  const [borrower, setBorrower] = React.useState("");
  const [repayrate, setRepayrate] = React.useState("");
  const [loanamnt, setLoanamnt] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [intrate, setIntrate] = React.useState("");
  const [progresval, setProgresval] = React.useState("");
  const [breakdown, setBreakdown] = React.useState([]);
  const [fundingfull, setFundingfull] = React.useState("");
  const [fundingpart, setFundingpart] = React.useState("");
  const [fundingcustom, setFundingcustom] = React.useState("");
  const [loanreturn, setLoanreturn] = React.useState("");
  const [fundtotal, setFundTotal] = React.useState("");
  const [fullFund, setFullFund] = React.useState(false);
  const [loanId, setLoanId] = React.useState(false);

  const isFocused = useIsFocused();

  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  //Modal
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  const setpaymeth = (selected) => {
    setPaymentmethod(selected);
  };

  // This state would determine if the drawer sheet is visible or not
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [pinModalVisible, setPinModalVisible] = useState(false);

  // Function to open the bottom sheet
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  // Function to close the bottom sheet
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };
  const handleConfirmation = async () => {
    const amountFunded = fundingcustom == "" ? fullFund ? loanamnt:fundingpart :fundingcustom;
    const fundAllowed = parseFloat(loanamnt) - parseFloat(fundtotal);
    if (parseFloat(amountFunded) > parseFloat(fundAllowed)){
      setPinModalVisible(false);
      setConfirmModalVisible(false);
      setIsBottomSheetOpen(false);
      Alert.alert("Funding failed, you are only allowd to fund $"+fundAllowed.toString()+" and below");
      return;

    }
    if (pinset == true){
      setPinModalVisible(false);
      setConfirmModalVisible(false);
      setIsBottomSheetOpen(false);
      await AsyncStorage.setItem("ToFundAmount", amountFunded);
      await AsyncStorage.setItem("ToFundLoanid", loanId.toString());
    
      navigation.navigate("TransectionPin");
    }else{
      setPinModalVisible(true);
      setConfirmModalVisible(false);
    }
  };
  const handleToSetpin = () => {
    setPinModalVisible(false);
    setConfirmModalVisible(false);
    setIsBottomSheetOpen(false);
    navigation.navigate("NewTransPin");
  };

  useEffect(() => {
    const asyncFetch = async () => {
      const asyLoanID = await AsyncStorage.getItem("LoanBorower");
      const pinIsSet = await AsyncStorage.getItem("CPINSET");

      //Call API HERE
      const apiLink = APILink.getLink();
      const asynctoken = await AsyncStorage.getItem("TOKEN");
      //console.log("Token: " + asynctoken);
      let res = await fetch(`${apiLink}/loans/${asyLoanID}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      });

      let responseJson = await res.json();

      console.log(responseJson);
      setBorrower(
        responseJson.data.user.user_profile.first_name +
          " " +
          responseJson.data.user.user_profile.first_name
      );
      setRepayrate("");
      if (pinIsSet == "Set"){
        setPinset(true);
      }
      if (pinIsSet == "NotSet"){
        setPinset(false);
      }
      setLoanamnt(responseJson.data.amount);
      setLoanId(responseJson.data.id);
      setTerm(responseJson.data.term);
      setIntrate(responseJson.data.interest_rate);
      setFundTotal(responseJson.data.total_funding);
      setProgresval("");
      setBreakdown([]);
      setFundingfull(responseJson.data.amount);
      let partPay = parseFloat(responseJson.data.amount) / 2;
      partPay = partPay.toFixed(2);
      setFundingpart(partPay);
      setLoanreturn(responseJson.data.total_loan_amount);
    };

    if (isFocused) {
      asyncFetch();
    }
  }, [props, isFocused]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <Modal
        animationType="slide"
        transparent={true}
        // We use the state here to toggle visibility of Bottom Sheet
        visible={isBottomSheetOpen}
        // We pass our function as default function to close the Modal
        onRequestClose={handleCloseBottomSheet}
      >
        <View style={[styles.bottomSheet, { height: windowHeight * 0.9 }]}>
          {/* First Section of Bottom sheet with Header and close button  */}
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "flex-start",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <TouchableOpacity onPress={handleCloseBottomSheet}>
                <Ionicons
                  name="close"
                  size={22}
                  color="#000000"
                  style={{ alignSelf: "flex-end" }}
                />
              </TouchableOpacity>
              <Text style={[styles.txtFilter, { marginLeft: "20%" }]}>
                Repayment Breakdown
              </Text>
            </View>
            <View
              style={{
                width: "98%",
                justifyContent: "flex-start",
                flexDirection: "column",
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 6,
                borderColor: "#164E6326",
                paddingHorizontal: 10,
              }}
            >
              <View style={styles.repayment}>
                <Text style={styles.txtRepayAmnt}>Z$1,000,000.00</Text>

                <Text style={styles.txtRepayDat}>26th March,2023</Text>
              </View>
              <View style={styles.repayment}>
                <Text style={styles.txtRepayAmnt}>Z$1,000,000.00</Text>

                <Text style={styles.txtRepayDat}>26th March,2023</Text>
              </View>
              <View style={styles.repayment}>
                <Text style={styles.txtRepayAmnt}>Z$1,000,000.00</Text>

                <Text style={styles.txtRepayDat}>26th March,2023</Text>
              </View>
              <View style={styles.repayment}>
                <Text style={styles.txtRepayAmnt}>Z$1,000,000.00</Text>

                <Text style={styles.txtRepayDat}>26th March,2023</Text>
              </View>
              <View style={styles.repayment}>
                <Text style={styles.txtRepayAmnt}>Z$1,000,000.00</Text>

                <Text style={styles.txtRepayDat}>26th March,2023</Text>
              </View>
              <View style={styles.repayment}>
                <Text style={styles.txtRepayAmnt}>Z$1,000,000.00</Text>

                <Text style={styles.txtRepayDat}>26th March,2023</Text>
              </View>
              <View style={styles.repayment}>
                <Text style={styles.txtRepayAmnt}>Z$1,000,000.00</Text>

                <Text style={styles.txtRepayDat}>26th March,2023</Text>
              </View>
              <View style={styles.repayment}>
                <Text style={styles.txtRepayAmnt}>Z$1,000,000.00</Text>

                <Text style={styles.txtRepayDat}>26th March,2023</Text>
              </View>
              <View style={styles.repayment}>
                <Text style={styles.txtRepayAmnt}>Z$1,000,000.00</Text>

                <Text style={styles.txtRepayDat}>26th March,2023</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => {
          setConfirmModalVisible(!confirmModalVisible);
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
                  source={require("../../../../assets/FolderWhite.png")}
                />
              </View>
              <View></View>
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
                You’re about to lend the sum of ${fundingcustom == "" ? fullFund ? loanamnt:fundingpart :fundingcustom} for {term} months
                with {intrate}% on returns.
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => handleConfirmation()}
                activeOpacity={0.7}
                style={[styles.btn, { width: "96%" }]}
              >
                <Text style={styles.btnText}>Confirm Payment</Text>
                <Image
                  style={{ width: 20, height: 18, marginLeft: 7 }}
                  source={require("../../../../assets/arrow-white.png")}
                />
                <Image
                  style={{
                    width: 20,
                    height: 18,
                    marginLeft: -18,
                    marginTop: 6,
                  }}
                  source={require("../../../../assets/arow-blue.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setConfirmModalVisible(!confirmModalVisible)}
                activeOpacity={0.7}
                style={[
                  styles.btn,
                  { width: "96%", marginTop: 5, backgroundColor: "#FFFFFF" },
                ]}
              >
                <Text style={[styles.btnText, { color: COLORS.login }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={pinModalVisible}
        onRequestClose={() => {
          setPinModalVisible(!pinModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 15,
              }}
            >
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => setPinModalVisible(!pinModalVisible)}
                >
                  <Ionicons
                    name="close"
                    size={22}
                    color="#000000"
                    style={{ alignSelf: "flex-end" }}
                  />
                </TouchableOpacity>
                <Text style={[styles.txtFilter, { marginLeft: "13%" }]}>
                  Set up a Transaction PIN
                </Text>
              </View>
              <View
                style={{
                  width: "98%",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  marginTop: 20,
                  paddingHorizontal: 10,
                }}
              ></View>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Image
                  style={{ width: 32, height: 32, marginHorizontal: 2 }}
                  source={require("../../../../assets/Star0.png")}
                />
                <Image
                  style={{ width: 32, height: 32, marginHorizontal: 2 }}
                  source={require("../../../../assets/Star0.png")}
                />
                <Image
                  style={{ width: 32, height: 32, marginHorizontal: 2 }}
                  source={require("../../../../assets/Star0.png")}
                />
                <Image
                  style={{ width: 32, height: 32, marginHorizontal: 2 }}
                  source={require("../../../../assets/Star0.png")}
                />
                <Image
                  style={{ width: 32, height: 32, marginHorizontal: 2 }}
                  source={require("../../../../assets/Star0.png")}
                />
                <Image
                  style={{ width: 32, height: 32, marginHorizontal: 2 }}
                  source={require("../../../../assets/Star0.png")}
                />
              </View>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 16,
                  fontFamily: "GeneralSansRegular",
                  color: "#040B22",
                  textAlign: "center",
                  marginTop: 15,
                  marginBottom: 25,
                }}
              >
                Before you continue, you need to set up a secure pin that you
                can also use to authorize your transactions
              </Text>
              <TouchableOpacity
                onPress={() => handleToSetpin()}
                activeOpacity={0.7}
                style={styles.btn}
              >
                <Text style={styles.btnText}>Set pin</Text>
                <Image
                  style={{ width: 24, height: 24, marginLeft: 7 }}
                  source={require("../../../../assets/privacyguard.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ImageBackground
        source={require("../../../../assets/vectorbg.png")}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scroller}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("FilteredMarket")}
                style={{ marginRight: 10, marginTop: 5, flexDirection: "row" }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../../../assets/arrow-left.png")}
                />
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
            ></View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.picview}>
              <Image
                style={{ width: 40, height: 40, marginTop: 10 }}
                source={require("../../../../assets/user.png")}
              />
            </View>
            <View style={{ marginLeft: "5%" }}>
              <Text style={styles.welcometxt}>{borrower}</Text>
              <Text style={styles.usernametxt}>
                {repayrate}% repayment rate
              </Text>
            </View>
            <View style={styles.notificationview}></View>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontFamily: "GeneralSansRegular",
                fontSize: 24,
                fontWeight: "400",
                color: "#000000",
              }}
            >
              ${" "}
              <Text
                style={{
                  fontFamily: "GeneralSansMedium",
                  fontSize: 24,
                  fontWeight: "600",
                  color: "#000000",
                }}
              >
                {loanamnt}
              </Text>
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 30, width: "100%" }}>
            <View
              style={{
                backgroundColor: "#DAFBFB",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                width: "48%",
              }}
            >
              <Text
                style={{
                  fontFamily: "GeneralSansRegular",
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#095D5D",
                  alignSelf: "flex-start",
                  marginLeft: 7,
                }}
              >
                {term} months payment plan
              </Text>
            </View>
            <View style={{ width: "48%" }}>
              <Text style={[styles.instruction, { alignSelf: "flex-end" }]}>
                {intrate}% Interest
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: 25,
            }}
          >
            <Progress.Bar
              progress={0.02}
              color={"#000000"}
              width={330}
              height={2}
            />
          </View>
          <View style={{ marginTop: 3, width: "100%" }}>
            <Text
              style={[
                styles.instruction,
                { alignSelf: "flex-end", marginRight: 13 },
              ]}
            >
              0%
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleOpenBottomSheet();
            }}
          >
            <Text
              style={{
                fontFamily: "GeneralSansRegular",
                fontSize: 14,
                fontWeight: "500",
                color: "#1435AB",
                textDecorationLine: "underline",
              }}
            >
              View Breakdown
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "GeneralSansMedium",
              fontSize: 18,
              fontWeight: "600",
              color: "#000000",
              marginTop: 30,
            }}
          >
            How do you want to Fund
          </Text>

          <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
            <View
              style={{
                width: "50%",
                alignItems: "flex-start",
              }}
            >


              <TouchableOpacity 
              onPress={()=>{
                setFullFund(!fullFund);
              }}
              style={
                    fullFund ? styles.btnSelected : styles.btnNonSelected
                  }>
                <Text
                  style={
                    fullFund ? styles.txtBtnSelectedTop : styles.txtBtnNonSelectedTop
                  }
                >
                  Full repayment
                </Text>
                <View style={{ flexDirection: "row", marginTop: 7 }}>
                  <View
                    style={ fullFund ? styles.viewSelected : styles.viewNonSelected}
                  >
                   {fullFund && <>
                    <View
                      style={{
                        backgroundColor: "#1435AB",
                        height: 17,
                        width: 17,
                        borderRadius: 10,
                      }}
                    ></View>
                   </>}
                  </View>
                  <View>
                    <Text style={ fullFund ? styles.txtBtnSelectedBtm : styles.txtBtnNonSelectedBtm}>${fundingfull}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            
            <View
              style={{
                width: "50%",
                alignItems: "flex-start",
                marginLeft: 5,
                flexDirection: "column",
              }}
            >
              <TouchableOpacity 
                onPress={()=>{
                  setFullFund(!fullFund);
                }}
              style={
                    fullFund == false? styles.btnSelected : styles.btnNonSelected
                  }>
                <Text style={
                    fullFund == false ? styles.txtBtnSelectedTop : styles.txtBtnNonSelectedTop
                  }>Part repayment</Text>
                <View style={{ flexDirection: "row", marginTop: 7 }}>
                  <View
                    style={ fullFund == false? styles.viewSelected : styles.viewNonSelected}
                  >
                    {fullFund == false&& <>
                    <View
                      style={{
                        backgroundColor: "#1435AB",
                        height: 17,
                        width: 17,
                        borderRadius: 10,
                      }}
                    ></View>
                   </>}
                  </View>
                  <View>
                    <Text style={ fullFund == false ? styles.txtBtnSelectedBtm : styles.txtBtnNonSelectedBtm}>
                      ${fundingpart}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innera}>
            <Text style={styles.label}>Custom Amount</Text>
            <View style={styles.inputContainer}>
              <TextInput
                autoCorrect={false}
                keyboardType="numeric"
                value={fundingcustom}
                onChangeText={(text) => setFundingcustom(text)}
                style={styles.textinputEnabled}
              />
            </View>
            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 18,
                fontWeight: "600",
                color: "#000000",
                marginTop: 30,
              }}
            >
              Your return is ${loanreturn}
            </Text>
          </View>
          {confirmModalVisible == false && pinModalVisible == false && (
            <TouchableOpacity
              onPress={() => setConfirmModalVisible(!confirmModalVisible)}
              activeOpacity={0.7}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Lend Money</Text>
              <Image
                style={{ width: 20, height: 18, marginLeft: 7 }}
                source={require("../../../../assets/arrow-white.png")}
              />
              <Image
                style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
                source={require("../../../../assets/arow-blue.png")}
              />
            </TouchableOpacity>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroller: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  welcometxt: {
    color: "#040B22",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },
  btnSelected: {
    height: 78,
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#1435AB",
    flexDirection: "column",
  },
  btnNonSelected: {
    height: 78,
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#030712",
    flexDirection: "column",
  },
  txtBtnSelectedTop: {
    color: "#1435AB",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
  },
  txtBtnNonSelectedTop: {
    color: "#030712",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
  },
  txtBtnSelectedBtm: {
    color: "#1435AB",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
    marginLeft: 10,
  },
  txtBtnNonSelectedBtm: {
    color: "#030712",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
    marginLeft: 10,
  },
  instruction: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 5,
  },
  innera: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 12,
    fontWeight: "500",
    color: "#040B22",
  },
  inputContainer: {
    height: 55,
    backgroundColor: "#F0F2FA",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#D0D7EE",
  },
  textinputEnabled: {
    fontSize: 16,
    fontWeight: "600",
    color: "#040B22",
    flex: 1,
  },
  btn: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.signed,
    marginTop: 60,
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
  },
  bottomSheet: {
    position: "absolute",
    left: 3,
    right: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    bottom: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#F0F2FA",
  },
  txtFilter: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
  },
  repayment: {
    marginTop: 16,
    paddingVertical: 5,
  },
  txtRepayAmnt: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
  },
  txtRepayDat: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "GeneralSansRegular",
  },
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
  viewSelected: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#1435AB",
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  viewNonSelected: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#030712",
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default SelectedBorrower;
