import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogBorrowerInd = () => {
  const navigation = useNavigation();
  const [account_type, setAccount_type] = useState();

  useEffect(() => {
    setAccount_type("individual"); // Example

    const saveData = async () => {
      await AsyncStorage.multiSet([
        ["TOKEN", "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2wiOiJsaW1wb3BvX3AycCIsImF1ZCI6ImxpbXBvcG9fcDJwIiwiZXhwIjoxNzEwOTI3MDM4LCJpYXQiOjE3MDg1MDc4MzgsImlwX2FkZHJlc3MiOiIxMjcuMC4wLjEiLCJpc3MiOiJsaW1wb3BvX3AycCIsImp0aSI6IjE5YmRkMTkzLTRlNTAtNGQ5ZS1hMzVhLTg1YWRhZTYwMjBjMSIsIm5iZiI6MTcwODUwNzgzNywic3ViIjoiMzdiODZiYzktZWVkNy00NDQxLWE4OWUtZDUxYjlhZGZmNTYzIiwidHlwIjoiYWNjZXNzIiwidXNlcl9pZCI6IjM3Yjg2YmM5LWVlZDctNDQ0MS1hODllLWQ1MWI5YWRmZjU2MyJ9.ekbORfJDzeU_X57-qrxpf6WpZET70n0-VJxjt4cHLpXvU_kg5--xALUNM1pGNjJlA4t1oYhHubsCGVmNlr8RwA"],
        ["PIN", "0000"],
        ["CIDID", "63-888938398-C66"],
        ["USRIMG", ""],
        ["ACCTYPE", "individual"],
        ["USRTYPE", "borrower"],
        ["USRBALANCE", "200"],
        ["CIDEmail", "flash.u.p.4.a.l.l@gmail.com"],
        ["CIDName", "Munaxe Mudoti"],
        ["CIDMobileNum", "263778878878"],
        ["CPINSET", "Set"],
        ["CreditScore", "400"],
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

      navigation.navigate("FirstTimeWelcome");
    };

    saveData();
  }, [account_type, navigation]);

  return (
    <View>
      <Text>Your component content here</Text>
    </View>
  );
};

export default LogBorrowerInd;