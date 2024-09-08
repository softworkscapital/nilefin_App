import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { useFonts } from "expo-font";
import { useFocusEffect } from '@react-navigation/native';

const StartPage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'GeneralSansMedium': require('../../../assets/font/GeneralSans-Medium.otf'),
    'GeneralSansRegular': require('../../../assets/font/GeneralSans-Regular.otf'),
    'SFProTextRegular': require('../../../assets/font/SF-Pro-Text-Regular.otf')
  });

  useFocusEffect(
    React.useCallback(() => {
      const unloadScreen = () => {
        navigation.navigate('Splash');
      };
      setTimeout(() => {
        unloadScreen();
      }, 5000);
    }, [navigation])
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('../../../assets/cover.png')}
        resizeMode="stretch"
        style={styles.imageBackGr}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 45, height: 45, borderRadius: 5, backgroundColor: '#FFFFFF', padding: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={styles.logoImg}
              source={require('../../../assets/splashlogo.png')}
            />
          </View>
          <View>
            <Text style={styles.firstText}>Wisrod</Text>
          </View>
        </View>
        <View>
          <Text style={styles.secondText}>Way to financial freedom</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackGr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '500',
    marginLeft: 5,
    marginTop: -5,
    fontFamily: 'GeneralSansMedium'
  },
  secondText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
    fontFamily: 'GeneralSansRegular'
  },
  logoImg: { 
    width: 35, 
    height: 35 
  },
});

export default StartPage;
