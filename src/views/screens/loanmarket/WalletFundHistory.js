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

const WalletFundHistory = ({ navigation }) => {
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
        <Text style={styles.welcometxt}>Wallet Funding History</Text>

        <View style={styles.issuesView}>
          <Text style={styles.issueTextClose}>Transection ID</Text>
          <Text style={styles.issueTextDat}>3242562662772</Text>
        </View>
        <View style={styles.issuesView}>
          <Text style={styles.issueTextClose}>Transection Date</Text>
          <Text style={styles.issueTextDat}>12-08-2023 12:00:34</Text>
        </View>
        <View style={styles.issuesView}>
          <Text style={styles.issueTextClose}>Transection Amount</Text>
          <Text style={styles.issueTextDat}>US $500.00</Text>
        </View>
        <View style={styles.issuesView}>
          <Text style={styles.issueTextClose}>Previous Balance</Text>
          <Text style={styles.issueTextDat}>US $50.00</Text>
        </View>
        <View style={styles.issuesView}>
          <Text style={styles.issueTextClose}>After Funding Balance</Text>
          <Text style={styles.issueTextDat}>US $550.00</Text>
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
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    fontFamily: "GeneralSansMedium",
  },
  issueTextDat: {
    color: "#1435AB",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    fontFamily: "GeneralSansMedium",
  },
  issueTogglerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  }
});

export default WalletFundHistory;
