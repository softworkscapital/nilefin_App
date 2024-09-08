import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
import { useFonts } from "expo-font";
import {
  Ionicons,
  SimpleLineIcons,
  EvilIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "react-native-vector-icons";
import COLORS from "../../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import APILink from "../../../constants/globals";

const FilteredMarket = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const saveLoanId = async (loanid)=>{
    await AsyncStorage.setItem('LoanBorower', loanid);
    navigation.navigate('SelectedBorrower');
  }

  const [loans, setLoans] = useState([]);
  const [filtredloans, setFilteredLoans] = useState([]);
  const [btnarray, setBtnarray] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [usertype, setUsertype] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [insured, setInsured] = useState("");
  const [lowamnt, setLowamnt] = useState(0);
  const [highamnt, setHighamnt] = useState(0);
  const [lowterm, setLowterm] = useState(0);
  const [highterm, setHighterm] = useState(0);
  const [lowintrest, setLowintrest] = useState(0);
  const [highintrest, setHighintrest] = useState(0);

  const isFocused = useIsFocused();

  const OneItem = ({
    id,
    borrower,
    status,
    repayment,
    amount,
    interest_rate,
    term,
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
      onPress={()=>saveLoanId(id)}
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

  const renderItem = ({ item }) => (
    <OneItem
      id={item.id}
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
      opened={item.opened}
    />
  );

  const BtnItem = ({ id, btn, lowval, highval }) => (
    <TouchableOpacity
      onPress={() => masterFilter(btn)}
      style={{
        flexDirection: "column",
        width: "48%",
        paddingHorizontal: 5,
        marginVertical: 5,
      }}
    >
      <>
        <Text
          style={
            btn != "Clear"
              ? {
                  color: "#1435AB90",
                  fontSize: 12,
                  fontWeight: "500",
                  alignSelf: "center",
                }
              : {
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: "500",
                  alignSelf: "center",
                }
          }
        >
          {btn}
        </Text>
        <View
          style={
            btn == "Clear"
              ? {
                  height: 32,
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }
              : {
                  height: 32,
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#1435AB",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }
          }
        >
          <Text
            style={
              btn == "Clear"
                ? {
                    color: "red",
                    fontSize: 14,
                    fontWeight: "500",
                  }
                : {
                    color: "#1435AB",
                    fontSize: 14,
                    fontWeight: "500",
                  }
            }
          >
            {btn == "Purpose" && lowval}
            {btn == "Insured" && lowval}
            {btn == "Amount" &&
              "$" + lowval.toString() + " - $" + highval.toString()}
            {btn == "Term" &&
              lowval.toString() + " - " + highval.toString() + " Months"}
            {btn == "Intrest" &&
              lowval.toString() + " - " + highval.toString() + " %"}
            {btn == "Clear" && lowval}
          </Text>
          <AntDesign
            name="close"
            size={16}
            color={btn == "Clear" ? "red" : "#1435AB"}
            style={{ marginTop: 3, marginLeft: 7 }}
          />
        </View>
      </>
    </TouchableOpacity>
  );

  useEffect(() => {
    const asyncFetch = async () => {
      const asyMktPurpose = await AsyncStorage.getItem("MktPurpose");
      const asyMktInsured = await AsyncStorage.getItem("MktInsured");
      const asyMktLAmount = await AsyncStorage.getItem("MktLAmount");
      const asyMktHAmount = await AsyncStorage.getItem("MktHAmount");
      const asyMktLTerm = await AsyncStorage.getItem("MktLTerm");
      const asyMktHTerm = await AsyncStorage.getItem("MktHTerm");
      const asyMktLIntrest = await AsyncStorage.getItem("MktLIntrest");
      const asyMktHIntrest = await AsyncStorage.getItem("MktHIntrest");
      const usr = await AsyncStorage.getItem("USRTYPE");
      setUsertype(usr);
      let btnTempArray = [];
      let pushObj = {};
      if (asyMktPurpose != "Nothing") {
        setLoanPurpose(asyMktPurpose);
        pushObj = {
          id: 1,
          btn: "Purpose",
          lowval: asyMktPurpose,
          highval: asyMktPurpose,
        };
        btnTempArray.push(pushObj);
        console.log("Purpose found: " + asyMktPurpose);
      } else {
        console.log("No purpose found");
      }
      if (asyMktInsured) {
        setInsured(asyMktInsured);
        pushObj = {
          id: 2,
          btn: "Insured",
          lowval: asyMktInsured,
          highval: asyMktInsured,
        };
        btnTempArray.push(pushObj);
        console.log("Insured found: " + asyMktInsured);
      } else {
        console.log("No insured found");
      }

      //Amount
      if (asyMktLAmount) {
        setLowamnt(asyMktLAmount);
        console.log("Low amnt found: " + asyMktLAmount);
      } else {
        console.log("No low amnt found");
      }
      if (asyMktHAmount) {
        setHighamnt(asyMktHAmount);
        pushObj = {
          id: 3,
          btn: "Amount",
          lowval: asyMktLAmount,
          highval: asyMktHAmount,
        };
        btnTempArray.push(pushObj);
        console.log("High amnt found: " + asyMktHAmount);
      } else {
        console.log("No high amnt found");
      }

      //Term
      if (asyMktLTerm) {
        setLowterm(asyMktLTerm);
        console.log("Low term found: " + asyMktLTerm);
      } else {
        console.log("No low term found");
      }
      if (asyMktHTerm) {
        setHighterm(asyMktHTerm);
        pushObj = {
          id: 4,
          btn: "Term",
          lowval: asyMktLTerm,
          highval: asyMktHTerm,
        };
        btnTempArray.push(pushObj);
        console.log("High term found: " + asyMktHTerm);
      } else {
        console.log("No high term found");
      }

      //Intrest
      if (asyMktLIntrest) {
        setLowintrest(asyMktLIntrest);
        console.log("Low intrest found: " + asyMktLIntrest);
      } else {
        console.log("No low term found");
      }
      if (asyMktHIntrest) {
        setHighintrest(asyMktHIntrest);
        pushObj = {
          id: 5,
          btn: "Intrest",
          lowval: asyMktLIntrest,
          highval: asyMktHIntrest,
        };
        btnTempArray.push(pushObj);
        console.log("High intrest found: " + asyMktHIntrest);
      } else {
        console.log("No high intrest found");
      }

      pushObj = {
        id: 7,
        btn: "Clear",
        lowval: "Clear All",
        highval: "Clear All",
      };
      btnTempArray.push(pushObj);

      setBtnarray(btnTempArray);
      console.log("btn arr" + btnTempArray);

      //Call API HERE
      const apiLink = APILink.getLink();
      const asynctoken = await AsyncStorage.getItem("TOKEN");
      //console.log("Token: " + asynctoken);
      let res = await fetch(`${apiLink}/loans?page=1`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      });

      let responseJson = await res.json();

      //var loansArr = responseJson.data.filter(item =>item.age === 25 && item.purpose === 'John');
let loansArr =[];
      //Filter Purpose
      if (asyMktPurpose != "") {
        loansArr = responseJson.data.filter(
          (item) => item.purpose == asyMktPurpose
        );
      }
      //if (asyMktInsured != "") {
      //Filter Insured
      // if (asyMktInsured == "Insured") {
      //   loansArr = loansArr.filter((item) => item.is_insured == true);
      // }else{
      //   loansArr = loansArr.filter((item) => item.is_insured == false);
      // }
      // }

      //Filter Amount
      if (
        asyMktLAmount != null ||
        asyMktLAmount != undefined ||
        asyMktLAmount != ""
      ) {
      console.log("ggghhhhjkkkkk")
        loansArr = loansArr.filter(
          (item) =>
            parseFloat(item.amount) >= asyMktLAmount &&
            parseFloat(item.amount) <= asyMktHAmount
        );
      }

      //Filter Term
      if (
        asyMktLTerm != null ||
        asyMktLTerm != undefined ||
        asyMktLTerm != ""
      ) {
        loansArr = loansArr.filter(
          (item) =>
            parseInt(item.term) >= asyMktLTerm &&
            parseInt(item.term) <= asyMktHTerm
        );
      }
      //Filter Intrest Rate
      if (
        asyMktLIntrest != null ||
        asyMktLIntrest != undefined ||
        asyMktLIntrest != ""
      ) {
        loansArr = loansArr.filter(
          (item) =>
            parseInt(item.interest_rate) >= asyMktLIntrest &&
            parseInt(item.interest_rate) <= asyMktHIntrest
        );
      }
      //console.log(loansArr);

      setFilteredLoans(loansArr);
      setLoans(responseJson.data);
    };

    if (isFocused) {
      asyncFetch();
    }
  }, [props, isFocused]);

  const masterFilter = async (filtBy) => {
    //Filter Buttons

    if (filtBy == "Purpose") {
      await AsyncStorage.removeItem("MktPurpose");
      setLoanPurpose("");

      let loansArr = [];

      //Filter Insured
      // if (asyMktInsured == "Insured") {
      //   loansArr = loansArr.filter((item) => item.is_insured == true);
      // }else{
      //   loansArr = loansArr.filter((item) => item.is_insured == false);
      // }

      //Filter Amount
      loansArr = loans.filter(
        (item) =>
          parseFloat(item.amount) >= lowamnt &&
          parseFloat(item.amount) <= highamnt
      );

      //Filter Term
      loansArr = loansArr.filter(
        (item) =>
          parseInt(item.term) >= lowterm && parseInt(item.term) <= highterm
      );

      //Filter Intrest Rate
      loansArr = loansArr.filter(
        (item) =>
          parseInt(item.interest_rate) >= lowintrest &&
          parseInt(item.interest_rate) <= highintrest
      );

      console.log(loansArr);
      setFilteredLoans(loansArr);
    } else if (filtBy == "Term") {
      await AsyncStorage.removeItem("MktLTerm");
      await AsyncStorage.removeItem("MktHTerm");
      setLowterm(0);
      setHighterm(0);
      let loansArr = [];

      //Filter Purpose
      loansArr = loans.filter((item) => item.purpose == loanPurpose);

      //Filter Insured
      // if (asyMktInsured == "Insured") {
      //   loansArr = loansArr.filter((item) => item.is_insured == true);
      // }else{
      //   loansArr = loansArr.filter((item) => item.is_insured == false);
      // }

      //Filter Amount
      loansArr = loansArr.filter(
        (item) =>
          parseFloat(item.amount) >= lowamnt &&
          parseFloat(item.amount) <= highamnt
      );

      //Filter Intrest Rate
      loansArr = loansArr.filter(
        (item) =>
          parseInt(item.interest_rate) >= lowintrest &&
          parseInt(item.interest_rate) <= highintrest
      );

      console.log(loansArr);
      setFilteredLoans(loansArr);
    } else if (filtBy == "Intrest") {
      await AsyncStorage.removeItem("MktLIntrest");
      await AsyncStorage.removeItem("MktHIntrest");
      setLowintrest(0);
      setHighintrest(0);
      let loansArr = [];
      loansArr = loans;

      //Filter Purpose
      loansArr = loansArr.filter((item) => item.purpose == loanPurpose);

      //Filter Insured
      // if (asyMktInsured == "Insured") {
      //   loansArr = loansArr.filter((item) => item.is_insured == true);
      // }else{
      //   loansArr = loansArr.filter((item) => item.is_insured == false);
      // }

      //Filter Amount
      loansArr = loansArr.filter(
        (item) =>
          parseFloat(item.amount) >= lowamnt &&
          parseFloat(item.amount) <= highamnt
      );

      //Filter Term
      loansArr = loansArr.filter(
        (item) =>
          parseInt(item.term) >= lowterm && parseInt(item.term) <= highterm
      );

      console.log(loansArr);
      setFilteredLoans(loansArr);
    } else if (filtBy == "Insured") {
      await AsyncStorage.removeItem("MktInsured");
      setInsured("");
      let loansArr = [];
      loansArr = loans;

      //Filter Purpose
      loansArr = loansArr.filter((item) => item.purpose == loanPurpose);

      //Filter Amount
      loansArr = loansArr.filter(
        (item) =>
          parseFloat(item.amount) >= lowamnt &&
          parseFloat(item.amount) <= highamnt
      );

      //Filter Term
      loansArr = loansArr.filter(
        (item) =>
          parseInt(item.term) >= lowterm && parseInt(item.term) <= highterm
      );

      //Filter Intrest Rate
      loansArr = loansArr.filter(
        (item) =>
          parseInt(item.interest_rate) >= lowintrest &&
          parseInt(item.interest_rate) <= highintrest
      );

      console.log(loansArr);
      setFilteredLoans(loansArr);
    } else if (filtBy == "Amount") {
      await AsyncStorage.removeItem("MktLAmount");
      await AsyncStorage.removeItem("MktHAmount");
      setLowamnt(0);
      setHighamnt(0);
      let loansArr = [];
      loansArr = loans;

      //Filter Purpose
      loansArr = loansArr.filter((item) => item.purpose == loanPurpose);

      //Filter Insured
      // if (asyMktInsured == "Insured") {
      //   loansArr = loansArr.filter((item) => item.is_insured == true);
      // }else{
      //   loansArr = loansArr.filter((item) => item.is_insured == false);
      // }

      //Filter Term
      loansArr = loansArr.filter(
        (item) =>
          parseInt(item.term) >= lowterm && parseInt(item.term) <= highterm
      );

      //Filter Intrest Rate
      loansArr = loansArr.filter(
        (item) =>
          parseInt(item.interest_rate) >= lowintrest &&
          parseInt(item.interest_rate) <= highintrest
      );

      console.log(loansArr);
      setFilteredLoans(loansArr);
    } else if (filtBy == "All") {
      await AsyncStorage.removeItem("MktPurpose");
      await AsyncStorage.removeItem("MktInsured");

      await AsyncStorage.removeItem("MktLAmount");
      await AsyncStorage.removeItem("MktHAmount");

      await AsyncStorage.removeItem("MktLTerm");
      await AsyncStorage.removeItem("MktHTerm");

      await AsyncStorage.removeItem("MktLIntrest");
      await AsyncStorage.removeItem("MktHIntrest");
      setLoanPurpose("");
      setLowterm(0);
      setHighterm(0);
      setLowintrest(0);
      setHighintrest(0);
      setInsured("");
      setLowamnt(0);
      setHighamnt(0);

      setFilteredLoans(loans);
    }

    let tmpBtns = [];
    tmpBtns = btnarray.filter((item) => item.btn != filtBy);
    setBtnarray(tmpBtns);
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
              onPress={() => navigation.navigate("Markers")}
              style={styles.innerb}
            >
              <SimpleLineIcons name="equalizer" size={25} style={styles.equa} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <FlatList
              data={btnarray}
              renderItem={({ item }) => (
                <BtnItem
                  id={item.id}
                  btn={item.btn}
                  lowval={item.lowval}
                  highval={item.highval}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            {/* TempOld Buttons */}
          </View>

          <View style={styles.loansView}>
            {filtredloans && (
              <FlatList
                data={filtredloans}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
                contentContainerStyle={{ paddingBottom: 350 }}
              />
            )}
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("FirstTimeWelcome")}
          >
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
          {usertype == "lender" && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoanMarket")}
              >
                <View style={styles.tabviewselected}>
                  <Image
                    style={{ width: 28, height: 28, marginTop: 3 }}
                    source={require("../../../../assets/tabnavigator/marketblue.png")}
                  />
                </View>
                <View style={styles.tabtextview}>
                  <Text style={styles.tabtextselected}>Market</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("LoanRepay")}>
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
          <View>
            <View style={styles.tabview}>
              <Image
                style={{ width: 28, height: 28, marginTop: 3 }}
                source={require("../../../../assets/tabnavigator/historyblack.png")}
              />
            </View>
            <View style={styles.tabtextview}>
              <Text style={styles.tabtext}>History</Text>
            </View>
          </View>
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
    flexDirection: "row",
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

export default FilteredMarket;
