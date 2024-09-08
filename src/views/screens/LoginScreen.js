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

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: 'anitandlovhu@gmail.com',
    password: '*********',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('LoginScreen');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text
          style={{
            color: COLORS.neutral,
            fontSize: 20,
            marginVertical: 10,
            marginTop: 10,
          }}>
          Welcome
        </Text>
        <Text
          style={{
            color: COLORS.egyptionblue,
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'General-Sans',
            marginTop: 20,
          }}>
          Good to have you here!
        </Text>
        <Text
          style={{ color: COLORS.coolgray, fontSize: 16, marginVertical: 10 }}>
          Enter your login details to sign into your account securely.
        </Text>
        <View style={{ marginVertical: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={style.label}>Email Address</Text>
            <View style={style.inputContainer}>
              <View style={{ marginTop: 4 }}>
                <Image
                  style={{ marginRight: 10, marginTop: 16 }}
                  source={require('../../../assets/email.png')}
                />
              </View>
              <TextInput
                autoCorrect={false}
                value={inputs.email}
                onChangeText={(text) => setInputs({ ...inputs, email: text })}
                style={{ color: COLORS.egyptionblue, flex: 1 }}
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={style.label}>Password</Text>
            <View style={style.inputContainer}>
              <Image
                style={{ marginRight: 10, marginTop: 16 }}
                source={require('../../../assets/password.png')}
              />
              <TextInput
                autoCorrect={false}
                value={inputs.password}
                onChangeText={(text) =>
                  setInputs({ ...inputs, password: text })
                }
                style={{ color: COLORS.egyptionblue, flex: 1 }}
              />
              <Icon
                onPress={() => setHidePassword(!hidePassword)}
                name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                style={{ color: COLORS.darkBlue, fontSize: 22, marginTop: 16 }}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '50%',
              }}>
              <View style={{ marginTop: 4 }}>
                <Checkbox
                  color={COLORS.login}
                  uncheckedColor={COLORS.login}
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <Text
                style={{
                  color: COLORS.signed,
                  fontSize: 16,
                  marginVertical: 10,
                }}>
                Keep me signed in
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
                  color: COLORS.link,
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginVertical: 10,
                }}>
                Forgot password
              </Text>
            </View>
          </View>

          <Button title="Login" onPress={validate} />
          <TouchableOpacity
            onPress={console.log('pressed')}
            activeOpacity={0.7}
            style={{
              height: 55,
              width: '100%',
              backgroundColor: 'white',
              marginVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              borderWidth: 1,
              borderColor: COLORS.login,
            }}>
            <Text
              style={{ color: COLORS.login, fontWeight: 'bold', fontSize: 18 }}>
              Get Access with Client ID
            </Text>
          </TouchableOpacity>
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.blk,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Don't have an account?{' '}
            <Text style={{ color: COLORS.link }}> Register</Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '87%',
              marginTop: 15,
              marginLeft: '6%',
            }}>
            <View
              style={{ flex: 1, height: 1, backgroundColor: COLORS.orlines }}
            />
            <View>
              <Text
                style={{
                  width: 50,
                  textAlign: 'center',
                  color: COLORS.ortext,
                }}>
                Or
              </Text>
            </View>
            <View
              style={{ flex: 1, height: 1, backgroundColor: COLORS.orlines }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: 15,
              marginLeft: '2%',
            }}>
            <View>
              <Image
                style={{ marginRight: 10, marginTop: 16 }}
                source={require('../../../assets/google.png')}
              />
            </View>
            <View>
              <Image
                style={{ marginRight: 10, marginTop: 16 }}
                source={require('../../../assets/Facebook.png')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
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
});

export default LoginScreen;
