import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/colors';
import Loader from '../components/Loader';
import { useIsFocused } from '@react-navigation/native';

const FirstStep = ({ navigation, props }) => {
  const [loading, setLoading] = React.useState(false);
  const isFocused = useIsFocused();
  const [account, setAccount] = useState('');
  const [subaccount, setSubAccount] = useState('');
  const [inputs, setInputs] = React.useState({
    clientId: '',
    fullName: '',
    phone: '',
    email: '',
    password: '',
    starpassword: '',
    cnpassword: '',
    starcnpassword: '',
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     findSelectedAccount();
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   console.log('called');
  //   setAccount('');
  //   setSubAccount('');
  //   if (isFocused) {
  //     findSelectedAccount();
  //   }
  // }, [props, isFocused]);

  // const findSelectedAccount = async () => {
  //   try {
  //     let userData = await AsyncStorage.getItem('SelectedAccount');

  //     if (userData) {
  //       userData = JSON.parse(userData);
  //       setAccount(userData.acc);
  //       setSubAccount(userData.subacc);
  //       console.log('user data found');
  //     } else {
  //       console.log('No user data found');

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      
      <Loader visible={loading} />

      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: '50%',
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '50%',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '500',
                backgroundColor: COLORS.cyan,
                padding: 7,
                borderRadius: 6,
                marginTop: 6,
              }}>
              Step 1 of 3
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: '#190503',
            fontSize: 20,
            fontWeight: '600',
            marginTop: 12,
          }}>
          Account Creation 🚀
        </Text>
        <Text
          style={{
            color: '#374151',
            fontWeight: '400',
            fontSize: 16,
            marginVertical: 10,
          }}>
          Please provide the required information to get started.
        </Text>

        <View style={styles.innera}>
          <Text style={styles.label}>Phone number</Text>
          <View style={styles.inputContainer}>
            <View
              style={{
                borderRightWidth: 1,
                borderRightColor: 'gray',
                height: 40,
                marginTop: 8,
              }}>
              <Text style={{ marginTop: 10, marginRight: 8, fontSize: 16, fontWeight: '500', color: '#7B7B7B'}}>+263</Text>
            </View>
            <TextInput
              autoCorrect={false}
              value={inputs.phone}
              onChangeText={(text) => setInputs({ ...inputs, phone: text })}
              style={[styles.textinputDisabled, { marginLeft: 8 }]}
            />
          </View>
        </View>

        <Text
          style={{
            color: '#190503',
            fontSize: 20,
            fontWeight: '600',
            marginTop: 12,
          }}>
          Select Account Type
        </Text>
        <Text
          style={{
            color: '#374151',
            fontWeight: '400',
            fontSize: 16,
            marginVertical: 10,
          }}>
          What kind of account are you creating?
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 15,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              height: 200,
              borderRadius: 7,
              backgroundColor: '#155E75',
              borderWidth: 1,
              borderColor: '#ABAFBB',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  backgroundColor: '#779ca1',
                  borderRadius: 63,
                  width: 63,
                  height: 63,
                  marginTop: 20,
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ width: 28, height: 25 }}
                  source={require('../../../assets/FolderBlack.png')}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  color: '#F3F4F6',
                  fontSize: 16,
                  fontWeight: '700',
                  marginTop: 12,
                }}>
                Borrower's Account
              </Text>
            </View>
            <View
              style={{
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  color: '#F3F4F6',
                  fontSize: 14,
                  fontWeight: '500',
                  marginVertical: 10,
                }}>
                With this account you can access & Apply for quick loans.
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              height: 200,
              margin: 10,
              borderRadius: 7,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#EBECF0',
            }}>
             <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  backgroundColor: 'lightgray',
                  borderRadius: 63,
                  width: 63,
                  height: 63,
                  marginTop: 20,
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ width: 28, height: 25 }}
                  source={require('../../../assets/FolderWhite.png')}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  color: '#080813',
                  fontSize: 16,
                  fontWeight: '700',
                  marginTop: 12,
                }}>
                Lenders's Account
              </Text>
            </View>
            <View
              style={{
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  color: '#7A869A',
                  fontSize: 14,
                  fontWeight: '400',
                  marginVertical: 10,
                }}>
                Invest in high interest & secure loans and make good returns.
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: '88%', marginLeft: '3%' }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 14,
              fontWeight: '500',
              marginVertical: 10,
              textAlign: 'center',
            }}>
            By registering on Wisrod, you agree to our{' '}
            <Text style={{ color: '#7E86D1' }}>Terms & Conditions </Text>and
            <Text style={{ color: '#7E86D1' }}> Privacy Policy </Text>.
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TermsConditions')}
            activeOpacity={0.7}
            style={{
              height: 55,
              width: '100%',
              backgroundColor: '#1435AB',
              marginVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('ThreeOfThree')}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontWeight: '500',
                  fontSize: 18,
                }}>
                Register
              </Text>
            </TouchableOpacity>
            <Image
              style={{ width: 20, height: 18, marginLeft: 7 }}
              source={require('../../../assets/arrow-white.png')}
            />
            <Image
              style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
              source={require('../../../assets/arow-blue.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.cyanlight,
            padding: 7,
            borderRadius: 6,
            marginLeft: '15%',
            marginTop: 6,
            width: '70%',
          }}>
          <View style={{ marginLeft: 5 }}>
            <Image
              style={{ width: 28, height: 25 }}
              source={require('../../../assets/security-ques.png')}
            />
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '400',
                marginLeft: 10,
              }}>
              Need help? Learn more
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innera: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.egyptionblue,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  textinputDisabled: {
    flex: 1,
    fontSize: 16, 
    fontWeight: '500', 
    color: '#000000'
  },
});

export default FirstStep;
