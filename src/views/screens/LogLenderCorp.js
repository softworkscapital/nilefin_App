import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogLenderCorp = () => {
  const navigation = useNavigation();
  const [account_type, setAccount_type] = useState();

  useEffect(() => {
    setAccount_type("coporate"); // Example

    const saveData = async () => {
      await AsyncStorage.multiSet([
        ["TOKEN", "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2wiOiJsaW1wb3BvX3AycCIsImF1ZCI6ImxpbXBvcG9fcDJwIiwiZXhwIjoxNzI3ODYzMzMwLCJpYXQiOjE3MjU0NDQxMzAsImlwX2FkZHJlc3MiOiI6OmZmZmY6MTI3LjAuMC4xIiwiaXNzIjoibGltcG9wb19wMnAiLCJqdGkiOiJmNTAwZjBjMy03NmUzLTQ2YWItODE1NC04MmMzMjJlNDQ0ZTYiLCJuYmYiOjE3MjU0NDQxMjksInN1YiI6IjE2NjRhOTU0LTA1ZjItNDE4Ni1hZThiLTZkODNjZWZkYWQ1MyIsInR5cCI6ImFjY2VzcyIsInVzZXJfaWQiOiIxNjY0YTk1NC0wNWYyLTQxODYtYWU4Yi02ZDgzY2VmZGFkNTMifQ.Rs8jc3wq9lLSyLX-j9sWkv1a18AXOV6WRdWRqs-xv0oZYs3oZ_di0HI15YDhV32SVWeHdsUIa4af69IWwJ4taw"],
        ["PIN", "0000"],
        ["CIDID", "63-888938398-C66"],
        ["USRIMG", ""],
        ["ACCTYPE", "coporate"],
        ["USRTYPE", "lender"],
        ["USRBALANCE", "200"],
        ["CIDEmail", "tinotendamurinye@gmail.com"],
        ["CIDName", "Tinotenda Murinye"],
        ["CIDMobileNum", "263778878878"],
        ["CPINSET", "Set"],
      ]);

      if (account_type === "individual") {
        let personalDone = "Yes";
        let identificationDone = "Yes";
        let employmentDone = "Yes";
        let docuploadDone = "Yes";
        let donePercent = 20;

        await AsyncStorage.setItem("IndPersonal", personalDone);
        donePercent += 20;

        await AsyncStorage.setItem("IndContact", identificationDone);
        donePercent += 20;

        await AsyncStorage.setItem("IndEmployment", employmentDone);
        donePercent += 20;

        await AsyncStorage.setItem("IndDocument", docuploadDone);
        donePercent += 20;

        await AsyncStorage.setItem("IndPerc", donePercent.toString());
      } else if (account_type === "corporate") {
        // Handle corporate account type
      }

      navigation.navigate("FirstTimeWelcome2");
    };

    saveData();
  }, [account_type, navigation]);

  return (
    <View>
      <Text>Your component content here</Text>
    </View>
  );
};

export default LogLenderCorp;