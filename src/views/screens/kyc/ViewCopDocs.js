import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useFonts } from "expo-font";
import COLORS from "../../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { WebView } from 'react-native-webview';


const ViewCopDocs = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = useState(true);
  const [docLink, setDocLink] = useState('');
  const isFocused = useIsFocused();

  const loadPage = () => {
    console.log('reloading the page ...');
    WebViewRef && WebViewRef.reload();
  };

  const handleError = (error) => {
    setIsError(true);
    console.log(error);
  };

  const hideSpinner = () => {
    setVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('DOCLINK');
      setDocLink(value);
      console.log(value);
    };
    fetchData();
  }, []);

  const injectedJavaScript = `
      const style = document.createElement('style');
      style.innerHTML = '.ndfHFb-c4YZDc-Wrql6b { visibility: hidden; }';
      document.head.appendChild(style);
    `;
    let WebViewRef;
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
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("DocumentUpload")}
              style={{ marginRight: 10, flexDirection: "row" }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../../../assets/arrow-left.png")}
              />
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
          <Text style={styles.welcometxt}>Viewing: </Text>
        {isError ? (
        <View style={styles.errordiv}>
          <Text>Error loading the pdf. Your internet connection is poor</Text>
          <TouchableHighlight style={styles.btnCss} onPress={() => loadPage()}>
            <Text style={styles.btnText}>Retry...</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
          <WebView
            ref={(WEBVIEW_REF) => (WebViewRef = WEBVIEW_REF)}
            onError={handleError}
            onLoad={() => hideSpinner()}
            injectedJavaScript={injectedJavaScript}
            source={{
              uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=${docLink}`
            }}
            style={{backgroundColor: 'white'}}
          />
          {visible && (
            <>
              <ActivityIndicator
                style={{ position: 'absolute', top: 40, left: '50%' }}
                size="large"
              />
              <Text style={{textAlign: 'center'}}>Wait while pdf load</Text>
            </>
          )}
        </View>
      )}
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
  btnCss: {
    backgroundColor: 'black',
    width: '50%',
    height: 50,
    padding: 10,
    borderRadius: 7,
    marginRight: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontFamily: 'Cochin',
    color: 'white',
    fontWeight: 'bold',
  },
  errordiv: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcometxt: {
    color: "#040B22",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 3,
    fontFamily: "GeneralSansMedium",
  },
});

export default ViewCopDocs;
