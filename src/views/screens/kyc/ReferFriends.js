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
import * as Progress from "react-native-progress";
import COLORS from '../../../constants/colors';
import * as Clipboard from 'expo-clipboard';

const ReferFriends = ({ navigation }) => {

  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [copiedText, setCopiedText] = React.useState('');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('hello world');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
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
        <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "50%",
            marginTop: 20,
          }}
        >
           <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 10, marginTop: 16, flexDirection: "row" }}
        >
            <Image style={{width: 20, height: 20}} source={require("../../../../assets/arrow-left.png")} />
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
        <Text style={styles.welcometxt}>Refer Friends</Text>
        <Text style={styles.instruction}>Earn amazing rewards.</Text>

        <View style={styles.topItem}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.welcometxt}>How to Earn</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20, width: '100%' }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: '20%'
              }}
            >
              <Image
                style={{
                  width: 29,
                  height: 18.56,
                }}
                source={require("../../../../assets/sharelink.png")}
              />
              <Text style={styles.downtxt}>Share your {"\n"}referral link</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: '15%'
              }}
            >
              <Image
                style={{
                  width: 42,
                  height: 11,
                  marginTop: -40,
                  marginLeft: 10,
                }}
                source={require("../../../../assets/linearrow.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: '25%'
              }}
            >
              <Image
                style={{
                  width: 32,
                  height: 15.3,
                }}
                source={require("../../../../assets/frienduses.png")}
              />
              <Text style={styles.downtxt}>
                Friend uses {"\n"}link to join{" "}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: '15%'
              }}
            >
              <Image
                style={{
                  width: 42,
                  height: 11,
                  marginTop: -40,
                  marginLeft: 10,
                }}
                source={require("../../../../assets/linearrow.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: '25%'
              }}
            >
              <Image
                style={{
                  width: 26,
                  height: 22.13,
                }}
                source={require("../../../../assets/friendtakes.png")}
              />
              <Text style={styles.downtxt}>Friend takes {"\n"}a loan</Text>
            </View>
          </View>
        </View>
        <View style={styles.kycItem}>
          <View style={styles.persons}>
            <View>
              <Image
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 52,
                  borderWidth: 2,
                  borderColor: "#FFFFFF",
                }}
                source={require("../../../../assets/person.png")}
              />
            </View>
            <View>
              <Image
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 52,
                  borderWidth: 2,
                  borderColor: "#FFFFFF",
                  marginLeft: -17,
                }}
                source={require("../../../../assets/person.png")}
              />
            </View>
            <View>
              <Image
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 52,
                  borderWidth: 2,
                  borderColor: "#FFFFFF",
                  marginLeft: -17,
                }}
                source={require("../../../../assets/person.png")}
              />
            </View>
            <View
              style={{
                width: "60%",
              }}
            >
              <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                <Text style={styles.seeall}>See all</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.usualreply}>Friends Reffered</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Progress.Bar progress={0.5} color={"#164E63"} width={300} />
            <Text style={styles.usualreply}>5 out of 10 Friends Reffered</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{width: '50%'}}>
            <TouchableOpacity
              onPress={() => {
                signIn();
              }}
              style={styles.btn}
            >
              <Text style={styles.btntext}>Pending Reward</Text>
              <Text style={styles.btntextlower}>$1,000</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%'}}>
            <TouchableOpacity
              onPress={() => {
                signIn();
              }}
              style={[styles.btn,{marginLeft: 5}]}
            >
              <Text style={styles.btntext}>Reward Received</Text>
              <Text style={styles.btntextlower}>$5,000</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={()=>copyToClipboard()}
            style={{
              flexDirection: "row",
              backgroundColor: COLORS.cyanlight,
              padding: 7,
              borderRadius: 12,
              marginLeft: "15%",
              marginTop: 6,
              width: "70%",
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
           
            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: "400",
                  fontFamily: "GeneralSansRegular",
                  marginLeft: 10,
                }}
              >
                Copy referral link
              </Text>
            </View>
            <View style={{ marginLeft: 5 }}>
              <Image
                style={{ width: 28, height: 25 }}
                source={require("../../../../assets/copylink.png")}
              />
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log("refere");
              }}
              activeOpacity={0.7}
              style={styles.btndown}
            >
              <Text style={styles.btndowntext}>Share Link</Text>
              <Image
                style={{ width: 24, height: 24, marginLeft: 10 }}
                source={require("../../../../assets/sendmsg.png")}
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
  downtxt: {
    color: "#040B22",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    fontFamily: "GeneralSansRegular",
    textAlign: "center",
  },
  instruction: {
    color: "#040B22",
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 10,
    fontFamily: "GeneralSansRegular",
  },
  usualreply: {
    color: "#040B22",
    fontSize: 14,
    fontWeight: "400",
    marginVertical: 10,
    fontFamily: "GeneralSansRegular",
  },
  topItem: {
    flexDirection: "column",
    marginTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#164E633D",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  kycItem: {
    flexDirection: "column",
    marginTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderWidth: 3,
    borderColor: "#164E633D",
    borderStyle: "dashed",
    backgroundColor: "#edfeff",
    borderRadius: 10,
  },
  persons: {
    flexDirection: "row",
    marginTop: 20,
  },
  btn: {
    height: 55,
    flexDirection: "column",
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000000',
    width: '98%'

  },
  btntext: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 12,
    fontFamily: "GeneralSansMedium",
  },
  btntextlower: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "GeneralSansMedium",
    marginTop: 5
  },
  seeall: {
    color: "#FFFFFF",
    backgroundColor: "#164E63",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    width: 70,
  },
  btndown: {
    height: 55,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#1435AB",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 30,
  },
  btndowntext: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 18,
    fontFamily: 'GeneralSansMedium'
  },
});

export default ReferFriends;
