import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import Loader from '../components/Loader';

const FacebookHandler = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);

  const goToPrevScreen = async () => {
    try {
      navigation.navigate('Signin');
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />

      <ScrollView contentContainerStyle={styles.scroller}>
        <View style={styles.firstview}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: '50%',
            }}>
            <TouchableOpacity
              onPress={() => goToPrevScreen()}
              style={{ marginRight: 10, marginTop: 16 }}>
              <Image source={require('../../../assets/arrow-left.png')} />
            </TouchableOpacity>
            <Text
              style={{
                color: COLORS.egyptionblue,
                fontSize: 16,
                marginTop: 15,
              }}>
              Back
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={navigation.navigate('FirstStep')}
          style={{
            flexDirection: 'column',
            flex: 9,
            backgroundColor: '#164E63',
            width: '100%',
            height: 700,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.googlehandle}>
              Google handle’s this process
            </Text>
          </View>
          <View>
            <Text style={styles.lowerText}>
              After the process is completed, we take over
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroller: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  firstview: {
    flex: 1,
    flexDirection: 'row',
  },
  googlehandle: {
    color: '#F6F7FA',
    fontSize: 20,
    fontWeight: '600',
  },
  lowerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
  }
});

export default FacebookHandler;
