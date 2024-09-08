import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import APILink from "../../../constants/globals";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const MyTransections = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [transections, setTransections] = useState([]);
  const [filteredtransections, setFilteredtransections] = useState([]);
  const [searchkey, setSearchkey] = useState("");

  const isFocused = useIsFocused();

  const [isOpen, setIsOpen] = useState(false);
  const [issues, setIssues] = useState([]);

  const changeState = (id) => {
    let markers = [...issues];
    let index = markers.findIndex((el) => el.id == id);
    markers[index] = { ...markers[index], opened: !markers[index].opened };
    //setIssues({ markers });
    setIssues(markers);
  };

  const OneItem = ({ id, purpose, inserted_at, opened, amnt }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          purpose == "Wallet Funding" ? "WalletFundHistory" : "LoanFundHistory"
        )
      }
    >
      {/* <View style={styles.issueViewClose}>
        <View style={styles.issueTextView}>
          <Text style={styles.issueTextClose}>{purpose}</Text>
          <Text style={styles.issueTextClose}>Amount: {amnt}</Text>
          <Text style={styles.issueTextDat}>{inserted_at}</Text>
        </View>
        <View style={styles.issueTogglerView}></View>
      </View> */}
       <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20
          }}
        >
          <View
            style={{
              width: "16%",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
               <Image
              style={{ width: 35, height: 35, marginTop: 15 }}
              source={require("../../../../assets/transgive.png")}
            />
            </View>
          <View
            style={{
              width: "42%",
              justifyContent: "center",
              flexDirection: 'column'
            }}
          >
            <Text style={styles.issueTextClose}>{purpose}</Text>
            <Text style={styles.issueTextDat}>{inserted_at}</Text>
          </View>
          <View
            style={{
              width: "42%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[styles.issueTextClose, {fontFamily: "GeneralSansRegular", color: '#000000', alignSelf: 'left'}]}>US$: {amnt}</Text>
          </View>
        </View>
    </TouchableOpacity>
  );

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

  const renderItem = ({ item }) => (
    <OneItem
      id={item.id}
      purpose={titleCase(item.purpose.split("_").join(" "))}
      amnt={item.pretty_amount}
      inserted_at={item.inserted_at.slice(0, -8)}
      opened={item.opened}
    />
  );

  useEffect(() => {
    const asyncFetch = async () => {
      //Call API HERE
      const apiLink = APILink.getLink();
      const asynctoken = await AsyncStorage.getItem("TOKEN");
      const usr = await AsyncStorage.getItem("USRTYPE");

      let res = await fetch(`${apiLink}/transactions?page=1&limit=10`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      });

      let responseJson = await res.json();
      console.log(responseJson.data);
      setFilteredtransections(responseJson.data);
      setTransections(responseJson.data);
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "50%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("FirstTimeWelcome")}
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
        <Text style={styles.welcometxt}>Transection History</Text>
       
        <View style={styles.issuesView}>
          {issues && (
            <FlatList
            data={transections}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            />
          )}
          {issues.length ==0 && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
              style={{ width: 173, height: 176, marginTop: 70 }}
              source={require("../../../../assets/emptytrans.png")}
            />
              <Text style={styles.welcometxt}>You have not made any transections</Text>
              <Text style={styles.fainttxt}>Text will be generated</Text>
            </View>
          )}
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
  fainttxt: {
    color: "#4C4A7B",
    fontSize: 18,
    fontWeight: "400",
    marginTop: 20,
    fontFamily: "GeneralSansRegular",
  },
  issuesView: {
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 80,
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
    fontFamily: "GeneralSansMedium",
  },
  issueTextDat: {
    color: "#000000",
    fontSize: 12,
    marginTop: 5,
    fontFamily: "GeneralSansRegular",
  },
  issueTogglerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default MyTransections;
