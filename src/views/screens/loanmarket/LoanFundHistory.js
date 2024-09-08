import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import COLORS from "../../../constants/colors";

const jsonData = [
  {
    id: 1,
    issue: "Wallet Funding",
    date: "12-07-2023",
  },
  {
    id: 2,
    issue: "Wallet Funding",
    date: "14-07-2023",
  },
  {
    id: 3,
    issue: "Loan Funding",
    date: "10-08-2023",
  },
  {
    id: 4,
    issue: "Loan Funding",
    date: "15-08-2023",
  },
  {
    id: 5,
    issue: "wallet Funding",
    date: "22-09-2023",
  },
];

const LoanFundHistory = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [issues, setIssues] = useState([]);

  const changeState = (id) => {
    let markers = [...issues];
    let index = markers.findIndex((el) => el.id == id);
    markers[index] = { ...markers[index], opened: !markers[index].opened };
    //setIssues({ markers });
    setIssues(markers);
  };

  const OneItem = ({ id, issue, date, opened }) => (
    <TouchableOpacity>
      <View style={styles.issueViewClose}>
        <View style={styles.issueTextView}>
          <Text style={styles.issueTextClose}>{issue}</Text>
          <Text style={styles.issueTextDat}>{date}</Text>
        </View>
        <View style={styles.issueTogglerView}></View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <OneItem
      id={item.id}
      issue={item.issue}
      date={item.date}
      opened={item.opened}
    />
  );

  useEffect(() => {
    const asyncFetch = () => {
      //Call API HERE
      setIssues(jsonData);
    };
    asyncFetch();
  }, []);

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
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("MyTransections")}
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
        <Text style={styles.welcometxt}>Transection Details</Text>
        <Text style={styles.othertxt}>Content will be generated</Text>
        <Text style={styles.amnttxt}>US $500.00</Text>
        <TouchableOpacity style={styles.btnstatus}><Text style={styles.btntxt}>Successful</Text></TouchableOpacity>

        <View style={styles.issuesView}>
          <Text style={styles.issueTextClose}>Borrower Details</Text>
          <Text style={styles.issueTextDat}>Otilevbo Mark Spence{'\n'}GT Bank | 858586586</Text>
        </View>
        <View style={styles.issuesView}>
          <Text style={styles.issueTextClose}>Transection Number</Text>
          <Text style={styles.issueTextDat}>12685865855975756</Text>
        </View>
        <View style={styles.issuesView}>
          <Text style={styles.issueTextClose}>Transection Type</Text>
          <Text style={styles.issueTextDat}>Mono</Text>
        </View>
        <View style={styles.issuesView}>
          <Text style={styles.issueTextClose}>Transection Date</Text>
          <Text style={styles.issueTextDat}>12-12-2000 13:04</Text>
        </View>
        <View style={styles.issuesView}>
        <TouchableOpacity
              onPress={() => navigation.navigate("FirstTimeWelcome")}
              activeOpacity={0.7}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Share Receipt</Text>
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
    marginTop: 20,
    fontFamily: "GeneralSansMedium",
  },
  othertxt: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 20,
    fontFamily: "GeneralSansRegular",
  },
  amnttxt: {
    color: "#000000",
    fontSize: 32,
    fontWeight: "600",
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: "GeneralSansRegular",
  },
  btnstatus: {
    backgroundColor: "#2CA04C",
    width: 86,
    height: 22,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btntxt: {
    color: "#F0FDF4",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "GeneralSansRegular",
  },
  issuesView: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 5,
    justifyContent: 'space-between'
  },
  issueViewClose: {
    flexDirection: "row",
    marginTop: 8,
    paddingTop: 5,
    paddingBottom: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D4D4D8",
  },
  issueTextView: {
    flex: 8,
  },
  issueTextClose: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    fontFamily: "GeneralSansRegular",
  },
  issueTextDat: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    fontFamily: "GeneralSansMedium",
  },
  issueTogglerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnone: {
    height: 55,
    width: "100%",
    backgroundColor: "#1435AB",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  btnonetext: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 18,
    fontFamily: "GeneralSansMedium",
  },
  btn: {
    height: 55,
    width: "90%",
    backgroundColor: COLORS.signed,
    marginTop: 80,
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
});

export default LoanFundHistory;
