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
  Alert,
  FlatList,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "react-native-paper";
import COLORS from "../../../constants/colors";
import Loader from "../../components/Loader";
import APILink from "../../../constants/globals";
import { useFonts } from "expo-font";
import { useIsFocused } from "@react-navigation/native";
import * as Progress from "react-native-progress";

const MyLoans = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [data, setData] = React.useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = React.useState(false);

  const OneItem = ({
    id,
    userid,
    borrower,
    status,
    repayment,
    amount,
    interest_rate,
    term,
    fundtotal,
  }) => (
    <TouchableOpacity
    onPress={()=>navigation.navigate("")}
      style={{
        backgroundColor: "#F6F6FF",
        width: "100%",
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "#164E6330",
        height: 127,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 15,
        }}
      >
        <Text
          style={{
            color: "#040B22",
            fontSize: 20,
            fontWeight: "700",
            fontFamily: "GeneralSansMedium",
          }}
        >
          US ${amount}
        </Text>
        <Text
          style={{
            backgroundColor: "#FEEDD6",
            color: "#F7732A",
            fontSize: 14,
            fontWeight: "500",
            fontFamily: "GeneralSansRegular",
            padding: 7,
            borderRadius: 8,
          }}
        >
          Ongoing
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Progress.Bar progress={0.5} color={"#164E63"} width={320} />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "#000000",
            fontSize: 14,
            fontWeight: "500",
            fontFamily: "GeneralSansRegular",
            alignSelf: "flex-end",
          }}
        >
          2 of 9 payments
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "#000000",
            fontSize: 14,
            fontWeight: "500",
            fontFamily: "GeneralSansMedium",
            alignSelf: "flex-start",
          }}
        >
          Next Payment:{" "}
          <Text style={{ fontFamily: "GeneralSansRegular" }}>
            26th May 2023
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

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
      setData(responseJson.data);
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
      <ImageBackground
        source={require("../../../../assets/vectorbg.png")}
        resizeMode="cover"
        style={{flex:1}}
      >
        <View style={styles.viewTop}>
          <Text style={styles.txtScreenName}>Loans</Text>
          <Image
            source={require("../../../../assets/notify.png")}
            style={{ width: 32, height: 32 }}
          />
        </View>
        <View style={styles.loansView}>
          {data && (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
              contentContainerStyle={{ paddingBottom: 200 }}
            />
          )}
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
                                        source={require("../../../../assets/tabnavigator/market.png")}
                                    />
                                </View>
                                <View style={styles.tabtextview}>
                                    <Text style={styles.tabtext}>Market</Text>
                                </View>
                            </TouchableOpacity>
                  
        
                
                    <TouchableOpacity
                        onPress={() => navigation.navigate("MyLoans")
                        }
                    >
                        <View style={styles.tabviewselected}>
                            <Image
                                style={{ width: 28, height: 28, marginTop: 3 }}
                                source={require("../../../../assets/tabnavigator/emptywallet.png")}
                            />
                        </View>
                        <View style={styles.tabtextview}>
                            <Text style={styles.tabtextselected}>Loans</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  viewTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    flex: 1,
  },
  txtScreenName: {
    color: "#040B22",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },
  loansView: {
    width: "100%",
    marginTop: 20,
    flex: 8,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 5,
    // paddingBottom: 20,
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

export default MyLoans;
