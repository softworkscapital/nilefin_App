import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";

const jsonData = [
  {
    id: 1,
    issue: "Transection Failure",
    answer:
      "Be patient for 24 hours. If the problem persists, please give us a call.",
    opened: false,
  },
  {
    id: 2,
    issue: "No Receipt",
    answer: "Be patient, the receipt will come.",
    opened: false,
  },
  {
    id: 3,
    issue: "Borrower has not paid my loan",
    answer:
      "Please call us on our customer care number. We will surely assist you there",
    opened: false,
  },
  {
    id: 4,
    issue: "No Receipt",
    answer: "Be patient, the receipt will come.",
    opened: false,
  },
  {
    id: 5,
    issue: "Borrower has not paid my loan",
    answer:
      "Please call us on our customer care number. We will surely assist you there",
    opened: false,
  },
];

const RepayLoans = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'GeneralSansMedium': require('../../../../assets/font/GeneralSans-Medium.otf'),
    'GeneralSansRegular': require('../../../../assets/font/GeneralSans-Regular.otf'),
    'SFProTextRegular': require('../../../../assets/font/SF-Pro-Text-Regular.otf')
  });

  const [isOpen, setIsOpen] = useState(false);
  const [issues, setIssues] = useState([]);

  const changeState = (id) => {
    let markers = [...issues];
    let index = markers.findIndex((el) => el.id == id);
    markers[index] = { ...markers[index], opened: !markers[index].opened };
    //setIssues({ markers });
    setIssues(markers);
  };

  const OneItem = ({ id, issue, answer, opened }) => (
    <TouchableOpacity onPress={() => changeState(id.toString())}>
      <View
        style={[
          opened == false && styles.issueViewClose,
          opened == true && styles.issueViewOpen,
        ]}
      >
        <View style={styles.issueTextView}>
          <Text
            style={[
              opened == false && styles.issueTextClose,
              opened == true && styles.issueTextOpen,
            ]}
          >
            {issue}
          </Text>
        </View>
        <View style={styles.issueTogglerView}>
          <View>
            {opened == true && (
              <TouchableOpacity onPress={() => changeState(id.toString())}>
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    marginTop: 10,
                    marginRight: 10,
                    alignSelf: "flex-end",
                  }}
                  source={require("../../../../assets/opened.png")}
                />
              </TouchableOpacity>
            )}
            {opened == false && (
              
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    marginTop: 10,
                    marginRight: 10,
                    alignSelf: "flex-end",
                  }}
                  source={require("../../../../assets/closed.png")}
                />
              
            )}
          </View>
        </View>
      </View>
      {opened && (
        <View style={styles.issueAnswerView}>
          <Text style={styles.ansText}>{answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <OneItem
      id={item.id}
      issue={item.issue}
      answer={item.answer}
      opened={item.opened}
    />
  );

  useEffect(() => {
    const asyncFetch = () => {
      //Call API HERE
      setIssues(jsonData);
    };
    asyncFetch();
  }, []);


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
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Faqs')}
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
        <Text style={styles.welcometxt}>Repay Loans</Text>

        <View style={styles.issuesView}>
          {issues && (
            <FlatList
              data={issues}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
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
    marginTop: 20,
    fontFamily: 'GeneralSansMedium'
  },
  issuesView: {
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 40,
  },
  issueViewOpen: {
    flexDirection: "row",
    marginTop: 8,
    paddingTop: 5,
    paddingBottom: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1435AB",
  },
  issueViewClose: {
    flexDirection: "row",
    marginTop: 8,
    paddingTop: 5,
    paddingBottom: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D4D4D8",
  },
  issueAnswerView: {
    paddingTop: 5,
    paddingBottom: 18,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D4D4D8",
  },
  issueTextView: {
    flex: 8,
  },
  issueTextOpen: {
    color: "#1435AB",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    fontFamily: 'GeneralSansMedium'
  },
  issueTextClose: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    fontFamily: 'GeneralSansMedium'
  },
  ansText: {
    color: "#6B778C",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 5,
    fontFamily: 'GeneralSansRegular'
  },
  issueTogglerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default RepayLoans;
