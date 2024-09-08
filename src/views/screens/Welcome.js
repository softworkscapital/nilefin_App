import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import COLORS from '../../constants/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });
  const [loading, setLoading] = React.useState(false);
  const [filled, setFilled] = React.useState(0);

  const changeFiiled = () => {
    if (filled != 6) {
      setFilled(filled + 1);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Signin'); // Navigate to login screen
    } catch (error) {
      console.error('Error clearing async storage:', error);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <View style={style.mainview}>
          <Text style={style.welcometext}>Welcome Back!</Text>
          <Text
            style={{ color: COLORS.egyptionblue, fontSize: 12, marginTop: 2 }}>
            Anita Ndlovhu
          </Text>
          <Image
            style={{ width: 120, height: 120, marginTop: 10 }}
            source={require('../../../assets/user.png')}
          />
          <Text
            style={{ color: COLORS.egyptionblue, fontSize: 12, marginTop: 25 }}>
            Not you?{' '}
           
           <TouchableOpacity onPress={logout}>
           <Text
              style={{
                color: COLORS.link,
                fontSize: 14,
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              {' '}
              Log Out
            </Text> 
           </TouchableOpacity>
        
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 16, height: 16, marginTop: 25 }}
              source={require('../../../assets/passwordstar.png')}
            />
            <Text
              style={{
                color: COLORS.egyptionblue,
                fontSize: 12,
                marginTop: 25,
                marginLeft: 5,
              }}>
              Enter Secure PIN
            </Text>
          </View>

          <View style={{ flexDirection: 'row', padding: 10 }}>
            <View>
              {filled >= 1 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star0.png')}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star1.png')}
                />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              {filled >= 2 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star0.png')}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star1.png')}
                />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              {filled >= 3 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star0.png')}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star1.png')}
                />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              {filled >= 4 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star0.png')}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star1.png')}
                />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              {filled >= 5 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star0.png')}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star1.png')}
                />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              {filled >= 6 ? (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star0.png')}
                />
              ) : (
                <Image
                  style={{ width: 32, height: 32, marginTop: 10 }}
                  source={require('../../../assets/Star1.png')}
                />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                }
              }}
              style={{
                backgroundColor: '#F0F2FA',
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={style.numbers}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                }
              }}
              style={{
                backgroundColor: '#F0F2FA',
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={style.numbers}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                }
              }}
              style={{
                backgroundColor: '#F0F2FA',
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={style.numbers}>3</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                }
              }}
              style={{
                backgroundColor: '#F0F2FA',
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={style.numbers}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                }
              }}
              style={{
                backgroundColor: '#F0F2FA',
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={style.numbers}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                }
              }}
              style={{
                backgroundColor: '#F0F2FA',
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={style.numbers}>6</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                }
              }}
              style={{
                backgroundColor: '#F0F2FA',
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={style.numbers}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                }
              }}
              style={{
                backgroundColor: '#F0F2FA',
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={style.numbers}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                }
              }}
              style={{
                backgroundColor: '#F0F2FA',
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={style.numbers}>9</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#112C8E',
                borderRadius: 63,
                width: 76,
                height: 76,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{ width: 48, height: 48 }}
                source={require('../../../assets/scan.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (filled < 6) {
                  setFilled(filled + 1);
                }
              }}
              style={{
                backgroundColor: '#F0F2FA',
                borderRadius: 63,
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={style.numbers}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilled(filled - 1)}
              style={{
                width: 63,
                height: 63,
                marginTop: 20,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{ width: 48, height: 48 }}
                source={require('../../../assets/btnback.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainview: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcometext: {
    color: COLORS.egyptionblue,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'GeneralSansMedium',
    marginTop: 69,
  },
  numbers: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'GeneralSansMedium',
  },
});

export default Welcome;
