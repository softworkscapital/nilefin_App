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
  Alert
} from "react-native";
import { useFonts } from "expo-font";
import {
  Ionicons,
  SimpleLineIcons,
  EvilIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import COLORS from "../../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import APILink from "../../../constants/globals";

const LoanMarket = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [loans, setLoans] = useState([]);
  const [filtredloans, setFilteredLoans] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [usertype, setUsertype] = useState("");

  const isFocused = useIsFocused();

  const saveLoanId = async (loanid, clientid) => {
    const usrid = await AsyncStorage.getItem("CIDID");
    if (usrid == clientid) {
      Alert.alert("Proceeding failed. You can not fund your own loan.");
      return;
    }
    await AsyncStorage.setItem("LoanBorower", loanid);
    navigation.navigate("SelectedBorrower");
  };

  const OneItem = ({
    id,
    userid,
    borrower,
    status,
    repayment,
    amount,
    interest_rate,
    term,
    fundtotal
  }) => (
    <View style={styles.loanItem}>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View style={styles.rw1Inner1}>
          <Text style={styles.txtBorrower}>{borrower}</Text>
          <Text style={styles.txtRepayment}>{repayment} % repayment rate</Text>
        </View>
        <View style={styles.rw1Inner2}>
          {status == "Loan Insured" && (
            <View
              style={{
                width: "90%",
                backgroundColor: "#E0FCFF",
                flexDirection: "row",
                borderRadius: 4,
                paddingHorizontal: 6,
                paddingVertical: 4,
                marginTop: -30,
              }}
            >
              <EvilIcons name="tag" size={25} style={styles.tag} />
              <Text
                style={{
                  color: "#164E63",
                  fontSize: 12,
                  fontWeight: "500",
                  fontFamily: "GeneralSansRegular",
                  marginTop: 5,
                }}
              >
                {status}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "#999999",
          width: "90%",
          marginLeft: 15,
          marginTop: 10,
        }}
      ></View>
      <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
        <View style={styles.rw1Inner1}>
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
              {amount}
            </Text>
          </Text>
        </View>
        <View style={styles.rw1Inner2}>
          <Text
            style={{
              fontFamily: "GeneralSansMedium",
              fontSize: 14,
              fontWeight: "500",
              color: "#000000",
            }}
          >
            {interest_rate}% Interest
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
        <View style={styles.rw1Inner1}>
          <Text
            style={{
              fontFamily: "GeneralSansRegular",
              fontSize: 24,
              fontWeight: "400",
              color: "#000000",
            }}
          >

            <Text
              style={{
                fontFamily: "GeneralSansMedium",
                fontSize: 16,
                fontWeight: "600",
                color: "#000000",
              }}
            >
              Funded ${" "}{fundtotal}
            </Text>
          </Text>
        </View>
        <View style={styles.rw1Inner2}>
          <Text
            style={{
              fontFamily: "GeneralSansMedium",
              fontSize: 16,
              fontWeight: "600",
              color: "#000000",
            }}
          >
            Balance ${" "}{parseFloat(amount) - parseFloat(fundtotal)}
          </Text>
        </View>
      </View>


      <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
        <View
          style={[
            styles.rw1Inner1,
            {
              backgroundColor: "#DAFBFB",
              marginLeft: 15,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text
            style={{
              fontFamily: "GeneralSansRegular",
              fontSize: 14,
              fontWeight: "500",
              color: "#095D5D",
            }}
          >
            {term} months payment plan
          </Text>
        </View>
        <View style={styles.rw1Inner2}></View>
      </View>
      <TouchableOpacity
        onPress={() => saveLoanId(id, userid)}
        style={{
          flexDirection: "row",
          marginTop: 15,
          width: "99.9%",
          backgroundColor: "#F0F2FA",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 15,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
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
          View Loan Details
        </Text>
        <MaterialCommunityIcons
          name="arrow-right-thin"
          size={25}
          style={styles.arow}
        />
      </TouchableOpacity>
    </View>
  );

  const loadFilters = async () => {
    //Clear Selected First
    try {
      await AsyncStorage.removeItem("MktPurpose");
      await AsyncStorage.removeItem("MktInsured");

      await AsyncStorage.removeItem("MktLAmount");
      await AsyncStorage.removeItem("MktHAmount");

      await AsyncStorage.removeItem("MktLTerm");
      await AsyncStorage.removeItem("MktHTerm");

      await AsyncStorage.removeItem("MktLIntrest");
      await AsyncStorage.removeItem("MktHIntrest");
    } catch (exception) {
      console.log("Clearing failed");
    }
    navigation.navigate("Markers");
  };
  const renderItem = ({ item }) => (
    <OneItem
      id={item.id}
      userid={item.user.client_id}
      borrower={
        item.user.user_profile.first_name +
        " " +
        item.user.user_profile.last_name
      }
      status={item.status}
      repayment={item.repayment}
      amount={item.amount}
      interest_rate={item.interest_rate}
      term={item.term}
      fundtotal={item.total_funding}
      opened={item.opened}
    />
  );

  useEffect(() => {
    const asyncFetch = async () => {
      //Call API HERE
      const apiLink = APILink.getLink();
      const asynctoken = await AsyncStorage.getItem("TOKEN");
      const usr = await AsyncStorage.getItem("USRTYPE");

      let res = await fetch(`${apiLink}/loans/marketplaces?page=1`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      });

      let responseJson = await res.json();
      console.log("data" + responseJson.data);
      setFilteredLoans(responseJson.data);
      setLoans(responseJson.data);
      setUsertype(usr);
    };

    if (isFocused) {
      asyncFetch();
    }
  }, [props, isFocused]);

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
        <View style={{ flex: 9 }}>
          <Text style={styles.welcometxt}>Loan Market</Text>
          <View style={styles.topView}>
            <View style={styles.innera}>
              <View style={styles.inputContainer}>
                <View style={styles.inneraview}>
                  <Ionicons
                    name="search-outline"
                    size={25}
                    style={styles.innerviewsimg}
                  />
                </View>
                <TextInput
                  autoCorrect={false}
                  placeholder="Search"
                  placeholderTextColor="#999999"
                  value={searchkey}
                  onChangeText={(text) => setSearchkey(text)}
                  style={styles.textinput}
                />
              </View>
            </View>
            <View style={styles.innermid}></View>
            <TouchableOpacity
              onPress={() => {
                loadFilters();
              }}
              style={styles.innerb}
            >
              <SimpleLineIcons name="equalizer" size={25} style={styles.equa} />
            </TouchableOpacity>
          </View>

          <View style={styles.loansView}>
            {loans && (
              <FlatList
                data={loans}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
                contentContainerStyle={{ paddingBottom: 200 }}
              />
            )}
          </View>
        </View>






        <View style={styles.footer}>
                    <TouchableOpacity
                                onPress={() => navigation.navigate("FirstTimeWelcome2")} >
                        <View style={styles.tabview}>
                            <Image
                                style={{ width: 28, height: 28, marginTop: 3 }}
                                source={require("../../../../assets/tabnavigator/homeblack.png")}
                            />
                        </View>
                        <View style={styles.tabtextview}>
                            <Text style={styles.tabtext}>Home</Text>
                        </View>
                    </TouchableOpacity>
        
                        
                            <TouchableOpacity
                                onPress={() => navigation.navigate("LoanMarket")} >
                                 <View style={styles.tabview}>
                                    <Image
                                        style={{ width: 28, height: 28, marginTop: 3 }}
                                        source={require("../../../../assets/tabnavigator/marketblue.png")}
                                    />
                                </View>
                                <View style={styles.tabtextview}>
                                    <Text style={styles.tabtextselected}>Market</Text>
                                </View>
                            </TouchableOpacity>
                  
        
                
                    <TouchableOpacity
                        onPress={() => navigation.navigate("MyLoans")
                        }
                    >
                        <View style={styles.tabview}>
                            <Image
                                style={{ width: 28, height: 28, marginTop: 3 }}
                                source={require("../../../../assets/tabnavigator/loanblack.png")}
                            />
                        </View>
                        <View style={styles.tabtextview}>
                            <Text style={styles.tabtext}>Loans</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("FundWallet")}>
                        <View style={styles.tabview}>
                            <Image
                                style={{ width: 28, height: 28, marginTop: 3 }}
                                source={require("../../../../assets/tabnavigator/historyblack.png")}
                            />
                        </View>
                        <View style={styles.tabtextview}>
                            <Text style={styles.tabtext}>Wallet</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Kyc")}>
                        <View style={styles.tabview}>
                            <Image
                                style={{ width: 28, height: 28, marginTop: 3 }}
                                source={require("../../../../assets/tabnavigator/accountblack.png")}
                            />
                        </View>
                        <View style={styles.tabtextview}>
                            <Text style={styles.tabtext}>My Account</Text>
                        </View>
                    </TouchableOpacity>

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
  topView: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
  },
  innera: {
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
  },
  innermid: {
    marginTop: 20,
    marginBottom: 20,
    width: "6%",
  },
  innerb: {
    marginTop: 20,
    marginBottom: 20,
    width: "14%",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#E4E4E7",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  equa: {
    color: "#999999",
  },
  tag: {
    color: "#164E63",
  },
  arow: {
    color: "#1435AB",
    marginTop: 5,
  },
  inputContainer: {
    height: 55,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#E4E4E7",
    width: "100%",
  },
  inneraview: {
    marginTop: 4,
  },
  innerviewsimg: {
    marginRight: 10,
    marginTop: 10,
  },
  textinput: {
    color: "#040B22",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  loansView: {
    width: "100%",
    marginTop: 20,
  },
  loanItem: {
    flexDirection: "column",
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: "#999999",
    height: 221,
    marginTop: 20,
  },
  rw1Inner1: {
    width: "60%",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 15,
    paddingVertical: 5,
  },
  txtBorrower: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "GeneralSansMedium",
  },
  txtRepayment: {
    color: "#292929",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "GeneralSansRegular",
  },
  rw1Inner2: {
    width: "40%",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 15,
    paddingVertical: 5,
  },
  footer: {
    flex: 1,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  tabtextview: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabtext: {
    color: "#6B7280",
    fontWeight: "500",
    fontSize: 14,
  },
  tabtextselected: {
    color: "#1435AB",
    fontWeight: "500",
    fontSize: 14,
  },
  tabview: {
    margin: 2,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tabviewselected: {
    margin: 2,
    padding: 10,
    backgroundColor: "#1435AB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoanMarket;
