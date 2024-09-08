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
import COLORS from "../../../constants/colors";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APILink from "../../../constants/globals";
import { useIsFocused } from "@react-navigation/native";

const CopDocumentUpload = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const isFocused = useIsFocused();

  const [inputs, setInputs] = React.useState({
    resproof: "",
  });

  const [coi, setCoi] = React.useState(false);
  const [coifmt, setCoifmt] = React.useState("");
  const [coistat, setCoistat] = React.useState("");
  const [coiurl, setCoiurl] = React.useState("");
  const [coisize, setCoisize] = React.useState("");

  const [dird, setDird] = React.useState(false);
  const [dirdfmt, setDirdfmt] = React.useState("");
  const [dirdstat, setDirdstat] = React.useState("");
  const [dirdurl, setDirdurl] = React.useState("");
  const [dirdsize, setDirdsize] = React.useState("");

  const [cons, setCons] = React.useState(false);
  const [consfmt, setConsfmt] = React.useState("");
  const [consstat, setConsstat] = React.useState("");
  const [consurl, setConsurl] = React.useState("");
  const [conssize, setConssize] = React.useState("");

  const [fins, setFins] = React.useState(false);
  const [finsfmt, setFinsfmt] = React.useState("");
  const [finsstat, setFinsstat] = React.useState("");
  const [finsurl, setFinsurl] = React.useState("");
  const [finssize, setFinssize] = React.useState("");

  const [bnk, setBnk] = React.useState(false);
  const [bnkfmt, setBnkfmt] = React.useState("");
  const [bnkstat, setBnkstat] = React.useState("");
  const [bnkurl, setBnkurl] = React.useState("");
  const [bnksize, setBnksize] = React.useState("");

  const [art, setArt] = React.useState(false);
  const [artfmt, setArtfmt] = React.useState("");
  const [artstat, setArtstat] = React.useState("");
  const [arturl, setArturl] = React.useState("");
  const [artsize, setArtsize] = React.useState("");

  const [moa, setMoa] = React.useState(false);
  const [moafmt, setMoafmt] = React.useState("");
  const [moastat, setMoastat] = React.useState("");
  const [moaurl, setMoaurl] = React.useState("");
  const [moasize, setMoasize] = React.useState("");

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

  //DOCS START HERE
  //Certificate of incoporation
  const pickCOIImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("CERT OF INC: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`No cert if inc selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "cac_document");
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
  const pickDIRImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("DIRECTORSHIP: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`No directorship selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "directorship");
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

  //CONSTITUTION
  const pickCONImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("CONSTITUTION: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`No constituion selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "constitution");
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

  //FINANCE
  const pickFINImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("FINANCE: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`No finance selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "financial_statement");
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

  //BANK
  const pickBANImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("BANK: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`No bank selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "bank_statement");
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

  //PBC
  const pickPBCImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("PBC: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`No pbc selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "pbc");
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

  //MOA
  const pickMOAImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("MOA: " + result.assets[0].uri);
    } catch (error) {
      selectedDoc = false;
      console.log(`No moa selected: ${error.message}`);
    }

    if (selectedDoc == true) {
      const fileNamExt = splitString(result.assets[0].uri);
      console.log(result);

      const formData = new FormData();
      const userID = await AsyncStorage.getItem("CIDID");
      formData.append("file_type", "image");
      formData.append("document_type", "moa");
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
    navigation.navigate("CopDocUploadB");
  };

  useEffect(() => {
    if (isFocused) {
      findFormData();
    }
  }, [props, isFocused]);

  const findFormData = async () => {
    try {
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

      if (responseJson.data.length == 7) {
        //Completed
        await AsyncStorage.setItem("CopDocument", "Yes");
      }

      responseJson.data.map((item) => {
        if (item.type == "cac_document") {
          setCoi(true);
          setCoifmt(item.file.type);
          setCoistat(item.status);
          setCoiurl(item.file.url);
        }

        if (item.type == "directorship") {
          setDird(true);
          setDirdfmt(item.file.type);
          setDirdstat(item.status);
          setDirdurl(item.file.url);
        }

        if (item.type == "constitution") {
          setCons(true);
          setConsfmt(item.file.type);
          setConsstat(item.status);
          setConsurl(item.file.url);
        }

        if (item.type == "financial_statement") {
          setFins(true);
          setFinsfmt(item.file.type);
          setFinsstat(item.status);
          setFinsurl(item.file.url);
        }

        if (item.type == "bank_statement") {
          setBnk(true);
          setBnkfmt(item.file.type);
          setBnkstat(item.status);
          setBnkurl(item.file.url);
        }

        if (item.type == "pbc") {
          setArt(true);
          setArtfmt(item.file.type);
          setArtstat(item.status);
          setArturl(item.file.url);
        }

        if (item.type == "moa") {
          setMoa(true);
          setMoafmt(item.file.type);
          setMoastat(item.status);
          setMoaurl(item.file.url);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                onPress={() => navigation.navigate("Directorship")}
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
          {coi == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
                Certificate Of Incorporation{" "}
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
                  <Text style={styles.txtUploadStateTop}>{coifmt}</Text>
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
                  <Text style={styles.txtOptions}>Delete</Text>
                </View>
              </View>
            </>
          )}
          {coi == false && (
            <>
              <Text style={styles.label}>Certificate Of Incorporation</Text>
              <TouchableOpacity
                onPress={() => pickCOIImage()}
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

          {dird == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
                Directorship Documents{" "}
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
                  <Text style={styles.txtUploadStateTop}>{dirdfmt}</Text>
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
                  <Text style={styles.txtOptions}>Delete</Text>
                </View>
              </View>
            </>
          )}

          {dird == false && (
            <>
              <Text style={styles.label}>Directorship Documents </Text>
              <TouchableOpacity
                onPress={() => pickDIRImage()}
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

          {cons == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
                Constitution{" "}
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
                  <Text style={styles.txtUploadStateTop}>{consfmt}</Text>
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
                  <Text style={styles.txtOptions}>Delete</Text>
                </View>
              </View>
            </>
          )}
          {cons == false && (
            <>
              <Text style={styles.label}>Constitution </Text>
              <TouchableOpacity
                onPress={() => pickCONImage()}
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

          {fins == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
              Financial Statements{" "}
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
                  <Text style={styles.txtUploadStateTop}>{finsfmt}</Text>
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
                  <Text style={styles.txtOptions}>Delete</Text>
                </View>
              </View>
            </>
          )}

          {fins == false && (
            <>
              <Text style={styles.label}>Financial Statements</Text>
              <TouchableOpacity
                onPress={() => pickFINImage()}
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

          {bnk == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
                Bank Statement{" "}
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
                  <Text style={styles.txtUploadStateTop}>{bnkfmt}</Text>
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
                  <Text style={styles.txtOptions}>Delete</Text>
                </View>
              </View>
            </>
          )}

          {bnk == false && (
            <>
              <Text style={styles.label}>Bank Statement</Text>
              <TouchableOpacity
                onPress={() => pickBANImage()}
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

          {art == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
                Articles of Association/PBC Document{" "}
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
                  <Text style={styles.txtUploadStateTop}>{artfmt}</Text>
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
                  <Text style={styles.txtOptions}>Delete</Text>
                </View>
              </View>
            </>
          )}
          {art == false && (
            <>
              <Text style={styles.label}>
                Articles of Association/PBC Document
              </Text>
              <TouchableOpacity
                onPress={() => pickPBCImage()}
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

          {moa == true && (
            <>
              <Text style={[styles.txtUploadingText, { marginTop: 20 }]}>
                Company Documents-MOA{" "}
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
                  <Text style={styles.txtUploadStateTop}>{moafmt}</Text>
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
                  <Text style={styles.txtOptions}>Delete</Text>
                </View>
              </View>
            </>
          )}

          {moa == false && (
            <>
              <Text style={styles.label}>Company Documents-MOA</Text>
              <TouchableOpacity
                onPress={() => pickMOAImage()}
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
  label: {
    marginTop: 20,
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
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

export default CopDocumentUpload;
