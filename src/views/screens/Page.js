import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import COLORS from '../../constants/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';

const Page = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);

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
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={{ marginRight: 10, marginTop: 16 }}>
              <Image
                source={require('../../../assets/arrow-left.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: COLORS.egyptionblue,
                fontSize: 16,
                fontFamily: 'General-Sans',
                marginTop: 15,
              }}>
              Back
            </Text>
          </View>
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
                backgroundColor: COLORS.cyan,
                padding: 7,
                borderRadius: 6,
                marginTop: 6,
              }}>
              Step 2 of 3
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: COLORS.egyptionblue,
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'General-Sans',
            marginTop: 12,
          }}>
          Select Account Type
        </Text>
        <Text
          style={{ color: COLORS.coolgray, fontSize: 13, marginVertical: 10 }}>
          What kind of account are you creating? You can also have multiple
          accounts when you get in.
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
                source={require('../../../assets/FolderWhite.png')}
              />
            </View>
            <View
              style={{
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: 'General-Sans',
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
                  color: 'white',
                  fontSize: 12,
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
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#EBECF0',
            }}>
            <View
              style={{
                backgroundColor: '#72747a',
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
            <View
              style={{
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: 'General-Sans',
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
                  color: 'black',
                  fontSize: 12,
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
              color: COLORS.othergray,
              fontSize: 13,
              marginVertical: 10,
              textAlign: 'center',
            }}>
            By registering on Wisrod, you agree to our{' '}
            <Text style={{ color: COLORS.signed }}>Terms & Conditions </Text>and
            <Text style={{ color: COLORS.signed }}> Privacy Policy </Text>.
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={console.log('pressed')}
            activeOpacity={0.7}
            style={{
              height: 55,
              width: '100%',
              backgroundColor: COLORS.signed,
              marginVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              borderWidth: 1,
              borderColor: COLORS.login,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: COLORS.signed,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Proceed
            </Text>
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
                fontSize: 14,
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



export default Page;
