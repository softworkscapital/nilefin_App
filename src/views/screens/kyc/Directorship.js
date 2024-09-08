import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Modal,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../../constants/colors";
import Loader from "../../components/Loader";
import APILink from "../../../constants/globals";
import RNPickerSelect from "react-native-picker-select";
import {
  SimpleLineIcons,
  MaterialIcons,
  AntDesign,
} from "react-native-vector-icons";

const Directorship = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    account_number: "",
    bank_name: "",
    citizenship: "",
    email: "",
    fullname: "",
    id_number: "",
    nationality: "",
    phone_number: "",
    residential_address: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchkey, setSearchkey] = useState("");
  const [codes, setCodes] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [countryCode, setCountryCode] = useState("+263");

  const Item = ({ name, dial_code }) => (
    <TouchableOpacity
      onPress={() => changeState(dial_code)}
      style={{
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
      }}
    >
      <View style={{ width: "80%" }}>
        <Text style={styles.label}>{name} </Text>
      </View>
      <View style={{ width: "20%" }}>
        <Text style={styles.label}>{dial_code} </Text>
      </View>
    </TouchableOpacity>
  );

  const changeState = (cde) => {
    setCountryCode(cde);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <Item name={item.name} dial_code={item.dial_code} code={item.code} />
  );
  const handleSubmitSave = async () => {
    if (inputs.fullname == "") {
      Alert.alert("Proceeding failed. Fill in the full name field");
      return;
    }
    if (inputs.nationality == "") {
      Alert.alert("Proceeding failed. Fill in the empty nationality field");
      return;
    }
    if (inputs.citizenship == "") {
      Alert.alert("Proceeding failed. Fill in the empty citizenship field");
      return;
    }
    if (inputs.id_number == "") {
      Alert.alert("Proceeding failed. Fill in the empty id number field");
      return;
    }
    if (inputs.phone_number == "") {
      Alert.alert("Proceeding failed. Fill in the empty phone number field");
      return;
    }
    if (inputs.email == "") {
      Alert.alert("Proceeding failed. Fill in the empty phone number field");
      return;
    }
    if (inputs.bank_name == "") {
      Alert.alert("Proceeding failed. Fill in the empty bank name field");
      return;
    }
    if (inputs.account_number == "") {
      Alert.alert("Proceeding failed. Fill in the empty account number field");
      return;
    }
    if (inputs.residential_address == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty residential address field"
      );
      return;
    }

    const asynctoken = await AsyncStorage.getItem("TOKEN");
    var s = inputs.phone_number;
    while (s.charAt(0) === "0") {
      s = s.substring(1);
    }

    var fullPhone = countryCode + s;
    const obj = {
      directors: [
        {
          account_number: inputs.account_number,
          bank_name: inputs.bank_name,
          citizenship: inputs.citizenship,
          email: inputs.email,
          fullname: inputs.fullname,
          id_number: inputs.id_number,
          nationality: inputs.nationality,
          phone_number: fullPhone,
          residential_address: inputs.residential_address
        },
      ],
    };

    console.log(obj);

    const apiLink = APILink.getLink();
    let registerResponse = await fetch(`${apiLink}/kyc/businesses/directors`, {
      method: "patch",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${asynctoken}`,
      },
    });

    let responseJson = await registerResponse.json();
    try {
      if (responseJson.data) {
        Alert.alert("Saving successfull");
        await AsyncStorage.setItem("CopEmployment", "Yes");
        navigation.navigate("CopCompleteProfile");
      }
    } catch (e) {
      console.log("Errors Occured");
    }
  };

  const handleSubmitContinue = async () => {
   
    if (inputs.fullname == "") {
      Alert.alert("Proceeding failed. Fill in the full name field");
      return;
    }
    if (inputs.nationality == "") {
      Alert.alert("Proceeding failed. Fill in the empty nationality field");
      return;
    }
    if (inputs.citizenship == "") {
      Alert.alert("Proceeding failed. Fill in the empty citizenship field");
      return;
    }
    if (inputs.id_number == "") {
      Alert.alert("Proceeding failed. Fill in the empty id number field");
      return;
    }
    if (inputs.phone_number == "") {
      Alert.alert("Proceeding failed. Fill in the empty phone number field");
      return;
    }
    if (inputs.email == "") {
      Alert.alert("Proceeding failed. Fill in the empty phone number field");
      return;
    }
    if (inputs.bank_name == "") {
      Alert.alert("Proceeding failed. Fill in the empty bank name field");
      return;
    }
    if (inputs.account_number == "") {
      Alert.alert("Proceeding failed. Fill in the empty account number field");
      return;
    }
    if (inputs.residential_address == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty residential address field"
      );
      return;
    }

    const asynctoken = await AsyncStorage.getItem("TOKEN");
    var s = inputs.phone_number;
    while (s.charAt(0) === "0") {
      s = s.substring(1);
    }

    var fullPhone = countryCode + s;
    const obj = {
      directors: [
        {
          account_number: inputs.account_number,
          bank_name: inputs.bank_name,
          citizenship: inputs.citizenship,
          email: inputs.email,
          fullname: inputs.fullname,
          id_number: inputs.id_number,
          nationality: inputs.nationality,
          phone_number: fullPhone,
          residential_address: inputs.residential_address
        },
      ],
    };

    console.log(obj);
 
    const apiLink = APILink.getLink();
    let registerResponse = await fetch(`${apiLink}/kyc/businesses/directors`, {
      method: "patch",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${asynctoken}`,
      },
    });

    let responseJson = await registerResponse.json();
    try {
      if (responseJson.data) {
        Alert.alert("Saving successfull");
        await AsyncStorage.setItem("CopEmployment", "Yes");
        navigation.navigate("CopDocumentUpload");
      }
    } catch (e) {
      console.log("Errors Occured");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        "https://countriesnow.space/api/v0.1/countries/codes"
      );
      const data = await resp.json();
      setCodes(data.data);
      setFilteredUsers(data.data);
    };
    fetchData();
  }, []);

  const handleFilter = (txt) => {
    const filtered = codes.filter((onecode) => onecode.name.includes(txt));
    setFilteredUsers(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignItems: "center" }}>
              <View
                style={[styles.innera, { width: "95%", alignItems: "center" }]}
              >
                <Text style={styles.label}>type to search...</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inneraview}>
                    <AntDesign
                      name="search1"
                      size={25}
                      style={styles.innerviewsimg}
                    />
                  </View>
                  <TextInput
                    autoCorrect={false}
                    value={searchkey}
                    onChangeText={(text) => {
                      setSearchkey(text);
                      handleFilter(text);
                    }}
                    style={styles.textinputDisabled}
                  />
                </View>
              </View>
            </View>
            <View style={{ height: 350 }}>
              {codes && (
                <FlatList
                  data={filteredUsers}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.code}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Loader visible={loading} />
      <ImageBackground
        source={require("../../../../assets/vectorbg.png")}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scroller}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("CorporationFinancial")}
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
                Step 3 of 4
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.welcometxt}>Directorship</Text>
              <Text style={styles.instruction}>
                Please provide the required information.
              </Text>
            </View>
          </View>

          <View style={styles.innerview}>
            <View style={styles.innera}>
              <Text style={styles.label}>
                Full Name (Start with your first name)
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.fullname}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, fullname: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Nationality</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  placeholder={""}
                  onValueChange={(text) =>
                    setInputs({ ...inputs, nationality: text })
                  }
                  items={[
                    { label: "Afghan", value: "Afghan", key: "1" },
                    { label: "Albanian", value: "Albanian", key: "2" },
                    { label: "Algerian", value: "Algerian", key: "3" },
                    { label: "American", value: "American", key: "4" },
                    { label: "Andorran", value: "Andorran", key: "4" },
                    { label: "Angolan", value: "Angolan", key: "5" },
                    { label: "Antiguans", value: "Antiguans", key: "6" },
                    { label: "Argentinean", value: "Argentinean", key: "7" },
                    { label: "Armenian", value: "Armenian", key: "8" },
                    { label: "Australian", value: "Australian", key: "9" },
                    { label: "Austrian", value: "Austrian", key: "10" },
                    { label: "Azerbaijani", value: "Azerbaijani", key: "11" },
                    { label: "Bahamian", value: "Bahamian", key: "12" },
                    { label: "Bahraini", value: "Bahraini", key: "13" },
                    { label: "Bangladeshi", value: "Bangladeshi", key: "14" },
                    { label: "Barbadian", value: "Barbadian", key: "15" },
                    { label: "Barbudans", value: "Barbudans", key: "16" },
                    { label: "Batswana", value: "Batswana", key: "17" },
                    { label: "Belarusian", value: "Belarusian", key: "18" },
                    { label: "Belgian", value: "Belgian", key: "19" },
                    { label: "Belizean", value: "Belizean", key: "20" },
                    { label: "Beninese", value: "Beninese", key: "21" },
                    { label: "Bhutanese", value: "Bhutanese", key: "22" },
                    { label: "Bolivian", value: "Bolivian", key: "23" },
                    { label: "Bosnian", value: "Bosnian", key: "24" },
                    { label: "Brazilian", value: "Brazilian", key: "25" },
                    { label: "British", value: "British", key: "26" },
                    { label: "Bruneian", value: "Bruneian", key: "27" },
                    { label: "Bulgarian", value: "Bulgarian", key: "28" },
                    { label: "Burkinabe", value: "Burkinabe", key: "29" },
                    { label: "Burmese", value: "Burmese", key: "30" },
                    { label: "Burundian", value: "Burundian", key: "31" },
                    { label: "Cambodian", value: "Cambodian", key: "32" },
                    { label: "Cameroonian", value: "Cameroonian", key: "33" },
                    { label: "Canadian", value: "Canadian", key: "34" },
                    { label: "Cape Verdean", value: "Cape Verdean", key: "35" },
                    {
                      label: "Central African",
                      value: "Central African",
                      key: "36",
                    },
                    { label: "Chadian", value: "Chadian", key: "37" },
                    { label: "Chilean", value: "Chilean", key: "38" },
                    { label: "Chinese", value: "Chinese", key: "39" },
                    { label: "Colombian", value: "Colombian", key: "40" },
                    { label: "Comoran", value: "Comoran", key: "41" },
                    { label: "Congolese", value: "Congolese", key: "42" },
                    { label: "Costa Rican", value: "Costa Rican", key: "43" },
                    { label: "Croatian", value: "Croatian", key: "44" },
                    { label: "Cuban", value: "Cuban", key: "45" },
                    { label: "Cypriot", value: "Cypriot", key: "46" },
                    { label: "Czech", value: "Czech", key: "47" },
                    { label: "Danish", value: "Danish", key: "48" },
                    { label: "Djibouti", value: "Djibouti", key: "49" },
                    { label: "Dominican", value: "Dominican", key: "50" },
                    { label: "Dutch", value: "Dutch", key: "51" },
                    {
                      label: "East Timorese",
                      value: "East Timorese",
                      key: "52",
                    },
                    { label: "Ecuadorean", value: "Ecuadorean", key: "53" },
                    { label: "Egyptian", value: "Egyptian", key: "54" },
                    { label: "Emirian", value: "Emirian", key: "55" },
                    {
                      label: "Equatorial Guinean",
                      value: "Equatorial Guinean",
                      key: "56",
                    },
                    { label: "Eritrean", value: "Eritrean", key: "57" },
                    { label: "Estonian", value: "Estonian", key: "58" },
                    { label: "Ethiopian", value: "Ethiopian", key: "59" },
                    { label: "Fijian", value: "Fijian", key: "60" },
                    { label: "Filipino", value: "Filipino", key: "61" },
                    { label: "Finnish", value: "Finnish", key: "62" },
                    { label: "French", value: "French", key: "63" },
                    { label: "Gabonese", value: "Gabonese", key: "64" },
                    { label: "Gambian", value: "Gambian", key: "65" },
                    { label: "Georgian", value: "Georgian", key: "66" },
                    { label: "German", value: "German", key: "67" },
                    { label: "Ghanaian", value: "Ghanaian", key: "68" },
                    { label: "Greek", value: "Greek", key: "69" },
                    { label: "Grenadian", value: "Grenadian", key: "70" },
                    { label: "Guatemalan", value: "Guatemalan", key: "71" },
                    {
                      label: "Guinea-Bissauan",
                      value: "Guinea-Bissauan",
                      key: "72",
                    },
                    { label: "Guinean", value: "Guinean", key: "73" },
                    { label: "Guyanese", value: "Guyanese", key: "74" },
                    { label: "Haitian", value: "Haitian", key: "75" },
                    {
                      label: "Herzegovinian",
                      value: "Herzegovinian",
                      key: "76",
                    },
                    { label: "Honduran", value: "Honduran", key: "77" },
                    { label: "Hungarian", value: "Hungarian", key: "78" },
                    { label: "I-Kiribati", value: "I-Kiribati", key: "79" },
                    { label: "Icelander", value: "Icelander", key: "80" },
                    { label: "Indian", value: "Indian", key: "81" },
                    { label: "Indonesian", value: "Indonesian", key: "82" },
                    { label: "Iranian", value: "Iranian", key: "83" },
                    { label: "Iraqi", value: "Iraqi", key: "84" },
                    { label: "Irish", value: "Irish", key: "85" },
                    { label: "Israeli", value: "Israeli", key: "86" },
                    { label: "Italian", value: "Italian", key: "87" },
                    { label: "Ivorian", value: "Ivorian", key: "88" },
                    { label: "Jamaican", value: "Jamaican", key: "89" },
                    { label: "Japanese", value: "Japanese", key: "90" },
                    { label: "Jordanian", value: "Jordanian", key: "91" },
                    { label: "Kazakhstani", value: "Kazakhstani", key: "92" },
                    { label: "Kenyan", value: "Kenyan", key: "93" },
                    {
                      label: "Kittian and Nevisian",
                      value: "Kittian and Nevisian",
                      key: "94",
                    },
                    { label: "Kuwaiti", value: "Kuwaiti", key: "95" },
                    { label: "Kyrgyz", value: "Kyrgyz", key: "96" },
                    { label: "Laotian", value: "Laotian", key: "97" },
                    { label: "Latvian", value: "Latvian", key: "98" },
                    { label: "Lebanese", value: "Lebanese", key: "99" },
                    { label: "Liberian", value: "Liberian", key: "100" },
                    { label: "Libyan", value: "Libyan", key: "101" },
                    {
                      label: "Liechtensteiner",
                      value: "Liechtensteiner",
                      key: "102",
                    },
                    { label: "Lithuanian", value: "Lithuanian", key: "103" },
                    {
                      label: "Luxembourger",
                      value: "Luxembourger",
                      key: "104",
                    },
                    { label: "Macedonian", value: "Macedonian", key: "105" },
                    { label: "Malagasy", value: "Malagasy", key: "106" },
                    { label: "Malawian", value: "Malawian", key: "107" },
                    { label: "Malaysian", value: "Malaysian", key: "108" },
                    { label: "Maldivan", value: "Maldivan", key: "109" },
                    { label: "Malian", value: "Malian", key: "110" },
                    { label: "Maltese", value: "Maltese", key: "111" },
                    { label: "Marshallese", value: "Marshallese", key: "112" },
                    { label: "Mauritanian", value: "Mauritanian", key: "113" },
                    { label: "Mauritian", value: "Mauritian", key: "114" },
                    { label: "Mexican", value: "Mexican", key: "115" },
                    { label: "Micronesian", value: "Micronesian", key: "116" },
                    { label: "Moldovan", value: "Moldovan", key: "117" },
                    { label: "Monacan", value: "Monacan", key: "118" },
                    { label: "Mongolian", value: "Mongolian", key: "119" },
                    { label: "Moroccan", value: "Moroccan", key: "120" },
                    { label: "Mosotho", value: "Mosotho", key: "121" },
                    { label: "Motswana", value: "Motswana", key: "122" },
                    { label: "Mozambican", value: "Mozambican", key: "123" },
                    { label: "Namibian", value: "Namibian", key: "124" },
                    { label: "Nauruan", value: "Nauruan", key: "125" },
                    { label: "Nepalese", value: "Nepalese", key: "126" },
                    {
                      label: "New Zealander",
                      value: "New Zealander",
                      key: "127",
                    },
                    { label: "Nicaraguan", value: "Nicaraguan", key: "128" },
                    { label: "Nigerian", value: "Nigerian", key: "129" },
                    { label: "Nigerien", value: "Nigerien", key: "130" },
                    {
                      label: "North Korean",
                      value: "North Korean",
                      key: "131",
                    },
                    {
                      label: "Northern Irish",
                      value: "Northern Irish",
                      key: "132",
                    },
                    { label: "Norwegian", value: "Norwegian", key: "133" },
                    { label: "Omani", value: "Omani", key: "134" },
                    { label: "Pakistani", value: "Pakistani", key: "135" },
                    { label: "Palauan", value: "Palauan", key: "136" },
                    { label: "Panamanian", value: "Panamanian", key: "137" },
                    {
                      label: "Papua New Guinean",
                      value: "Papua New Guinean",
                      key: "138",
                    },
                    { label: "Paraguayan", value: "Paraguayan", key: "139" },
                    { label: "Peruvian", value: "Peruvian", key: "140" },
                    { label: "Polish", value: "Polish", key: "141" },
                    { label: "Portuguese", value: "Portuguese", key: "142" },
                    { label: "Qatari", value: "Qatari", key: "143" },
                    { label: "Romanian", value: "Romanian", key: "144" },
                    { label: "Russian", value: "Russian", key: "145" },
                    { label: "Rwandan", value: "Rwandan", key: "146" },
                    {
                      label: "Saint Lucian",
                      value: "Saint Lucian",
                      key: "147",
                    },
                    { label: "Salvadoran", value: "Salvadoran", key: "148" },
                    { label: "Samoan", value: "Samoan", key: "149" },
                    {
                      label: "San Marinese",
                      value: "San Marinese",
                      key: "150",
                    },
                    { label: "Sao Tomean", value: "Sao Tomean", key: "151" },
                    { label: "Saudi", value: "Saudi", key: "152" },
                    { label: "Scottish", value: "Scottish", key: "153" },
                    { label: "Senegalese", value: "Senegalese", key: "154" },
                    { label: "Serbian", value: "Serbian", key: "155" },
                    { label: "Seychellois", value: "Seychellois", key: "156" },
                    {
                      label: "Sierra Leonean",
                      value: "Sierra Leonean",
                      key: "157",
                    },
                    { label: "Singaporean", value: "Singaporean", key: "158" },
                    { label: "Slovakian", value: "Slovakian", key: "159" },
                    { label: "Slovenian", value: "Slovenian", key: "160" },
                    {
                      label: "Solomon Islander",
                      value: "Solomon Islander",
                      key: "161",
                    },
                    { label: "Somali", value: "Somali", key: "162" },
                    {
                      label: "South African",
                      value: "South African",
                      key: "163",
                    },
                    {
                      label: "South Korean",
                      value: "South Korean",
                      key: "164",
                    },
                    { label: "Spanish", value: "Spanish", key: "165" },
                    { label: "Sri Lankan", value: "Sri Lankan", key: "166" },
                    { label: "Sudanese", value: "Sudanese", key: "167" },
                    { label: "Surinamer", value: "Surinamer", key: "168" },
                    { label: "Swazi", value: "Swazi", key: "169" },
                    { label: "Swedish", value: "Swedish", key: "170" },
                    { label: "Swiss", value: "Swiss", key: "171" },
                    { label: "Syrian", value: "Syrian", key: "172" },
                    { label: "Taiwanese", value: "Taiwanese", key: "173" },
                    { label: "Tajik", value: "Tajik", key: "174" },
                    { label: "Tanzanian", value: "Tanzanian", key: "175" },
                    { label: "Thai", value: "Thai", key: "176" },
                    { label: "Togolese", value: "Togolese", key: "177" },
                    { label: "Tongan", value: "Tongan", key: "178" },
                    {
                      label: "Trinidadian or Tobagonian",
                      value: "Trinidadian or Tobagonian",
                      key: "179",
                    },
                    { label: "Tunisian", value: "Tunisian", key: "180" },
                    { label: "Turkish", value: "Turkish", key: "181" },
                    { label: "Tuvaluan", value: "Tuvaluan", key: "182" },
                    { label: "Ugandan", value: "Ugandan", key: "183" },
                    { label: "Ukrainian", value: "Ukrainian", key: "184" },
                    { label: "Uruguayan", value: "Uruguayan", key: "185" },
                    { label: "Uzbekistani", value: "Uzbekistani", key: "186" },
                    { label: "Venezuelan", value: "Venezuelan", key: "187" },
                    { label: "Vietnamese", value: "Vietnamese", key: "188" },
                    { label: "Welsh", value: "Welsh", key: "189" },
                    { label: "Yemenite", value: "Yemenite", key: "190" },
                    { label: "Zambian", value: "Zambian", key: "191" },
                    { label: "Zimbabwean", value: "Zambian", key: "192" },
                  ]}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Citizenship</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  placeholder={""}
                  onValueChange={(text) =>
                    setInputs({ ...inputs, citizenship: text })
                  }
                  items={[
                    { value: "Afghanistan", label: "Afghanistan", key: "1" },
                    {
                      value: "Aland Islands",
                      label: "Aland Islands",
                      key: "2",
                    },
                    { value: "Albania", label: "Albania", key: "3" },
                    { value: "Algeria", label: "Algeria", key: "4" },
                    {
                      value: "American Samoa",
                      label: "American Samoa",
                      key: "5",
                    },
                    { value: "AndorrA", label: "AndorrA", key: "6" },
                    { value: "Angola", label: "Angola", key: "7" },
                    { value: "Anguilla", label: "Anguilla", key: "8" },
                    { value: "Antarctica", label: "Antarctica", key: "9" },
                    {
                      value: "Antigua and Barbuda",
                      label: "Antigua and Barbuda",
                      key: "10",
                    },
                    { value: "Argentina", label: "Argentina", key: "11" },
                    { value: "Armenia", label: "Armenia", key: "12" },
                    { value: "Aruba", label: "Aruba", key: "13" },
                    { value: "Australia", label: "Australia", key: "14" },
                    { value: "Austria", label: "Austria", key: "15" },
                    { value: "Azerbaijan", label: "Azerbaijan", key: "16" },
                    { value: "Bahamas", label: "Bahamas", key: "17" },
                    { value: "Bahrain", label: "Bahrain", key: "18" },
                    { value: "Bangladesh", label: "Bangladesh", key: "19" },
                    { value: "Barbados", label: "Barbados", key: "20" },
                    { value: "Belarus", label: "Belarus", key: "21" },
                    { value: "Belgium", label: "Belgium", key: "22" },
                    { value: "Belize", label: "Belize", key: "23" },
                    { value: "Benin", label: "Benin", key: "24" },
                    { value: "Bermuda", label: "Bermuda", key: "25" },
                    { value: "Bhutan", label: "Bhutan", key: "26" },
                    { value: "Bolivia", label: "Bolivia", key: "27" },
                    {
                      value: "Bosnia and Herzegovina",
                      label: "Bosnia and Herzegovina",
                      key: "28",
                    },
                    { value: "Botswana", label: "Botswana", key: "29" },
                    {
                      value: "Bouvet Island",
                      label: "ouvet Island",
                      key: "30",
                    },
                    { value: "Brazil", label: "Brazil", key: "31" },
                    {
                      value: "British Indian Ocean Territory",
                      label: "British Indian Ocean Territory",
                      key: "32",
                    },
                    {
                      value: "Brunei Darussalam",
                      label: "Brunei Darussalam",
                      key: "33",
                    },
                    { value: "Bulgaria", label: "Bulgaria", key: "34" },
                    { value: "Burkina Faso", label: "Burkina Faso", key: "35" },
                    { value: "Burundi", label: "Burundi", key: "36" },
                    { value: "Cambodia", label: "Cambodia", key: "37" },
                    { value: "Cameroon", label: "Cameroon", key: "38" },
                    { value: "Canada", label: "Canada", key: "39" },
                    { value: "Cape Verde", label: "Cape Verde", key: "40" },
                    {
                      value: "Cayman Islands",
                      label: "Cayman Islands",
                      key: "41",
                    },
                    {
                      value: "Central African Republic",
                      label: "Central African Republic",
                      key: "42",
                    },
                    { value: "Chad", label: "TChadD", key: "43" },
                    { value: "Chile", label: "Chile", key: "44" },
                    { value: "China", label: "China", key: "45" },
                    {
                      value: "Christmas Island",
                      label: "Christmas Island",
                      key: "46",
                    },
                    {
                      value: "Cocos (Keeling) Islands",
                      label: "Cocos (Keeling) Islands",
                      key: "47",
                    },
                    { value: "Colombia", label: "Colombia", key: "48" },
                    { value: "Comoros", label: "Comoros", key: "49" },
                    { value: "Congo", label: "Congo", key: "50" },
                    {
                      value: "The Democratic Republic of Congo",
                      label: "The Democratic Republic of Congo",
                      key: "51",
                    },
                    { value: "Cook Islands", label: "Cook Islands", key: "52" },
                    { value: "Costa Rica", label: "Costa Rica", key: "53" },
                    { value: "Croatia", label: "Croatia", key: "54" },
                    { value: "Cuba", label: "Cuba", key: "55" },
                    { value: "Cyprus", label: "Cyprus", key: "56" },
                    {
                      value: "Czech Republic",
                      label: "Czech Republic",
                      key: "57",
                    },
                    { value: "Denmark", label: "Denmark", key: "58" },
                    { value: "Djibouti", label: "Djibouti", key: "59" },
                    { value: "Dominica", label: "Dominica", key: "60" },
                    {
                      value: "Dominican Republic",
                      label: "Dominican Republic",
                      key: "61",
                    },
                    { value: "Ecuador", label: "Ecuador", key: "62" },
                    { value: "Egypt", label: "Egypt", key: "63" },
                    { value: "El Salvador", label: "El Salvador", key: "64" },
                    {
                      value: "Equatorial Guinea",
                      label: "Equatorial Guinea",
                      key: "65",
                    },
                    { value: "Eritrea", label: "Eritrea", key: "66" },
                    { value: "Estonia", label: "Estonia", key: "67" },
                    { value: "Ethiopia", label: "Ethiopia", key: "68" },
                    {
                      value: "Falkland Islands (Malvinas)",
                      label: "Falkland Islands (Malvinas)",
                      key: "69",
                    },
                    {
                      value: "Faroe Islands",
                      label: "Faroe Islands",
                      key: "70",
                    },
                    { value: "Fiji", label: "Fiji", key: "71" },
                    { value: "Finland", label: "Finland", key: "72" },
                    { value: "France", label: "France", key: "73" },
                    {
                      value: "French Guiana",
                      label: "French Guiana",
                      key: "74",
                    },
                    {
                      value: "French Polynesia",
                      label: "French Polynesia",
                      key: "75",
                    },
                    {
                      value: "French Southern Territories",
                      label: "French Southern Territories",
                      key: "76",
                    },
                    { value: "Gabon", label: "Gabon", key: "77" },
                    { value: "Gambia", label: "Gambia", key: "78" },
                    { value: "Georgia", label: "Georgia", key: "79" },
                    { value: "Germany", label: "Germany", key: "80" },
                    { value: "Ghana", label: "Ghana", key: "81" },
                    { value: "Gibraltar", label: "Gibraltar", key: "82" },
                    { value: "Greece", label: "Greece", key: "83" },
                    { value: "Greenland", label: "Greenland", key: "84" },
                    { value: "Grenada", label: "Grenada", key: "85" },
                    { value: "Guadeloupe", label: "Guadeloupe", key: "86" },
                    { value: "Guam", label: "Guam", key: "87" },
                    { value: "Guatemala", label: "Guatemala", key: "88" },
                    { value: "Guernsey", label: "Guernsey", key: "89" },
                    { value: "Guinea", label: "Guinea", key: "90" },
                    {
                      value: "Guinea-Bissau",
                      label: "Guinea-Bissau",
                      key: "91",
                    },
                    { value: "Guyana", label: "Guyana", key: "92" },
                    { value: "Haiti", label: "Haiti", key: "93" },
                    {
                      value: "Heard Island and Mcdonald Islands",
                      label: "Heard Island and Mcdonald Islands",
                      key: "94",
                    },
                    {
                      value: "Holy See (Vatican City State)",
                      label: "Holy See (Vatican City State)",
                      key: "95",
                    },
                    { value: "Honduras", label: "Honduras", key: "96" },
                    { value: "Hong Kong", label: "Hong Kong", key: "97" },
                    { value: "Hungary", label: "Hungary", key: "98" },
                    { value: "Iceland", label: "Iceland", key: "99" },
                    { value: "India", label: "India", key: "100" },
                    { value: "Indonesia", label: "Indonesia", key: "101" },
                    {
                      value: "Islamic Republic Of Iran",
                      label: "Islamic Republic Of Iran",
                      key: "102",
                    },
                    { value: "Iraq", label: "Iraq", key: "104" },
                    { value: "Ireland", label: "Ireland", key: "105" },
                    { value: "Isle of Man", label: "Isle of Man", key: "106" },
                    { value: "Israel", label: "Israel", key: "107" },
                    { value: "Italy", label: "Italy", key: "108" },
                    { value: "Jamaica", label: "Jamaica", key: "109" },
                    { value: "Japan", label: "Japan", key: "110" },
                    { value: "Jersey", label: "Jersey", key: "111" },
                    { value: "Jordan", label: "Jordan", key: "112" },
                    { value: "Kazakhstan", label: "Kazakhstan", key: "113" },
                    { value: "Kenya", label: "Kenya", key: "114" },
                    { value: "Kiribati", label: "Kiribati", key: "115" },
                    {
                      value: "Republic of Korea",
                      label: "Republic of Korea",
                      key: "116",
                    },
                    { value: "Kuwait", label: "Kuwait", key: "117" },
                    { value: "Kyrgyzstan", label: "Kyrgyzstan", key: "118" },
                    { value: "Latvia", label: "Latvia", key: "119" },
                    { value: "Lebanon", label: "Lebanon", key: "120" },
                    { value: "Lesotho", label: "Lesotho", key: "121" },
                    { value: "Liberia", label: "Liberia", key: "122" },
                    {
                      value: "Libyan Arab Jamahiriya",
                      label: "Libyan Arab Jamahiriya",
                      key: "123",
                    },
                    {
                      value: "Liechtenstein",
                      label: "Liechtenstein",
                      key: "124",
                    },
                    { value: "Lithuania", label: "Lithuania", key: "125" },
                    { value: "Luxembourg", label: "Luxembourg", key: "126" },
                    { value: "Macao", label: "Macao", key: "127" },
                    {
                      value: "North Macedonia",
                      label: "North Macedonia",
                      key: "128",
                    },
                    { value: "Madagascar", label: "Madagascar", key: "129" },
                    { value: "Malawi", label: "Malawi", key: "130" },
                    { value: "Malaysia", label: "Malaysia", key: "131" },
                    { value: "Maldives", label: "Maldives", key: "132" },
                    { value: "Mali", label: "Mali", key: "133" },
                    { value: "Malta", label: "Malta", key: "134" },
                    {
                      value: "Marshall Islands",
                      label: "Marshall Islands",
                      key: "135",
                    },
                    { value: "Martinique", label: "Martinique", key: "136" },
                    { value: "Mauritania", label: "Mauritania", key: "137" },
                    { value: "Mauritius", label: "Mauritius", key: "138" },
                    { value: "Mayotte", label: "Mayotte", key: "139" },
                    { value: "Mexico", label: "Mexico", key: "140" },
                    {
                      value: "Federated States of Micronesia",
                      label: "Federated States of Micronesia",
                      key: "141",
                    },
                    {
                      value: "Republic of Moldova",
                      label: "Republic of Moldova",
                      key: "142",
                    },
                    { value: "Monaco", label: "Monaco", key: "143" },
                    { value: "Mongolia", label: "Mongolia", key: "144" },
                    { value: "Montserrat", label: "Montserrat", key: "145" },
                    { value: "Morocco", label: "Morocco", key: "146" },
                    { value: "Mozambique", label: "Mozambique", key: "147" },
                    { value: "Myanmar", label: "Myanmar", key: "148" },
                    { value: "Namibia", label: "Namibia", key: "149" },
                    { value: "Nauru", label: "Nauru", key: "150" },
                    { value: "Nepal", label: "Nepal", key: "151" },
                    { value: "Netherlands", label: "Netherlands", key: "152" },
                    {
                      value: "Netherlands Antilles",
                      label: "Netherlands Antilles",
                      key: "153",
                    },
                    {
                      value: "New Caledonia",
                      label: "New Caledonia",
                      key: "154",
                    },
                    { value: "New Zealand", label: "New Zealand", key: "155" },
                    { value: "Nicaragua", label: "Nicaragua", key: "156" },
                    { value: "Niger", label: "Niger", key: "157" },
                    { value: "Nigeria", label: "Nigeria", key: "158" },
                    { value: "Niue", label: "Niue", key: "159" },
                    {
                      value: "Norfolk Island",
                      label: "Norfolk Island",
                      key: "160",
                    },
                    {
                      value: "Northern Mariana Islands",
                      label: "Northern Mariana Islands",
                      key: "161",
                    },
                    { value: "Norway", label: "Norway", key: "162" },
                    { value: "Oman", label: "Oman", key: "163" },
                    { value: "Pakistan", label: "Pakistan", key: "164" },
                    { value: "Palau", label: "Palau", key: "165" },
                    {
                      value: "Palestinian Territory, Occupied",
                      label: "Palestinian Territory, Occupied",
                      key: "166",
                    },
                    { value: "Panama", label: "Panama", key: "167" },
                    {
                      value: "Papua New Guinea",
                      label: "Papua New Guinea",
                      key: "168",
                    },
                    { value: "Paraguay", label: "Paraguay", key: "169" },
                    { value: "Peru", label: "Peru", key: "170" },
                    { value: "Philippines", label: "Philippines", key: "171" },
                    {
                      value: "Pitcairn Islands",
                      label: "Pitcairn Islands",
                      key: "172",
                    },
                    { value: "Poland", label: "Poland", key: "173" },
                    { value: "Portugal", label: "Portugal", key: "174" },
                    { value: "Puerto Rico", label: "Puerto Rico", key: "175" },
                    { value: "Qatar", label: "Qatar", key: "176" },
                    { value: "Reunion", label: "Reunion", key: "177" },
                    { value: "Romania", label: "Romania", key: "178" },
                    {
                      value: "Russian Federation",
                      label: "Russian Federation",
                      key: "179",
                    },
                    { value: "Rwanda", label: "Rwanda", key: "180" },
                    {
                      value: "Saint Helena",
                      label: "Saint Helena",
                      key: "181",
                    },
                    {
                      value: "Saint Kitts and Nevis",
                      label: "Saint Kitts and Nevis",
                      key: "182",
                    },
                    { value: "Saint Lucia", label: "Saint Lucia", key: "183" },
                    {
                      value: "Saint Pierre and Miquelon",
                      label: "Saint Pierre and Miquelon",
                      key: "184",
                    },
                    {
                      value: "Saint Vincent and the Grenadines",
                      label: "Saint Vincent and the Grenadines",
                      key: "185",
                    },
                    { value: "Samoa", label: "Samoa", key: "186" },
                    { value: "San Marino", label: "San Marino", key: "187" },
                    {
                      value: "Sao Tome and Principe",
                      label: "Sao Tome and Principe",
                      key: "188",
                    },
                    {
                      value: "Saudi Arabia",
                      label: "Saudi Arabia",
                      key: "189",
                    },
                    { value: "Senegal", label: "Senegal", key: "190" },
                    {
                      value: "Serbia and Montenegro",
                      label: "Serbia and Montenegro",
                      key: "191",
                    },
                    { value: "Seychelles", label: "Seychelles", key: "192" },
                    {
                      value: "Sierra Leone",
                      label: "Sierra Leone",
                      key: "193",
                    },
                    { value: "Singapore", label: "Singapore", key: "194" },
                    { value: "Slovakia", label: "Slovakia", key: "195" },
                    { value: "Slovenia", label: "Slovenia", key: "196" },
                    {
                      value: "Solomon Islands",
                      label: "Solomon Islands",
                      key: "197",
                    },
                    { value: "Somalia", label: "Somalia", key: "198" },
                    {
                      value: "South Africa",
                      label: "South Africa",
                      key: "199",
                    },
                    {
                      value: "South Georgia and the South Sandwich Islands",
                      label: "South Georgia and the South Sandwich Islands",
                      key: "200",
                    },
                    { value: "Spain", label: "Spain", key: "201" },
                    { value: "Sri Lanka", label: "Sri Lanka", key: "202" },
                    { value: "Sudan", label: "Sudan", key: "203" },
                    { value: "Suriname", label: "Suriname", key: "204" },
                    {
                      value: "Svalbard and Jan Mayen",
                      label: "Svalbard and Jan Mayen",
                      key: "205",
                    },
                    { value: "Swaziland", label: "SSwazilandZ", key: "206" },
                    { value: "Sweden", label: "Sweden", key: "207" },
                    { value: "Switzerland", label: "Switzerland", key: "208" },
                    {
                      value: "Syrian Arab Republic",
                      label: "Syrian Arab Republic",
                      key: "209",
                    },
                    { value: "Taiwan", label: "Taiwan", key: "210" },
                    { value: "Tajikistan", label: "Tajikistan", key: "211" },
                    {
                      value: "United Republic of Tanzania",
                      label: "United Republic of Tanzania",
                      key: "212",
                    },
                    { value: "Thailand", label: "Thailand", key: "213" },
                    { value: "Timor-Leste", label: "Timor-Leste", key: "214" },
                    { value: "Togo", label: "Togo", key: "215" },
                    { value: "Tokelau", label: "Tokelau", key: "216" },
                    { value: "Tonga", label: "Tonga", key: "217" },
                    {
                      value: "Trinidad and Tobago",
                      label: "Trinidad and Tobago",
                      key: "218",
                    },
                    { value: "Tunisia", label: "Tunisia", key: "219" },
                    { value: "Turkey", label: "Turkey", key: "220" },
                    {
                      value: "Turkmenistan",
                      label: "Turkmenistan",
                      key: "221",
                    },
                    {
                      value: "Turks and Caicos Islands",
                      label: "Turks and Caicos Islands",
                      key: "222",
                    },
                    { value: "Tuvalu", label: "Tuvalu", key: "223" },
                    { value: "Uganda", label: "Uganda", key: "224" },
                    { value: "Ukraine", label: "Ukraine", key: "225" },
                    {
                      value: "United Arab Emirates",
                      label: "United Arab Emirates",
                      key: "226",
                    },
                    {
                      value: "United Kingdom",
                      label: "United Kingdom",
                      key: "227",
                    },
                    {
                      value: "United States",
                      label: "United States",
                      key: "228",
                    },
                    {
                      value: "United States Minor Outlying Islands",
                      label: "United States Minor Outlying Islands",
                      key: "229",
                    },
                    { value: "Uruguay", label: "Uruguay", key: "230" },
                    { value: "Uzbekistan", label: "Uzbekistan", key: "231" },
                    { value: "Vanuatu", label: "Vanuatu", key: "232" },
                    { value: "Venezuela", label: "Venezuela", key: "233" },
                    { value: "Vietnam", label: "Vietnam", key: "234" },
                    {
                      value: "Virgin Islands, British",
                      label: "Virgin Islands, British",
                      key: "235",
                    },
                    {
                      value: "Virgin Islands, U.S.",
                      label: "Virgin Islands, U.S.",
                      key: "236",
                    },
                    {
                      value: "Wallis and Futuna",
                      label: "Wallis and Futuna",
                      key: "237",
                    },
                    {
                      value: "Western Sahara",
                      label: "Western Sahara",
                      key: "238",
                    },
                    { value: "Yemen", label: "Yemen", key: "239" },
                    { value: "Zambia", label: "Zambia", key: "240" },
                    { value: "Zimbabwe", label: "Zimbabwe", key: "241" },
                  ]}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>
                ID Number / Social Security Number
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.id_number}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, id_number: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Phone number</Text>
              <View style={[styles.inputContainer, { paddingLeft: 7 }]}>
                <TouchableOpacity
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: "gray",
                    height: 40,
                    marginTop: 8,
                    flexDirection: "row",
                  }}
                  onPress={() => setModalVisible(true)}
                >
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 14,
                      fontFamily: "GeneralSansRegular",
                    }}
                  >
                    {countryCode}
                  </Text>
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={20}
                    style={{
                      marginTop: 7,
                    }}
                  />
                </TouchableOpacity>
                <TextInput
                  autoCorrect={false}
                  value={inputs.phone_number}
                  keyboardType="numeric"
                  onChangeText={(text) => setInputs({ ...inputs, phone_number: text })}
                  style={[styles.textinputDisabled, { marginLeft: 8 }]}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.email}
                  onChangeText={(text) => setInputs({ ...inputs, email: text })}
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Bank Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.bank_name}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, bank_name: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Account Number</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.account_number}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, account_number: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Residential Address</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.residential_address}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, residential_address: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%" }}></View>
              <View style={{ width: "50%", alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ContactDetails")}
                  activeOpacity={0.7}
                  style={styles.btnAdd}
                >
                  <Text style={styles.btnAddText}>+ Add Another Director</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => handleSubmitSave()}
                activeOpacity={0.7}
                style={styles.btn1}
              >
                <Text style={styles.btn1Text}>Save Progress</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSubmitContinue()}
                activeOpacity={0.7}
                style={styles.btn2}
              >
                <Text style={styles.btn2Text}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#dcdcdc",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scroller: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  welcometxt: {
    color: "#040B22",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },
  instruction: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 5,
  },
  innerview: {
    marginVertical: 20,
  },
  innera: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 12,
    fontWeight: "500",
    color: "#040B22",
  },
  inputContainer: {
    height: 55,
    backgroundColor: "#F0F2FA",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#D0D7EE",
  },
  selectContainer: {
    height: 55,
    backgroundColor: "#F0F2FA",
    paddingHorizontal: 2,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#D0D7EE",
  },
  inneraview: {
    marginTop: 4,
  },
  innerviewsimg: {
    marginRight: 10,
    marginTop: 10,
  },
  textinputDisabled: {
    fontSize: 16,
    fontWeight: "600",
    color: "#040B22",
    flex: 1,
  },
  textinputEnabled: {
    fontSize: 16,
    fontWeight: "600",
    color: "#040B22",
    flex: 1,
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
  btnAddText: {
    color: "#FEFCE9",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GeneralSansMedium",
  },
  btnAdd: {
    height: 32,
    width: 185,
    backgroundColor: "#E9B22B",
    marginTop: 3,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: COLORS.login,
    flexDirection: "row",
  },
});

export default Directorship;
