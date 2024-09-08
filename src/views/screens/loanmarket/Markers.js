import React, { useEffect, useState, useCallback } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import {
  Ionicons,
  SimpleLineIcons,
  EvilIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import COLORS from "../../../constants/colors";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import APILink from "../../../constants/globals";
import RangeSlider from "rn-range-slider";
import { AntDesign } from "react-native-vector-icons";

const Markers = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [loans, setLoans] = useState([]);
  const [filtredloans, setFilteredLoans] = useState([]);
  const [searchkey, setSearchkey] = useState("");

  const [loanPurpose, setLoanPurpose] = useState("");

  const [insured, setInsured] = useState(true);

  const [lowamnt, setLowamnt] = useState(0);
  const [highamnt, setHighamnt] = useState(0);

  const [lowterm, setLowterm] = useState(0);
  const [highterm, setHighterm] = useState(0);

  const [lowintrest, setLowintrest] = useState(0);
  const [highintrest, setHighintrest] = useState(0);

  const isFocused = useIsFocused();

  const Thumb = () => {
    return (
      <View
        style={{
          backgroundColor: "#1435AB",
          height: 20,
          width: 20,
          borderRadius: 10,
        }}
      ></View>
    );
  };
  const Rail = () => {
    return (
      <View
        style={{ backgroundColor: "#E6E6E6", height: 5, width: "100%" }}
      ></View>
    );
  };
  const RailSelected = () => {
    return <View style={{ backgroundColor: "#1435AB", height: 5 }}></View>;
  };
  const Label = () => {
    return <Text style={{ color: "#1435AB" }}></Text>;
  };
  const Notch = () => {
    return <AntDesign name="caretdown" size={25} style={styles.equa} />;
  };



  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleAmountChange = useCallback((low, high) => {
    setLowamnt(low);
    setHighamnt(high);
  }, []);
  const handleMonthChange = useCallback((low, high) => {
    setLowterm(low);
    setHighterm(high);
  }, []);
  const handleIntrestChange = useCallback((low, high) => {
    setLowintrest(low);
    setHighintrest(high);
  }, []);

  useEffect(() => {
    const asyncFetch = async () => {
      //Call API HERE
      const apiLink = APILink.getLink();
      const asynctoken = await AsyncStorage.getItem("TOKEN");

      let res = await fetch(`${apiLink}/loans?page=1`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      });

      let responseJson = await res.json();
      console.log(responseJson.data);
      setFilteredLoans(responseJson.data);
      setLoans(responseJson.data);
    };

    if (isFocused) {
      asyncFetch();
    }
  }, [props, isFocused]);

  // const resetFilters = () => {
  //   navigation.navigate("Markers");
  // };

  const INITIAL_LOAN_AMOUNT = { low: 100, high: 20000 }; // Example initial values
  const INITIAL_LOAN_TERM = { low: 1, high: 12 }; // Example initial values
  const INITIAL_INTEREST_RATE = { low: 5, high: 20 }; // Example initial values

  const resetFilters = () => {
    setLoanPurpose(""); // Reset loan purpose
    setInsured(true); // Reset insured state
    handleAmountChange(INITIAL_LOAN_AMOUNT.low, INITIAL_LOAN_AMOUNT.high); // Reset loan amount sliders
    handleMonthChange(INITIAL_LOAN_TERM.low, INITIAL_LOAN_TERM.high); // Reset loan term sliders
    handleIntrestChange(INITIAL_INTEREST_RATE.low, INITIAL_INTEREST_RATE.high); // Reset interest rate sliders
    navigation.navigate("Markers");

    window.location.reload();
  };



  const handleMoveToFiltered = async () => {
    await AsyncStorage.setItem("MktPurpose", loanPurpose == "" ? "Nothing" : loanPurpose);
    await AsyncStorage.setItem(
      "MktInsured",
      insured ? "Insured" : "NotInsured"
    );

    await AsyncStorage.setItem("MktLAmount", lowamnt.toString());
    await AsyncStorage.setItem("MktHAmount", highamnt.toString());

    await AsyncStorage.setItem("MktLTerm", lowterm.toString());
    await AsyncStorage.setItem("MktHTerm", highterm.toString());

    await AsyncStorage.setItem("MktLIntrest", lowintrest.toString());
    await AsyncStorage.setItem("MktHIntrest", highintrest.toString());

    navigation.navigate("FilteredMarket");
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
        <View style={{ flex: 1 }}>
          <Text style={styles.welcometxt}>Loan Market</Text>

          <View style={styles.bottomSheet}>
            {/* First Section of Bottom sheet with Header and close button  */}
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                marginTop: 20,
                justifyContent: "flex-start",
              }}
            >
              <View
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("LoanMarket")}
                >
                  <Ionicons
                    name="close"
                    size={22}
                    color="#000000"
                    style={{ alignSelf: "flex-end" }}
                  />
                </TouchableOpacity>
                <Text style={styles.txtFilter}>Filters</Text>
                <TouchableOpacity onPress={() => resetFilters()}>
                  <Text style={styles.txtReset}>Reset all</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 0,
                width: "100%",
                justifyContent: "flex-start",
                flexDirection: "row",
                marginTop: 20,
                marginBottom: 25,
              }}
            >
              <Text style={styles.txtFilter}>Loan Purpose</Text>
            </View>
            <View style={{ width: "100%" }}>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  onValueChange={(text) => setLoanPurpose(text)}
                  items={[
                    {
                      label: "Major Purchases",
                      value: "major purchases",
                      key: 1,
                    },
                    { label: "School Fees", value: "school fees", key: 2 },
                    { label: "Investing", value: "investing", key: 3 },
                    {
                      label: "Renovations",
                      value: "renovations",
                      key: 4,
                    },
                    {
                      label: "Debt Consolidation",
                      value: "debt consolidation",
                      key: 5,
                    },
                    {
                      label: "Business Ventures",
                      value: "business ventures",
                      key: 6,
                    },
                  ]}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0,
                width: "100%",
                justifyContent: "flex-start",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Text style={[styles.txtFilter]}>Loan State</Text>
            </View>
            <View
              style={{
                flex: 0,
                width: "100%",
                justifyContent: "flex-start",
                flexDirection: "row",
                marginTop: 40,
              }}
            >
              <View style={{ width: "35%" }}>
                <TouchableOpacity
                  onPress={() => setInsured(!insured)}
                  style={
                    insured
                      ? {
                        width: "100%",
                        backgroundColor: "#1435AB",
                        height: 36,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                      }
                      : {
                        width: "100%",
                        backgroundColor: "#F5F5F5",
                        height: 36,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                      }
                  }
                >
                  <Text
                    style={
                      insured
                        ? {
                          fontSize: 16,
                          fontWeight: "500",
                          fontFamily: "GeneralSansRegular",
                          color: "#FFFFFF",
                        }
                        : {
                          fontSize: 16,
                          fontWeight: "500",
                          fontFamily: "GeneralSansRegular",
                          color: "#000000",
                        }
                    }
                  >
                    Loan Insured
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: "40%" }}>
                <TouchableOpacity
                  onPress={() => setInsured(!insured)}
                  style={
                    insured == false
                      ? {
                        width: "100%",
                        backgroundColor: "#1435AB",
                        height: 36,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        marginLeft: 5,
                      }
                      : {
                        width: "100%",
                        backgroundColor: "#F5F5F5",
                        height: 36,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        marginLeft: 5,
                      }
                  }
                >
                  <Text
                    style={
                      insured == false
                        ? {
                          fontSize: 16,
                          fontWeight: "500",
                          fontFamily: "GeneralSansRegular",
                          color: "#FFFFFF",
                        }
                        : {
                          fontSize: 16,
                          fontWeight: "500",
                          fontFamily: "GeneralSansRegular",
                          color: "#000000",
                        }
                    }
                  >
                    Loan Not Insured
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "60%", marginTop: 30 }}>
                <Text style={styles.txtFilter}>Loan Amount</Text>
              </View>
              <View
                style={{
                  width: "40%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    fontFamily: "GeneralSansRegular",
                    color: "#000000",
                    alignSelf: "flex-end",
                  }}
                >
                  ${lowamnt}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    fontFamily: "GeneralSansRegular",
                    color: "#000000",
                    alignSelf: "flex-end",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    fontFamily: "GeneralSansRegular",
                    color: "#000000",
                    alignSelf: "flex-end",
                  }}
                >
                  ${highamnt}
                </Text>
              </View>
            </View>

            <View style={{ width: "100%", marginTop: 17 }}>
              <RangeSlider
                min={100}
                max={20000}
                step={1}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
                onValueChanged={handleAmountChange}
              />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <View style={{ width: "50%", justifyContent: "flex-start" }}>
                <Text style={styles.txtFilter}>Loan Term</Text>
              </View>
              <View style={{ width: "50%", justifyContent: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    fontFamily: "GeneralSansRegular",
                    color: "#000000",
                    alignSelf: "flex-end",
                  }}
                >
                  {lowterm}-{highterm} Months
                </Text>
              </View>
            </View>

            <View style={{ width: "100%", marginTop: 10 }}>
              <RangeSlider
                min={1}
                max={12}
                step={1}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
                onValueChanged={handleMonthChange}
              />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <View style={{ width: "50%", justifyContent: "flex-start" }}>
                <Text style={styles.txtFilter}>Interest Rate</Text>
              </View>
              <View style={{ width: "50%", justifyContent: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    fontFamily: "GeneralSansRegular",
                    color: "#000000",
                    alignSelf: "flex-end",
                  }}
                >
                  {lowintrest} - {highintrest} %
                </Text>
              </View>
            </View>

            <View style={{ width: "100%", marginTop: 10 }}>
              <RangeSlider
                min={5}
                max={20}
                step={1}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
                onValueChanged={handleIntrestChange}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleMoveToFiltered()}
              activeOpacity={0.7}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
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
    color: "#000000",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 20,
    fontFamily: "GeneralSansMedium",
  },
  equa: {
    color: "#999999",
  },
  bottomSheet: {
    left: 3,
    right: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    bottom: 6,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: "#F0F2FA",
  },
  txtFilter: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
  },
  txtReset: {
    color: "#737373",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "GeneralSansRegular",
  },
  selectContainer: {
    height: 55,
    backgroundColor: "#F0F2FA",
    paddingHorizontal: 2,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "#D0D7EE",
  },
  btn: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.signed,
    marginTop: 40,
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
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "GeneralSansMedium",
  }
});

export default Markers;
