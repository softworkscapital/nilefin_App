import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { useFonts } from 'expo-font';
import COLORS from '../../../constants/colors';

const PaymentSuccessfull = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });
  const [screen, setScreen] = useState(1);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/vectorbg.png")}
        resizeMode="stretch"
        style={{ flex: 1 }}
      >
        <ScrollView>
      <View style={styles.firstFlex}>
        <View style={styles.tmview}>
          <View>
            <Text style={styles.wisrodtext}>Wisrod</Text>
          </View>
          <View>
            <Text style={styles.tmtext}>TM</Text>
          </View>
        </View>
        <View style={styles.outercircle}>
          <View style={styles.innercircle1}>
            <View style={styles.innercircle2}>
            <Image
          style={{ width: 65, height: 65, marginLeft: 7 }}
          source={require('../../../../assets/Confetti.gif')}
        />
            </View>
          </View>
        </View>

        <Text style={styles.successtextbig}>Repayment Successful</Text>
        <Text style={styles.successtextsmall}>
        Your repayment of z$20,000 was successful and the amount will be taken out of the loan you owe.
        </Text>
      </View>
      <View style={styles.secondFlex}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FirstTimeWelcome')}
          activeOpacity={0.7}
          style={styles.btn}>
          <Text style={styles.btnText}>Done</Text>
          <Image
            style={{ width: 20, height: 18, marginLeft: 7 }}
            source={require('../../../../assets/arrow-white.png')}
          />
          <Image
            style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
            source={require('../../../../assets/arow-blue.png')}
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
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  firstFlex: {
    flex: 7,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outercircle: {
    width: 146,
    height: 146,
    marginTop: 100,
    borderRadius: 146,
    borderWidth: 0.5,
    borderColor: '#324B5A',
  },
  innercircle1: {
    width: 122.47,
    height: 122.47,
    borderRadius: 122.47,
    borderWidth: 0.5,
    borderColor: '#324B5A',
    marginLeft: 12,
    marginTop: 12,
  },
  innercircle2: {
    width: 95.73,
    height: 95.73,
    borderRadius: 95.73,
    borderWidth: 0.5,
    borderColor: '##324B5A',
    marginLeft: 13.5,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successtextbig: {
    color: '#040B22',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'GeneralSansMedium',
    marginTop: 12,
  },
  successtextsmall: {
    color: '#374151',
    fontSize: 18,
    fontFamily: 'GeneralSansRegular',
    fontWeight: '400',
    marginTop: 5,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  tmview: {
    flexDirection: 'row',
    marginTop: 20,
  },
  wisrodtext: {
    color: '#1435AB',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'GeneralSansMedium',
    textAlign: 'center',
  },
  tmtext: {
    color: '#1435AB',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'GeneralSansRegular',
    textAlign: 'center',
    marginLeft: 15,
  },
  secondFlex: {
    flex: 3,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 55,
    width: '90%',
    backgroundColor: COLORS.signed,
    marginTop: 80,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.login,
    flexDirection: 'row',
  },
  btnText: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 18,
    fontFamily: 'GeneralSansMedium',
  },
});

export default PaymentSuccessfull;
