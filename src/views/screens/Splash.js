import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView
} from "react-native";
import { useFonts } from "expo-font";
import COLORS from "../../constants/colors";

const Splash = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [screen, setScreen] = useState(1);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      if (screen === 3) {
        setScreen(1);
      } else {
        setScreen(screen + 1);
      }
    }, 10000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [screen]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={styles.container}
      onTouchStart={(e) => (this.touchX = e.nativeEvent.pageX)}
      onTouchEnd={(e) => {
        if (this.touchX - e.nativeEvent.pageX > 20) {
          if (screen < 3) {
            setScreen(screen + 1);
          }
        }
        if (this.touchX - e.nativeEvent.pageX < 20) {
          if (screen > 1) {
            setScreen(screen - 1);
          }
        }
      }}
    >
      <StatusBar hidden={true} />
      {screen == 1 && (
        <ImageBackground
          source={require("../../../assets/Ellipse1.png")}
          style={styles.firstFlex}
        />
      )}
      {screen == 2 && (
        <ImageBackground
          source={require("../../../assets/Ellipse2.png")}
          style={styles.firstFlex}
        />
      )}
      {screen == 3 && (
        <ImageBackground
          source={require("../../../assets/Ellipse3.png")}
          style={styles.firstFlex}
        />
      )}

      <View style={styles.secondFlex}>
        <ScrollView>
          <View style={styles.textsView}>
            {screen == 1 && (
              <>
                <Text style={styles.textHeader}>
                  Peer to Peer Lending Platform
                </Text>
                <Text style={styles.textContent}>
                  An all in one platform where you can borrow from and invest
                  directly with real people. Not banks{" "}
                </Text>
              </>
            )}
            {screen == 2 && (
              <>
                <Text style={styles.textHeader}>For Borrowers</Text>
                <Text style={styles.textContent}>
                  If you're looking to borrow money, you can create a loan request
                  and set the terms of repayment that work for you.{" "}
                </Text>
              </>
            )}
            {screen == 3 && (
              <>
                <Text style={styles.textHeader}>For Lenders</Text>
                <Text style={styles.textContent}>
                  You're an investor, You can choose the loans that aligns best
                  with your investment strategy and fund them.
                </Text>
              </>
            )}
          </View>

          <View style={styles.pageControlView}>
            <View style={styles.controls}>
              {screen == 1 && (
                <>
                  <View>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: "black",
                        borderRadius: 8,
                      }}
                    ></View>
                  </View>
                  <View>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: "gray",
                        borderRadius: 8,
                      }}
                    ></View>
                  </View>
                  <View>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: "gray",
                        borderRadius: 8,
                      }}
                    ></View>
                  </View>
                </>
              )}
              {screen == 2 && (
                <>
                  <View>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: "gray",
                        borderRadius: 8,
                      }}
                    ></View>
                  </View>
                  <View>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: "black",
                        borderRadius: 8,
                      }}
                    ></View>
                  </View>
                  <View>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: "gray",
                        borderRadius: 8,
                      }}
                    ></View>
                  </View>
                </>
              )}
              {screen == 3 && (
                <>
                  <View>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: "gray",
                        borderRadius: 8,
                      }}
                    ></View>
                  </View>
                  <View>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: "gray",
                        borderRadius: 8,
                      }}
                    ></View>
                  </View>
                  <View>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: "black",
                        borderRadius: 8,
                      }}
                    ></View>
                  </View>
                </>
              )}
            </View>
          </View>

          <View style={styles.btnView}>
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.btnFirst}
                onPress={() => navigation.navigate("Signin")}
              >
                <Text style={styles.btnFirstText}>Login</Text>
                <Image
                  style={styles.icoimg}
                  source={require("../../../assets/signup-ico.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.btnSecond}
                onPress={() => navigation.navigate("OneOfThreeB")}
              >
                <Text style={styles.btnSecondText}>Sign Up</Text>
                <Image
                  style={styles.icoimg}
                  source={require("../../../assets/login-ico.png")}
                />
              </TouchableOpacity>
            </View>

          </View>
          
          <View style={styles.btnView}>
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.btnSecond}
                onPress={() => navigation.navigate("LogLenderCorp")}
              >
                <Text style={styles.btnSecondText}>Corp Lender</Text>
                <Image
                  style={styles.icoimg}
                  source={require("../../../assets/login-ico.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.btnSecond}
                onPress={() => navigation.navigate("LogLenderInd")}
              >
                <Text style={styles.btnSecondText}>Ind Lender</Text>
                <Image
                  style={styles.icoimg}
                  source={require("../../../assets/login-ico.png")}
                />
              </TouchableOpacity>
            </View>
          </View>


          <View style={styles.btnView}>

            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.btnSecond}
                onPress={() => navigation.navigate("LogBorrowerCorp")}
              >
                <Text style={styles.btnSecondText}>Borr Corporate</Text>
                <Image
                  style={styles.icoimg}
                  source={require("../../../assets/login-ico.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.btnSecond}
                onPress={() => navigation.navigate("LogBorrowerInd")}
              >
                <Text style={styles.btnSecondText}>Borr Individual</Text>
                <Image
                  style={styles.icoimg}
                  source={require("../../../assets/login-ico.png")}
                />
              </TouchableOpacity>
            </View>

          </View>


        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  firstFlex: {
    flex: 6,
  },
  secondFlex: {
    flex: 3,
    marginTop: 10,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "600",
    color: "#040B22",
    fontFamily: "GeneralSansMedium",
  },
  textContent: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    color: "#64748B",
    fontFamily: "GeneralSansRegular",
  },
  textsView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "3%",
  },
  pageControlView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#BFBFBF",
    width: 64,
    height: 24,
    borderRadius: 50,
  },
  btnView: {
    flexDirection: "row",
    width: "100%",
  },
  btn: {
    width: "50%",
  },
  btnFirst: {
    backgroundColor: COLORS.login,
    paddingLeft: 7,
    paddingRight: 2,
    paddingTop: 15,
    paddingBottom: 15,
    width: "90%",
    height: 55,
    borderRadius: 32,
    marginBottom: 50,
    marginLeft: 15,
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnSecond: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.login,
    paddingLeft: 7,
    paddingRight: 2,
    paddingTop: 15,
    paddingBottom: 15,
    width: "90%",
    height: 55,
    borderRadius: 32,
    marginBottom: 50,
    marginLeft: 15,
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnFirstText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    marginLeft: 10,
    fontFamily: "GeneralSansMedium",
  },
  btnSecondText: {
    color: "#1435AB",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    marginRight: 10,
    fontFamily: "GeneralSansMedium",
  },
  icoimg: {
    marginLeft: 10,
    height: 24,
    width: 24,
  },
});

export default Splash;
