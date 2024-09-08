import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APILink from "../../../constants/globals";
import * as DocumentPicker from "expo-document-picker";
import { setImageAsync } from "expo-clipboard";

const KycDoc = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    GeneralSansMedium: require("../../../../assets/font/GeneralSans-Medium.otf"),
    GeneralSansRegular: require("../../../../assets/font/GeneralSans-Regular.otf"),
    SFProTextRegular: require("../../../../assets/font/SF-Pro-Text-Regular.otf"),
  });

  const [image, setImage] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const [ubimage, setUbimage] = useState(false);

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

  //FILE UPLOADS GOES HERE

  //saving
const [selectedDoc, setSelectedDoc] = useState()

const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if(result.assets[0].uri != ""|| result.assets[0].uri != null){
        setSelectedDoc(true);
        try {
            console.log("utility_bill" + result.assets[0].uri);
            if (selectedDoc == true) {
                console.log("tatoTrue");
                const fileNamExt = splitString(result.assets[0].uri);
                console.log("image in filename now");
                
                await AsyncStorage.setItem("utility_bill", fileNamExt);

                const formData = new FormData();
                const userID = await AsyncStorage.getItem("CIDID");
                console.log("now with id" + userID);
          
                formData.append("file_type", "image");
                formData.append("document_type", "utility_bill");
                formData.append("file", {
                   name: userID + "." + fileNamExt,
                   type: "image/jpeg" || "image/png" || "image/jpg",
                   uri: result.assets[0].uri,
                 });
            }     
            console.log("now taSaver") 
        }catch (error) {
            selectedDoc = false;
            console.log(`No utility_bill selected: ${error.message}`);
      }

   
  

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

  const pickImage2 = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if(result.assets[0].uri != ""|| result.assets[0].uri != null){
        setSelectedDoc(true);
        try {
            console.log("proof_of_next_kin" + result.assets[0].uri);
            if (selectedDoc == true) {
                console.log("tatoTrue");
                const fileNamExt = splitString(result.assets[0].uri);
                console.log("image in filename now");
          
                await AsyncStorage.setItem("proof_of_next_kin", fileNamExt);

                const formData = new FormData();
                const userID = await AsyncStorage.getItem("CIDID");
                console.log("now with id" + userID);
          
                formData.append("file_type", "image");
                formData.append("document_type", "proof_of_next_kin");
                formData.append("file", {
                   name: userID + "." + fileNamExt,
                   type: "image/jpeg" || "image/png" || "image/jpg",
                   uri: result.assets[0].uri,
                 });
            }     
            console.log("now taSaver") 
        }catch (error) {
            selectedDoc = false;
            console.log(`No proof_of_next_kin selected: ${error.message}`);
      }

   
  

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

  const pickImage3 = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if(result.assets[0].uri != ""|| result.assets[0].uri != null){
        setSelectedDoc(true);
        try {
            console.log("international_passport" + result.assets[0].uri);
            if (selectedDoc == true) {
                console.log("tatoTrue");
                const fileNamExt = splitString(result.assets[0].uri);
                console.log("image in filename now");
          
                await AsyncStorage.setItem("international_passport", fileNamExt);

                const formData = new FormData();
                const userID = await AsyncStorage.getItem("CIDID");
                console.log("now with id" + userID);
          
                formData.append("file_type", "image");
                formData.append("document_type", "international_passport");
                formData.append("file", {
                   name: userID + "." + fileNamExt,
                   type: "image/jpeg" || "image/png" || "image/jpg",
                   uri: result.assets[0].uri,
                 });
            }     
            console.log("now taSaver") 
        }catch (error) {
            selectedDoc = false;
            console.log(`No international_passport selected: ${error.message}`);
      }

   
  

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

  const pickImage4 = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if(result.assets[0].uri != ""|| result.assets[0].uri != null){
        setSelectedDoc(true);
        try {
            console.log("mortgage_statement" + result.assets[0].uri);
            if (selectedDoc == true) {
                console.log("tatoTrue");
                const fileNamExt = splitString(result.assets[0].uri);
                console.log("image in filename now");
          
                await AsyncStorage.setItem("mortgage_statement", fileNamExt);

                const formData = new FormData();
                const userID = await AsyncStorage.getItem("CIDID");
                console.log("now with id" + userID);
          
                formData.append("file_type", "image");
                formData.append("document_type", "mortgage_statement");
                formData.append("file", {
                   name: userID + "." + fileNamExt,
                   type: "image/jpeg" || "image/png" || "image/jpg",
                   uri: result.assets[0].uri,
                 });
            }     
            console.log("now taSaver") 
        }catch (error) {
            selectedDoc = false;
            console.log(`No mortgage_statement selected: ${error.message}`);
      }

   
  

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "50%",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("KycDetails")}
              style={{ marginRight: 10, marginTop: 16, flexDirection: "row" }}
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
          <Text style={styles.welcometxt}>Documents Uploaded</Text>
          <Text style={styles.instruction}>
            Here are the document you uploaded and the status of each one of
            them.
          </Text>

 
          <View style={styles.kycItemsView}>
          {ubimage == true && ( 
                      <TouchableOpacity style={styles.kycItem}>
                      <View style={styles.kycItemB}>
                        <Text style={styles.kycHeaderText}>Utility Bill</Text>
                        <Text style={styles.kycInstructionText}>Document Verified</Text>
                      </View>
                      <View style={styles.kycItemC}>
                        <View>
                          <Image
                            style={{
                              width: 24,
                              height: 24,
                              marginTop: 10,
                              marginRight: 10,
                              alignSelf: "flex-end",
                            }}
                            source={require("../../../../assets/Done.png")}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
          )}
          
          
          {ubimage == false && (
          <>
            <View style={styles.kycItemDeclined}>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Utility Bill</Text>
                <Text style={styles.kycInstructionText}>Upload Document</Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/Nofile.png")}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.kycItemUploader}
            >
              <Text style={styles.uploaderText}>Click to upload file</Text>
            </TouchableOpacity>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          </>
          )}


          {ubimage == true && (
          <>
            <TouchableOpacity style={styles.kycItem}>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Proof of Next of Kin</Text>
                <Text style={styles.kycInstructionText}>Document Verified</Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/Done.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
            </>
          )}
            
                      
          {ubimage == false && (
          <>
            <View style={styles.kycItemDeclined}>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Proof of Next of Kin</Text>
                <Text style={styles.kycInstructionText}>Upload Document</Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/Nofile.png")}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => pickImage2()}
              style={styles.kycItemUploader}
            >
              <Text style={styles.uploaderText}>Click to upload file</Text>
            </TouchableOpacity>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          </>
          )}


          {ubimage == true &&(
            <>
              <TouchableOpacity style={styles.kycItem}>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>International Passport</Text>
                <Text style={styles.kycInstructionText}>
                  Document Pending Verification
                </Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/Waiting.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
            </>
          )}

                      
          {ubimage == false && (
          <>
            <View style={styles.kycItemDeclined}>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>International Passport</Text>
                <Text style={styles.kycInstructionText}>Upload Document</Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/Nofile.png")}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => pickImage3()}
              style={styles.kycItemUploader}
            >
              <Text style={styles.uploaderText}>Click to upload file</Text>
            </TouchableOpacity>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          </>
          )}


            <View style={styles.kycItemDeclined}>
              <View style={styles.kycItemB}>
                <Text style={styles.kycHeaderText}>Mortgage Statement</Text>
                <Text style={styles.kycInstructionText}>Document Declined</Text>
              </View>
              <View style={styles.kycItemC}>
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 10,
                      marginRight: 10,
                      alignSelf: "flex-end",
                    }}
                    source={require("../../../../assets/Nofile.png")}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => pickImage4()}
              style={styles.kycItemUploader}
            >
              <Text style={styles.uploaderText}>Click to upload file</Text>
            </TouchableOpacity>
          </View>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
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
  instruction: {
    color: "#040B22",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 10,
    fontFamily: "GeneralSansRegular",
  },
  kycItemsView: {
    flex: 8,
    marginTop: 40,
  },
  kycItem: {
    flexDirection: "row",
    marginTop: 8,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#D4D4D8",
    backgroundColor: "#F6F7F9",
    borderRadius: 10,
  },
  kycItemDeclined: {
    flexDirection: "row",
    marginTop: 8,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#D4D4D8",
    backgroundColor: "#F6F7F9",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  kycItemB: {
    flex: 8,
    marginLeft: "7%",
  },
  kycHeaderText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    fontFamily: "GeneralSansMedium",
  },
  kycInstructionText: {
    color: "#6B778C",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 5,
    fontFamily: "GeneralSansRegular",
  },
  kycItemC: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  kycItemUploader: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#BED1F9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  uploaderText: {
    color: "#1435AB",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
    fontFamily: "GeneralSansMedium",
  },
});

export default KycDoc;
