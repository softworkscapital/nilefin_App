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

const Faqs = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'GeneralSansMedium': require('../../../../assets/font/GeneralSans-Medium.otf'),
    'GeneralSansRegular': require('../../../../assets/font/GeneralSans-Regular.otf'),
    'SFProTextRegular': require('../../../../assets/font/SF-Pro-Text-Regular.otf')
  });

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
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('FaqsSupport')}
            style={{ marginRight: 10, marginTop: 16, flexDirection:'row' }}>
            <Image style={{width: 20, height: 20}} source={require('../../../../assets/arrow-left.png')} />
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              marginLeft: 10,
              fontFamily: 'GeneralSansRegular'
            }}>
            Back
          </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.welcometxt}>FAQs</Text>
        <ScrollView>
        <View style={styles.squaresView}>
          <TouchableOpacity style={styles.square}>
            <View>
              <Image
                style={{ width: 44, height: 40.25 }}
                source={require("../../../../assets/getloans.png")}
              />
            </View>
            <View>
              <Text style={styles.headerText}>Get Loans</Text>
            </View>
            <View>
              <Text style={styles.lowerText}>
                Give us more {"\n"}information about you
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.square, { marginLeft: 10 }]}>
            <View>
              <Image
                style={{ width: 44, height: 40.25 }}
                source={require("../../../../assets/giveloans.png")}
              />
            </View>
            <View>
              <Text style={styles.headerText}>Give out Loans</Text>
            </View>
            <View>
              <Text style={styles.lowerText}>
                Give us more {"\n"}information about you
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.squaresView}>
          <TouchableOpacity style={styles.square}>
            <View>
              <Image
                style={{ width: 44, height: 40.25 }}
                source={require("../../../../assets/withdrfunds.png")}
              />
            </View>
            <View>
              <Text style={styles.headerText}>Withdraw Funds</Text>
            </View>
            <View>
              <Text style={styles.lowerText}>
                Give us more {"\n"}information about you
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('RepayLoans')}style={[styles.square, { marginLeft: 10 }]}>
            <View>
              <Image
                style={{ width: 44, height: 40.25 }}
                source={require("../../../../assets/repayloans.png")}
              />
            </View>
            <View>
              <Text style={styles.headerText}>Repay Loans</Text>
            </View>
            <View>
              <Text style={styles.lowerText}>
                Give us more {"\n"}information about you
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.squaresView}>
          <TouchableOpacity style={styles.square}>
            <View>
              <Image
                style={{ width: 44, height: 40.25 }}
                source={require("../../../../assets/loanmarket.png")}
              />
            </View>
            <View>
              <Text style={styles.headerText}>Loan Market Place</Text>
            </View>
            <View>
              <Text style={styles.lowerText}>
                Give us more {"\n"}information about you
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.square, { marginLeft: 10 }]}>
            <View>
              <Image
                style={{ width: 44, height: 40.25 }}
                source={require("../../../../assets/kycupdates.png")}
              />
            </View>
            <View>
              <Text style={styles.headerText}>KYC Updates</Text>
            </View>
            <View>
              <Text style={styles.lowerText}>
                Give us more {"\n"}information about you
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.squaresView, {marginBottom: 50}]}>
          <TouchableOpacity style={styles.square}>
            <View>
              <Image
                style={{ width: 44, height: 40.25 }}
                source={require("../../../../assets/referends.png")}
              />
            </View>
            <View>
              <Text style={styles.headerText}>Refer Friends</Text>
            </View>
            <View>
              <Text style={styles.lowerText}>
                Give us more {"\n"}information about you
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.blanksquare, { marginLeft: 10 }]}>
            
          </View>
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
    fontFamily: 'GeneralSansMedium'
  },
  squaresView: {
    flex: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  square: {
    flex: 1,
    flexDirection: "column",
    height: 150,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EBECF0",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  blanksquare: {
    flex: 1,
    flexDirection: "column",
    height: 150,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 25,
    color: "#000000",
    fontFamily: 'GeneralSansMedium'
  },
  lowerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B778C",
    fontFamily: 'GeneralSansRegular'
  },
});

export default Faqs;
