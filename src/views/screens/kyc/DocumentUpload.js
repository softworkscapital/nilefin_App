import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import RNPickerSelect from "react-native-picker-select";
import COLORS from "../../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APILink from "../../../constants/globals";
import * as DocumentPicker from "expo-document-picker";
import { useIsFocused } from "@react-navigation/native";

const DocumentUpload = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const isFocused = useIsFocused();

  const [userdocs, setUserdocs] = React.useState([]);

  const [propic, setPropic] = React.useState(false);
  const [propicfmt, setPropicfmt] = React.useState("");
  const [propicstat, setPropicstat] = React.useState("");
  const [propicurl, setPropicurl] = React.useState("");
  const [propicdone, setPropicdone] = React.useState("");

  const [addr, setAddr] = React.useState(false);
  const [addrfmt, setAddrfmt] = React.useState("");
  const [addrstat, setAddrstat] = React.useState("");
  const [addrurl, setAddrurl] = React.useState("");
  const [addrdone, setAddrdone] = React.useState("");

  const [govid, setGovid] = React.useState(false);
  const [govidfmt, setGovidfmt] = React.useState("");
  const [govidstat, setGovidstat] = React.useState("");
  const [govidurl, setGovidurl] = React.useState("");
  const [goviddone, setGoviddone] = React.useState("");

  const [propown, setPropown] = React.useState(false);
  const [propownfmt, setPropownfmt] = React.useState("");
  const [propownstat, setPropownstat] = React.useState("");
  const [propownurl, setPropownurl] = React.useState("");
  const [propowndone, setPropowndone] = React.useState("");

  const [nok, setNok] = React.useState(false);
  const [nokfmt, setNokfmt] = React.useState("");
  const [nokstat, setNokstat] = React.useState("");
  const [nokurl, setNokurl] = React.useState("");
  const [nokdone, setNokdone] = React.useState("");

  const [inputs, setInputs] = React.useState({
    resproof: "",
  });

  const [image, setImage] = React.useState(null);

  const splitString = (str) => {
    let resultArray = [];
    let tempString = "";
    for (var i = 0; i < str.length; i++) {
      if (str[i] !== ".") {
        tempString += str[i];
      } else if (tempString.trim()) {
        //minor change
        resultArray.push(tempString);
        tempString = "";
      }
    }
    if (tempString) {
      //new step
      resultArray.push(tempString);
    }
    const last = resultArray[resultArray.length - 1];
    return last;
  };

  //FILE PICK FUNCTIONS

  //Profile Pic
  const pickPPCImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("PROFILE PIC: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`Nothing propic selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "profile_picture");
      formData.append("file", {
        name: userID + "." + fileNamExt,
        type: "image/jpeg" || "image/png" || "image/jpg",
        uri: result.assets[0].uri,
      });

      const asynctoken = await AsyncStorage.getItem("TOKEN");

      const apiLink = APILink.getLink();
      let res = await fetch(`${apiLink}/kyc/users/documents/upload`, {
        method: "post",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${asynctoken}`,
        },
      });
      let responseJson = await res.json();
      console.log(responseJson);

      //Success
      try {
        if (responseJson.status == "success") {
          Alert.alert("Uploaded Successfully");
          findFormData();
          return;
        }
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }

      //Failure
      try {
        if (responseJson.errors.document_type) {
          Alert.alert(responseJson.errors.document_type.toString());
        }
        return;
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }
    }
  };

  //Prof of address
  const pickADRImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("ADDR PROOF: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`Nothing address selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "proof_of_address");
      formData.append("file", {
        name: userID + "." + fileNamExt,
        type: "image/jpeg" || "image/png" || "image/jpg",
        uri: result.assets[0].uri,
      });

      const asynctoken = await AsyncStorage.getItem("TOKEN");

      const apiLink = APILink.getLink();
      let res = await fetch(`${apiLink}/kyc/users/documents/upload`, {
        method: "post",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${asynctoken}`,
        },
      });
      let responseJson = await res.json();
      console.log(responseJson);

      //Success
      try {
        if (responseJson.status == "success") {
          Alert.alert("Uploaded Successfully");
          findFormData();
          return;
        }
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }

      //Failure
      try {
        if (responseJson.errors.document_type) {
          Alert.alert(responseJson.errors.document_type.toString());
        }
        return;
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }
    }
  };

  //GVT ISSUED ID
  const pickIICImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("ISSUED ID CARD: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`Nothing issued id selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "id_card");
      formData.append("file", {
        name: userID + "." + fileNamExt,
        type: "image/jpeg" || "image/png" || "image/jpg",
        uri: result.assets[0].uri,
      });

      const asynctoken = await AsyncStorage.getItem("TOKEN");

      const apiLink = APILink.getLink();
      let res = await fetch(`${apiLink}/kyc/users/documents/upload`, {
        method: "post",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${asynctoken}`,
        },
      });
      let responseJson = await res.json();
      console.log(responseJson);

      //Success
      try {
        if (responseJson.status == "success") {
          Alert.alert("Uploaded Successfully");
          findFormData();
          return;
        }
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }

      //Failure
      try {
        if (responseJson.errors.document_type) {
          Alert.alert(responseJson.errors.document_type.toString());
        }
        return;
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }
    }
  };

  //NEXT OF KEEN ID
  const pickNOKImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("NEXT OF KIN: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`Nothing keen keen selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "next_of_kin_id_card");
      formData.append("file", {
        name: userID + "." + fileNamExt,
        type: "image/jpeg" || "image/png" || "image/jpg",
        uri: result.assets[0].uri,
      });

      const asynctoken = await AsyncStorage.getItem("TOKEN");

      const apiLink = APILink.getLink();
      let res = await fetch(`${apiLink}/kyc/users/documents/upload`, {
        method: "post",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${asynctoken}`,
        },
      });
      let responseJson = await res.json();
      console.log(responseJson);

      //Success
      try {
        if (responseJson.status == "success") {
          Alert.alert("Uploaded Successfully");
          findFormData();
          return;
        }
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }

      //Failure
      try {
        if (responseJson.errors.document_type) {
          Alert.alert(responseJson.errors.document_type.toString());
        }
        return;
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }
    }
  };

  //PROP OWN DOCS
  const pickPROImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("PROPERTY OWNERSHIP: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`Nothing prop own docs selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "property_document");
      formData.append("file", {
        name: userID + "." + fileNamExt,
        type: "image/jpeg" || "image/png" || "image/jpg",
        uri: result.assets[0].uri,
      });

      const asynctoken = await AsyncStorage.getItem("TOKEN");

      const apiLink = APILink.getLink();
      let res = await fetch(`${apiLink}/kyc/users/documents/upload`, {
        method: "post",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${asynctoken}`,
        },
      });
      let responseJson = await res.json();
      console.log(responseJson);

      //Success
      try {
        if (responseJson.status == "success") {
          Alert.alert("Uploaded Successfully");
          findFormData();
          return;
        }
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }

      //Failure
      try {
        if (responseJson.errors.document_type) {
          Alert.alert(responseJson.errors.document_type.toString());
        }
        return;
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }
    }
  };

  const handleSubmit = () => {
    navigation.navigate("CompleteProfile");
  };

  useEffect(() => {
    if (isFocused) {
      findFormData();
    }
  }, [props, isFocused]);

  const findFormData = async () => {
    try {
      const propicasync = await AsyncStorage.getItem("PROPICSET");
      if (propicasync != null) {
        setPropicdone(propicasync);
      }
      const addrasync = await AsyncStorage.getItem("PROADDRSET");
      if (addrasync != null) {
        setAddrdone(addrasync);
      }
      const govidasync = await AsyncStorage.getItem("IDSET");
      if (govidasync != null) {
        setGoviddone(govidasync);
      }
      const propownasync = await AsyncStorage.getItem("PRODOCSET");
      if (propownasync != null) {
        setPropowndone(propownasync);
      }
      const nokasync = await AsyncStorage.getItem("NOKSET");
      if (nokasync != null) {
        setNokdone(nokasync);
      }

      const asynctoken = await AsyncStorage.getItem("TOKEN");
      const apiLink = APILink.getLink();
      let registerResponse = await fetch(`${apiLink}/kyc/users/documents`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      });

      let responseJson = await registerResponse.json();

      if (responseJson.data.length == 5) {
        //Completed
        await AsyncStorage.setItem("IndDocument", "Yes");
      }

      responseJson.data.map((item) => {
        if (item.type == "profile_picture") {
          setPropic(true);
          setPropicfmt(item.file.type);
          setPropicstat(item.status);
          setPropicurl(item.file.url);
          console.log("found");
        }

        if (item.type == "proof_of_address") {
          setAddr(true);
          setAddrfmt(item.file.type);
          setAddrstat(item.status);
          setAddrurl(item.file.url);
          console.log("found pr");
        }

        if (item.type == "id_card") {
          setGovid(true);
          setGovidfmt(item.file.type);
          setGovidstat(item.status);
          setGovidurl(item.file.url);
        }

        if (item.type == "property_document") {
          setPropown(true);
          setPropownfmt(item.file.type);
          setPropownstat(item.status);
          setPropownurl(item.file.url);
        }

        if (item.type == "next_of_kin_id_card") {
          setNok(true);
          setNokfmt(item.file.type);
          setNokstat(item.status);
          setNokurl(item.file.url);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const proOfAddView = async () =>{
    try {
      await AsyncStorage.setItem("DOCLINK", "https://www.princexml.com/samples/invoice/invoicesample.pdf");
      console.log("Data set");
    } catch (exception) {
      console.log(exception);
    }
    navigation.navigate('ViewCopDocs');
  }

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
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("EmploymentDetails")}
                style={{ marginRight: 10, marginTop: 5, flexDirection: "row" }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../../../assets/arrow-left.png")}
                />
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 18,
                    marginLeft: 10,
                    fontWeight: "500",
                    fontFamily: "GeneralSansRegular",
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "50%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "500",
                  fontFamily: "GeneralSansRegular",
                  backgroundColor: COLORS.cyan,
                  padding: 7,
                  borderRadius: 6,
                  marginTop: 2,
                }}
              >
                Step 4 of 4
              </Text>
            </View>
          </View>
          <Text style={styles.welcometxt}>Document Upload</Text>
          <Text style={styles.instruction}>
            Please provide the required information.
          </Text>

          {propic == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
                Profile Picture{" "}
              </Text>
              <View style={styles.uploadStateView}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                  }}
                >
                  <Image
                    style={{ width: 28, height: 28 }}
                    source={require("../../../../assets/uploadicon.png")}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "80%",
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.txtUploadStateTop}>{propicfmt}</Text>
                  <Text style={styles.txtUploadStateBtm}>
                    200 KB – 100% uploaded
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../../assets/tick.png")}
                  />
                </View>
              </View>
              <View style={styles.uploadStateOpt}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Text style={[styles.txtOptions, { marginRight: 10 }]}>
                    View
                  </Text>
                  {propicdone == "" && (
                    <>
                      <Text style={styles.txtOptions}>Delete</Text>
                    </>
                  )}
                </View>
              </View>
            </>
          )}
          {propic == false && (
            <>
              <Text style={styles.label}>Upload Your Picture</Text>
              <TouchableOpacity
                onPress={() => pickPPCImage()}
                style={styles.kycItem}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    borderWidth: 4,
                    borderColor: "#FFFFFF",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../../assets/cloud.png")}
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 14,
                      fontWeight: "500",
                      marginTop: 10,
                      marginLeft: "2%",
                      fontFamily: "GeneralSansMedium",
                    }}
                  >
                    Click to upload{" "}
                    <Text
                      style={{
                        color: "#667085",
                        fontSize: 14,
                        fontWeight: "400",
                        marginTop: 10,
                        marginLeft: "2%",
                        fontFamily: "GeneralSansRegular",
                      }}
                    >
                      or drag and drop
                    </Text>
                  </Text>

                  <Text
                    style={{
                      color: "#667085",
                      fontSize: 14,
                      fontWeight: "400",
                      marginTop: 10,
                      marginLeft: "2%",
                      fontFamily: "GeneralSansRegular",
                    }}
                  >
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          {addr == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
                Proof Of Address{" "}
              </Text>
              <View style={styles.uploadStateView}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                  }}
                >
                  <Image
                    style={{ width: 28, height: 28 }}
                    source={require("../../../../assets/uploadicon.png")}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "80%",
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.txtUploadStateTop}>{addrfmt}</Text>
                  <Text style={styles.txtUploadStateBtm}>
                    200 KB – 100% uploaded
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../../assets/tick.png")}
                  />
                </View>
              </View>
              <View style={styles.uploadStateOpt}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Text onPress={()=>{proOfAddView()}} style={[styles.txtOptions, { marginRight: 10 }]}>
                    View
                  </Text>
                  {addrdone == "" && (
                    <>
                      <Text style={styles.txtOptions}>Delete</Text>
                    </>
                  )}
                </View>
              </View>
            </>
          )}
          {addr == false && (
            <>
              <View style={styles.innera}>
                <Text style={styles.label}>Proof of Address</Text>
                <View style={styles.selectContainer}>
                  <RNPickerSelect
                    onValueChange={(text) =>
                      setInputs({ ...inputs, resproof: text })
                    }
                    items={[
                      { label: "Utility bill", value: "Utility bill", key: 1 },
                      {
                        label: "Bank statement",
                        value: "Bank statement",
                        key: 2,
                      },
                      { label: "Contract", value: "Contract", key: 3 },
                      {
                        label: "Driving license",
                        value: "Driving license",
                        key: 4,
                      },
                      {
                        label: "Property tax receipt",
                        value: "Property tax receipt",
                        key: 5,
                      },
                      {
                        label: "Tax assessment",
                        value: "Tax assessment",
                        key: 6,
                      },
                      {
                        label: "Car insurance",
                        value: "Car insurance",
                        key: 7,
                      },
                      {
                        label: "Lease or mortgage statement",
                        value: "Lease or mortgage statement",
                        key: 8,
                      },
                      {
                        label: "Car registration",
                        value: "Car registration",
                        key: 9,
                      },
                      {
                        label: "Credit card bill",
                        value: "Credit card bill",
                        key: 10,
                      },
                      {
                        label: "Employment letter",
                        value: "Employment letter",
                        key: 11,
                      },
                      {
                        label: "Mortgage statement",
                        value: "Mortgage statement",
                        key: 12,
                      },
                      {
                        label: "Voter registration card",
                        value: "Voter registration card",
                        key: 13,
                      },
                      { label: "Insurance", value: "Insurance", key: 14 },
                      {
                        label: "Landline bill",
                        value: "Landline bill",
                        key: 15,
                      },
                      {
                        label: "Local government ID",
                        value: "Local government ID",
                        key: 16,
                      },
                      {
                        label: "Pension statement",
                        value: "Pension statement",
                        key: 17,
                      },
                      { label: "Bills", value: "Bills", key: 18 },
                      {
                        label: "Company",
                        value: "Company",
                        key: 19,
                      },
                      {
                        label: "Insurance policy",
                        value: "Insurance policy",
                        key: 20,
                      },
                      { label: "Mail", value: "Mail", key: 21 },
                      {
                        label: "Statement from financial institution",
                        value: "Statement from financial institution",
                        key: 22,
                      },
                      {
                        label: "Tax forms",
                        value: "Tax forms",
                        key: 23,
                      },
                      {
                        label: "Residence permit",
                        value: "Residence permit",
                        key: 24,
                      },
                    ]}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => pickADRImage()}
                style={styles.kycItem}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    borderWidth: 4,
                    borderColor: "#FFFFFF",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../../assets/cloud.png")}
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 14,
                      fontWeight: "500",
                      marginTop: 10,
                      marginLeft: "2%",
                      fontFamily: "GeneralSansMedium",
                    }}
                  >
                    Click to upload{" "}
                    <Text
                      style={{
                        color: "#667085",
                        fontSize: 14,
                        fontWeight: "400",
                        marginTop: 10,
                        marginLeft: "2%",
                        fontFamily: "GeneralSansRegular",
                      }}
                    >
                      or drag and drop
                    </Text>
                  </Text>

                  <Text
                    style={{
                      color: "#667085",
                      fontSize: 14,
                      fontWeight: "400",
                      marginTop: 10,
                      marginLeft: "2%",
                      fontFamily: "GeneralSansRegular",
                    }}
                  >
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {govid == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
                Government Issued ID Card{" "}
              </Text>
              <View style={styles.uploadStateView}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                  }}
                >
                  <Image
                    style={{ width: 28, height: 28 }}
                    source={require("../../../../assets/uploadicon.png")}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "80%",
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.txtUploadStateTop}>{govidfmt}</Text>
                  <Text style={styles.txtUploadStateBtm}>
                    200 KB – 100% uploaded
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../../assets/tick.png")}
                  />
                </View>
              </View>
              <View style={styles.uploadStateOpt}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Text style={[styles.txtOptions, { marginRight: 10 }]}>
                    View
                  </Text>
                  {goviddone == "" && (
                    <>
                      <Text style={styles.txtOptions}>Delete</Text>
                    </>
                  )}
                </View>
              </View>
            </>
          )}
          {govid == false && (
            <>
              <View style={styles.innera}>
                <Text style={styles.label}>Government Issued ID Card</Text>
                <View style={styles.selectContainer}>
                  <RNPickerSelect
                    onValueChange={(text) =>
                      setInputs({ ...inputs, resproof: text })
                    }
                    items={[
                      {
                        label: "Driver license",
                        value: "Driver license",
                        key: 1,
                      },
                      { label: "Passport", value: "Passport", key: 2 },
                      { label: "National ID", value: "National ID", key: 3 },
                      {
                        label: "Certificate of Citizenship",
                        value: "Certificate of Citizenship",
                        key: 4,
                      },
                      {
                        label: "Birth Certificate",
                        value: "Birth Certificate",
                        key: 5,
                      },
                    ]}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => pickIICImage()}
                style={styles.kycItem}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    borderWidth: 4,
                    borderColor: "#FFFFFF",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../../assets/cloud.png")}
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 14,
                      fontWeight: "500",
                      marginTop: 10,
                      marginLeft: "2%",
                      fontFamily: "GeneralSansMedium",
                    }}
                  >
                    Click to upload{" "}
                    <Text
                      style={{
                        color: "#667085",
                        fontSize: 14,
                        fontWeight: "400",
                        marginTop: 10,
                        marginLeft: "2%",
                        fontFamily: "GeneralSansRegular",
                      }}
                    >
                      or drag and drop
                    </Text>
                  </Text>

                  <Text
                    style={{
                      color: "#667085",
                      fontSize: 14,
                      fontWeight: "400",
                      marginTop: 10,
                      marginLeft: "2%",
                      fontFamily: "GeneralSansRegular",
                    }}
                  >
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          {propown == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
                Property Ownership Document{" "}
              </Text>
              <View style={styles.uploadStateView}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                  }}
                >
                  <Image
                    style={{ width: 28, height: 28 }}
                    source={require("../../../../assets/uploadicon.png")}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "80%",
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.txtUploadStateTop}>{propownfmt}</Text>
                  <Text style={styles.txtUploadStateBtm}>
                    200 KB – 100% uploaded
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../../assets/tick.png")}
                  />
                </View>
              </View>
              <View style={styles.uploadStateOpt}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Text style={[styles.txtOptions, { marginRight: 10 }]}>
                    View
                  </Text>
                  {propowndone == "" && (
                    <>
                      <Text style={styles.txtOptions}>Delete</Text>
                    </>
                  )}
                </View>
              </View>
            </>
          )}

          {propown == false && (
            <>
              <View style={styles.innera}>
                <Text style={styles.label}>Property Ownership Documents</Text>
                <View style={styles.selectContainer}>
                  <RNPickerSelect
                    onValueChange={(text) =>
                      setInputs({ ...inputs, resproof: text })
                    }
                    items={[
                      { label: "Gift deed", value: "Gift deed", key: 1 },
                      { label: "Certificate", value: "Certificate", key: 2 },
                      {
                        label: "Warranty deed",
                        value: "Warranty deed",
                        key: 3,
                      },
                      {
                        label: "Mortgage deed",
                        value: "Mortgage deed",
                        key: 4,
                      },
                      {
                        label: "Quitclaim deed",
                        value: "Quitclaim deed",
                        key: 5,
                      },
                      {
                        label: "Deed of trust",
                        value: "Deed of trust",
                        key: 6,
                      },
                      {
                        label: "Rental agreement",
                        value: "Rental agreement",
                        key: 7,
                      },
                      {
                        label: "Title deed",
                        value: "Title deed",
                        key: 8,
                      },
                      {
                        label: "Completion certificate",
                        value: "Completion certificate",
                        key: 9,
                      },
                      {
                        label: "Payment receipts",
                        value: "Payment receipts",
                        key: 10,
                      },
                      {
                        label: "Allotment letter",
                        value: "Allotment letter",
                        key: 11,
                      },
                      {
                        label: "Title transfer document",
                        value: "Title transfer document",
                        key: 12,
                      },
                      { label: "Tax deed", value: "Tax deed", key: 13 },
                      {
                        label: "Chattel mortgage",
                        value: "Chattel mortgage",
                        key: 14,
                      },
                      {
                        label: "Freehold title",
                        value: "Freehold title",
                        key: 15,
                      },
                      {
                        label: "Grant of Probate",
                        value: "Grant of Probate",
                        key: 16,
                      },
                      {
                        label: "Joint Development Agreement",
                        value: "Joint Development Agreement",
                        key: 17,
                      },
                      {
                        label: "Khata certificate",
                        value: "Khata certificate",
                        key: 18,
                      },
                      {
                        label: "Land agreement",
                        value: "Land agreement",
                        key: 19,
                      },
                    ]}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => pickPROImage()}
                style={styles.kycItem}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    borderWidth: 4,
                    borderColor: "#FFFFFF",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../../assets/cloud.png")}
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 14,
                      fontWeight: "500",
                      marginTop: 10,
                      marginLeft: "2%",
                      fontFamily: "GeneralSansMedium",
                    }}
                  >
                    Click to upload{" "}
                    <Text
                      style={{
                        color: "#667085",
                        fontSize: 14,
                        fontWeight: "400",
                        marginTop: 10,
                        marginLeft: "2%",
                        fontFamily: "GeneralSansRegular",
                      }}
                    >
                      or drag and drop
                    </Text>
                  </Text>

                  <Text
                    style={{
                      color: "#667085",
                      fontSize: 14,
                      fontWeight: "400",
                      marginTop: 10,
                      marginLeft: "2%",
                      fontFamily: "GeneralSansRegular",
                    }}
                  >
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          {nok == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
                Next Of Kin ID{" "}
              </Text>
              <View style={styles.uploadStateView}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                  }}
                >
                  <Image
                    style={{ width: 28, height: 28 }}
                    source={require("../../../../assets/uploadicon.png")}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "80%",
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.txtUploadStateTop}>{nokfmt}</Text>
                  <Text style={styles.txtUploadStateBtm}>
                    200 KB – 100% uploaded
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../../assets/tick.png")}
                  />
                </View>
              </View>
              <View style={styles.uploadStateOpt}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Text style={[styles.txtOptions, { marginRight: 10 }]}>
                    View
                  </Text>
                  {nokdone == "" && (
                    <>
                      <Text style={styles.txtOptions}>Delete</Text>
                    </>
                  )}
                </View>
              </View>
            </>
          )}

          {nok == false && (
            <>
              <View style={styles.innera}>
                <Text style={styles.label}>Next of Kin ID</Text>
                <View style={styles.selectContainer}>
                  <RNPickerSelect
                    onValueChange={(text) =>
                      setInputs({ ...inputs, resproof: text })
                    }
                    items={[
                      {
                        label: "Driver license",
                        value: "Driver license",
                        key: 1,
                      },
                      { label: "Passport", value: "Passport", key: 2 },
                      { label: "National ID", value: "National ID", key: 3 },
                      {
                        label: "Certificate of Citizenship",
                        value: "Certificate of Citizenship",
                        key: 4,
                      },
                      {
                        label: "Birth Certificate",
                        value: "Birth Certificate",
                        key: 5,
                      },
                    ]}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => pickNOKImage()}
                style={styles.kycItem}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    borderWidth: 4,
                    borderColor: "#FFFFFF",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../../assets/cloud.png")}
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 14,
                      fontWeight: "500",
                      marginTop: 10,
                      marginLeft: "2%",
                      fontFamily: "GeneralSansMedium",
                    }}
                  >
                    Click to upload{" "}
                    <Text
                      style={{
                        color: "#667085",
                        fontSize: 14,
                        fontWeight: "400",
                        marginTop: 10,
                        marginLeft: "2%",
                        fontFamily: "GeneralSansRegular",
                      }}
                    >
                      or drag and drop
                    </Text>
                  </Text>

                  <Text
                    style={{
                      color: "#667085",
                      fontSize: 14,
                      fontWeight: "400",
                      marginTop: 10,
                      marginLeft: "2%",
                      fontFamily: "GeneralSansRegular",
                    }}
                  >
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          <View style={{ flexDirection: "row", marginVertical: 20 }}>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              activeOpacity={0.7}
              style={styles.btn1}
            >
              <Text style={styles.btn1Text}>Save Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("KycCompleted")}
              activeOpacity={0.7}
              style={styles.btn2}
            >
              <Text style={styles.btn2Text}>Complete</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    marginTop: 10,
    fontFamily: "GeneralSansMedium",
  },
  kycItem: {
    flexDirection: "column",
    marginTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 15,
    paddingRight: "6%",
    borderWidth: 2,
    borderColor: "#D0D7EE",
    borderStyle: "dashed",
    backgroundColor: "#F0F2FA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innera: {
    marginBottom: 20,
  },
  label: {
    marginTop: 20,
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
  },
  selectContainer: {
    height: 55,
    backgroundColor: "#F0F2FA",
    paddingHorizontal: 2,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#D0D7EE",
    marginTop: 5,
  },
  btn1: {
    height: 55,
    width: "50%",
    backgroundColor: "#FFFFFF",
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.login,
    flexDirection: "row",
  },
  btn1Text: {
    color: COLORS.signed,
    fontWeight: "500",
    fontSize: 18,
  },
  btn2: {
    height: 55,
    width: "50%",
    backgroundColor: COLORS.signed,
    marginTop: 3,
    marginLeft: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.login,
    flexDirection: "row",
  },
  btn2Text: {
    color: COLORS.white,
    fontWeight: "500",
    fontSize: 18,
  },
  uploadStateView: {
    width: "100%",
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A1A1AA",
    height: 64,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  txtUploadStateTop: {
    color: "#344054",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GeneralSansRegular",
  },
  txtUploadStateBtm: {
    color: "#667085",
    fontWeight: "400",
    fontSize: 12,
    fontFamily: "GeneralSansRegular",
  },
  uploadStateOpt: {
    width: "100%",
    marginTop: 5,
    flexDirection: "row",
    paddingVertical: 5,
  },
  txtOptions: {
    color: "#505050",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
  },
  txtUploadingText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
  },
});

export default DocumentUpload;
