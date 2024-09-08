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
  Pressable,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "../../../constants/colors";
import Loader from "../../components/Loader";
import { SimpleLineIcons } from "react-native-vector-icons";
import APILink from "../../../constants/globals";
import RNPickerSelect from "react-native-picker-select";

const CorporationDetails = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    comname: "",
    tradename: "",
    bustype: "",
    busaddress: "",
    regnumber: "",
    incdate: "",
    incplace: "",
    signatory: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [signnum, setSignnum] = React.useState(false);
  const [signatories, setSignatories] = React.useState(false);

  const handleSubmit = async () => {
    //Alert.alert("12");

    if (inputs.comname == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty company commercial name field"
      );
      return;
    }
    if (inputs.tradename == "") {
      Alert.alert("Proceeding failed. Fill in the empty trading name field");
      return;
    }
    if (inputs.bustype == "") {
      Alert.alert("Proceeding failed. Fill in the empty business type field");
      return;
    }
    if (inputs.busaddress == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty business address field"
      );
      return;
    }
    if (inputs.regnumber == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty registration number field"
      );
      return;
    }
    if (inputs.incdate == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty date of incorporation field"
      );
      return;
    }
    if (inputs.incplace == "") {
      Alert.alert(
        "Proceeding failed. Fill in the empty place of incorporation field"
      );
      return;
    }
    if (inputs.signatory == "") {
      Alert.alert("Proceeding failed. Fill in the empty signatory field");
      return;
    }

    const obj = {
      name: inputs.comname,
      trading_name: inputs.tradename,
      address: inputs.busaddress,
      date_of_incoperation: inputs.incdate,
      registration_number: inputs.regnumber,
      place_of_incoperation: inputs.incplace,
      type: inputs.bustype,
      signatories: [{ name: inputs.signatory }],
    };

    console.log(obj);
    const asynctoken = await AsyncStorage.getItem("TOKEN");
    const apiLink = APILink.getLink();
    let registerResponse = await fetch(
      `${apiLink}/kyc/businesses/profile`,
      {
        method: "patch",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${asynctoken}`,
        },
      }
    );

    let responseJson = await registerResponse.json();
    console.log(responseJson);

    try{
      if (responseJson.data) {
        Alert.alert("Saving successfull");
        await AsyncStorage.setItem("CopPersonal", "Yes");
        navigation.navigate("CorporationFinancial");
      }

    }catch(e){
      console.log("Errors Occured")
    }
  };

  const [completedDate, setCompletedDate] = useState(new Date());
  const [showCompleted, setShowCompleted] = useState(false);
  const [isHidden, setHidden] = useState(true);

  const onChange = (event, selectedDate) => {
    const completedDate = selectedDate || Date;
    const spltDat = completedDate.toString().split(" ");
    let mont = "";

    if (spltDat[1] == "Jan") {
      mont = "-01";
    } else if (spltDat[1] == "Feb") {
      mont = "-02";
    } else if (spltDat[1] == "Mar") {
      mont = "-03";
    } else if (spltDat[1] == "Apr") {
      mont = "-04";
    } else if (spltDat[1] == "May") {
      mont = "-05";
    } else if (spltDat[1] == "Jun") {
      mont = "-06";
    } else if (spltDat[1] == "Jul") {
      mont = "-07";
    } else if (spltDat[1] == "Aug") {
      mont = "-08";
    } else if (spltDat[1] == "Sep") {
      mont = "-09";
    } else if (spltDat[1] == "Oct") {
      mont = "-10";
    } else if (spltDat[1] == "Nov") {
      mont = "-11";
    } else if (spltDat[1] == "Dec") {
      mont = "-12";
    }
    let dat = spltDat[3] + "-" + spltDat[2] + mont.toString();
    setShowCompleted(Platform.OS === "ios");
    console.log(mont);
    setInputs({ ...inputs, incdate: dat });
    setCompletedDate(completedDate);
  };

  const showDatepicker = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <SafeAreaView style={styles.container}>
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
                onPress={() => navigation.navigate("CopCompleteProfile")}
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
                Step 1 of 4
              </Text>
            </View>
          </View>
          <Text style={styles.welcometxt}>Corporation Details</Text>
          <Text style={styles.instruction}>
            Plsease provide the required information
          </Text>
          {isHidden ? (
            <View>
              {showCompleted && (
                <DateTimePicker
                  testID="dateTimePicker"
                  placeholder="Completed Date"
                  value={completedDate}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          ) : null}
          <View style={styles.innerview}>
            <View style={styles.innera}>
              <Text style={styles.label}>
                Commercial Name (Registered Name)
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.comname}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, comname: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Trading Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.tradename}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, tradename: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Type of Business</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  placeholder={""}
                  onValueChange={(text) =>
                    setInputs({ ...inputs, bustype: text })
                  }
                  items={[
                    {
                      key: "A01",
                      label: "Administrative Office Space",
                      value: "Administrative Office Space",
                    },
                    {
                      key: "A02",
                      label: "Advertising or Marketing Service",
                      value: "Advertising or Marketing Service",
                    },
                    {
                      key: "A03",
                      label: "Coupon Book Sales Licenses",
                      value: "Coupon Book Sales Licenses",
                    },
                    {
                      key: "A04",
                      label: "Advertising Space Leasing or Selling",
                      value: "Advertising Space Leasing or Selling",
                    },
                    {
                      key: "A06",
                      label: "Amusement Park",
                      value: "Amusement Park",
                    },
                    {
                      key: "A07",
                      label: "Apartment House",
                      value: "Apartment House",
                    },
                    {
                      key: "A14",
                      label: "Auto Broker",
                      value: "Auto Broker",
                    },
                    {
                      key: "A17",
                      label: "Armored Car Service",
                      value: "Armored Car Service",
                    },
                    {
                      key: "A19",
                      label: "Rental Car Agency",
                      value: "Rental Car Agency",
                    },
                    {
                      key: "A23",
                      label: "Bookkeeper",
                      value: "Bookkeeper",
                    },
                    {
                      key: "A28",
                      label: "Automobile Leasing",
                      value: "Automobile Leasing",
                    },
                    {
                      key: "A29",
                      label: "Automobile Towing Service",
                      value: "Automobile Towing Service",
                    },
                    {
                      key: "A32",
                      label: "Adult Book Store",
                      value: "Adult Book Store",
                    },
                    {
                      key: "A36",
                      label: "Arcade",
                      value: "Arcade",
                    },
                    {
                      key: "A40",
                      label: "Adult Day Care Facility",
                      value: "Adult Day Care Facility",
                    },
                    {
                      key: "A42",
                      label: "Special Event Medical Service",
                      value: "Special Event Medical Service",
                    },
                    {
                      key: "A43",
                      label: "Non Medical Supervised Patient Transfer Service",
                      value: "Non Medical Supervised Patient Transfer Service",
                    },
                    {
                      key: "A44",
                      label: "Auto Sales-Limited",
                      value: "Auto Sales-Limited",
                    },
                    {
                      key: "A45",
                      label: "Automobile Detailing",
                      value: "Automobile Detailing",
                    },
                    {
                      key: "A46",
                      label: "Appraiser",
                      value: "Appraiser",
                    },
                    {
                      key: "A47",
                      label: "Artist",
                      value: "Artist",
                    },
                    {
                      key: "A48",
                      label: "Art Gallery-Retail",
                      value: "Art Gallery-Retail",
                    },
                    {
                      key: "A50",
                      label: "Affiliate Company Software Developer",
                      value: "Affiliate Company Software Developer",
                    },
                    {
                      key: "A55",
                      label: "Automotive Garage/Service Station (Minor)",
                      value: "Automotive Garage/Service Station (Minor)",
                    },
                    {
                      key: "A60",
                      label: "Automotive Garage (Major)",
                      value: "Automotive Garage (Major)",
                    },
                    {
                      key: "A65",
                      label: "Automotive Sales w/ Minor Repair",
                      value: "Automotive Sales w/ Minor Repair",
                    },
                    {
                      key: "B01",
                      label: "Bail Bond Agency",
                      value: "Bail Bond Agency",
                    },
                    {
                      key: "B03",
                      label: "Bank, Commercial Bank or Banking Corporation",
                      value: "Bank, Commercial Bank or Banking Corporation",
                    },
                    {
                      key: "B04",
                      label: "Barber Shop",
                      value: "Barber Shop",
                    },
                    {
                      key: "B05",
                      label: "Cosmetological Establishment",
                      value: "Cosmetological Establishment",
                    },
                    {
                      key: "B07",
                      label: "Bowling Center",
                      value: "Bowling Center",
                    },
                    {
                      key: "B09",
                      label: "Commodity or Securities Broker or Dealer",
                      value: "Commodity or Securities Broker or Dealer",
                    },
                    {
                      key: "B18",
                      label: "Bail Agent / Enforcement Agent",
                      value: "Bail Agent / Enforcement Agent",
                    },
                    {
                      key: "B20",
                      label: "Business Support Service",
                      value: "Business Support Service",
                    },
                    {
                      key: "B21",
                      label: "Body Piercing",
                      value: "Body Piercing",
                    },
                    {
                      key: "B23",
                      label: "Banquet or Event Establishment",
                      value: "Banquet or Event Establishment",
                    },
                    {
                      key: "B50",
                      label: "Building, Plant Nursery & Hardware Supplies",
                      value: "Building, Plant Nursery & Hardware Supplies",
                    },
                    {
                      key: "C02",
                      label: "Car Wash",
                      value: "Car Wash",
                    },
                    {
                      key: "C05",
                      label: "Tobacco Dealer",
                      value: "Tobacco Dealer",
                    },
                    {
                      key: "C08",
                      label: "Coin Amusement Machine",
                      value: "Coin Amusement Machine",
                    },
                    {
                      key: "C09",
                      label: "Convention Operator with Exhibitors",
                      value: "Convention Operator with Exhibitors",
                    },
                    {
                      key: "C10",
                      label: "Collection Agency",
                      value: "Collection Agency",
                    },
                    {
                      key: "C13",
                      label: "Credit Reporting Agency",
                      value: "Credit Reporting Agency",
                    },
                    {
                      key: "C15",
                      label: "Convenience Store",
                      value: "Convenience Store",
                    },
                    {
                      key: "C18",
                      label: "Credit Union",
                      value: "Credit Union",
                    },
                    {
                      key: "C19",
                      label: "Contract Labor Service",
                      value: "Contract Labor Service",
                    },
                    {
                      key: "C23",
                      label: "Check Cashing Service Limited",
                      value: "Check Cashing Service Limited",
                    },
                    {
                      key: "C24",
                      label: "Corporate Administrative Office Space",
                      value: "Corporate Administrative Office Space",
                    },
                    {
                      key: "C25",
                      label: "Contractor",
                      value: "Contractor",
                    },
                    {
                      key: "C26",
                      label: "Commercial Rental and Leasing",
                      value: "Commercial Rental and Leasing",
                    },
                    {
                      key: "C40",
                      label: "Concrete Pumping",
                      value: "Concrete Pumping",
                    },
                    {
                      key: "C41",
                      label: "Construction Cleanup",
                      value: "Construction Cleanup",
                    },
                    {
                      key: "C55",
                      label: "Clinic or Laboratory",
                      value: "Clinic or Laboratory",
                    },
                    {
                      key: "D06",
                      label: "Designer-Decorator",
                      value: "Designer-Decorator",
                    },
                    {
                      key: "D11",
                      label: "Drug Store",
                      value: "Drug Store",
                    },
                    {
                      key: "D15",
                      label: "Draftsman",
                      value: "Draftsman",
                    },
                    {
                      key: "D17",
                      label: "Bankrupt, Damaged, or Assigned",
                      value: "Bankrupt, Damaged, or Assigned",
                    },
                    {
                      key: "D19",
                      label: "Night Club",
                      value: "Night Club",
                    },
                    {
                      key: "D50",
                      label: "Dry Cleaning/Laundry Facility & Services",
                      value: "Dry Cleaning/Laundry Facility & Services",
                    },
                    {
                      key: "E01",
                      label: "Employment Agency",
                      value: "Employment Agency",
                    },
                    {
                      key: "E03",
                      label: "Express or Delivery Service",
                      value: "Express or Delivery Service",
                    },
                    {
                      key: "E10",
                      label: "Environmental Analysis",
                      value: "Environmental Analysis",
                    },
                    {
                      key: "F02",
                      label: "Finance Company",
                      value: "Finance Company",
                    },
                    {
                      key: "F05",
                      label: "Funeral Home & Cemetery",
                      value: "Funeral Home & Cemetery",
                    },
                    {
                      key: "F15",
                      label: "Farmers Market Promoter",
                      value: "Farmers Market Promoter",
                    },
                    {
                      key: "F16",
                      label: "Farmers Market Promoter 2nd Location",
                      value: "Farmers Market Promoter 2nd Location",
                    },
                    {
                      key: "F17",
                      label: "Non-farm Product Vendor",
                      value: "Non-farm Product Vendor",
                    },
                    {
                      key: "F20",
                      label: "Fulfillment Center",
                      value: "Fulfillment Center",
                    },
                    {
                      key: "F50",
                      label: "Food Specialty Store",
                      value: "Food Specialty Store",
                    },
                    {
                      key: "G09",
                      label: "Small Game Room",
                      value: "Small Game Room",
                    },
                    {
                      key: "G50",
                      label: "General Retail Sales",
                      value: "General Retail Sales",
                    },
                    {
                      key: "G55",
                      label: "General Services (Counter / Office)",
                      value: "General Services (Counter / Office)",
                    },
                    {
                      key: "G60",
                      label: "Grocery/Mega Store",
                      value: "Grocery/Mega Store",
                    },
                    {
                      key: "H01",
                      label: "Hypnotherapy",
                      value: "Hypnotherapy",
                    },
                    {
                      key: "H02",
                      label: "Handbill and Oral Solicitation",
                      value: "Handbill and Oral Solicitation",
                    },
                    {
                      key: "H04",
                      label: "Hospital",
                      value: "Hospital",
                    },
                    {
                      key: "H05",
                      label: "Hotel - 199 rooms or less",
                      value: "Hotel - 199 rooms or less",
                    },
                    {
                      key: "H06",
                      label: "Resort Hotel - 200 rooms or more",
                      value: "Resort Hotel - 200 rooms or more",
                    },
                    {
                      key: "H08",
                      label: "Health and Fitness Club",
                      value: "Health and Fitness Club",
                    },
                    {
                      key: "H11",
                      label: "Residence Hotel",
                      value: "Residence Hotel",
                    },
                    {
                      key: "H12",
                      label: "Animal Drawn Vehicle",
                      value: "Animal Drawn Vehicle",
                    },
                    {
                      key: "H14",
                      label: "Residential Home Care Provider",
                      value: "Residential Home Care Provider",
                    },
                    {
                      key: "H15",
                      label: "Residence Hostel Single Room",
                      value: "Residence Hostel Single Room",
                    },
                    {
                      key: "H16",
                      label: "Managed Health Care Organization",
                      value: "Managed Health Care Organization",
                    },
                    {
                      key: "H19",
                      label:
                        "Health Maintenance Organization-Insurance Company",
                      value:
                        "Health Maintenance Organization-Insurance Company",
                    },
                    {
                      key: "I03",
                      label: "Insurance Adjuster",
                      value: "Insurance Adjuster",
                    },
                    {
                      key: "I09",
                      label: "Internet Entertainer",
                      value: "Internet Entertainer",
                    },
                    {
                      key: "I10",
                      label: "Adult Internet Sales",
                      value: "Adult Internet Sales",
                    },
                    {
                      key: "I11",
                      label: "Internet Adult Entertainment",
                      value: "Internet Adult Entertainment",
                    },
                    {
                      key: "I12",
                      label: "Interactive Entertainment Center",
                      value: "Interactive Entertainment Center",
                    },
                    {
                      key: "I14",
                      label: "Insurance Agency",
                      value: "Insurance Agency",
                    },
                    {
                      key: "I16",
                      label: "Internet Retailer",
                      value: "Internet Retailer",
                    },
                    {
                      key: "I50",
                      label: "Instruction Services",
                      value: "Instruction Services",
                    },
                    {
                      key: "L33",
                      label: "Lawn & Landscape Maintenance",
                      value: "Lawn & Landscape Maintenance",
                    },
                    {
                      key: "M05",
                      label: "Manufacturing",
                      value: "Manufacturing",
                    },
                    {
                      key: "M08",
                      label: "Motel",
                      value: "Motel",
                    },
                    {
                      key: "M12",
                      label: "Independent Massage Therapist",
                      value: "Independent Massage Therapist",
                    },
                    {
                      key: "M14",
                      label: "Membership Club",
                      value: "Membership Club",
                    },
                    {
                      key: "M18",
                      label: "Management or Consulting Service",
                      value: "Management or Consulting Service",
                    },
                    {
                      key: "M21",
                      label: "Merchandise Broker",
                      value: "Merchandise Broker",
                    },
                    {
                      key: "M25",
                      label: "Mobile Food Vendor",
                      value: "Mobile Food Vendor",
                    },
                    {
                      key: "M27",
                      label: "Motor Transportation Service",
                      value: "Motor Transportation Service",
                    },
                    {
                      key: "M28",
                      label: "Remote Motor Vehicle Rental",
                      value: "Remote Motor Vehicle Rental",
                    },
                    {
                      key: "M50",
                      label: "Manufacturing, Light Assembly and Fabrication",
                      value: "Manufacturing, Light Assembly and Fabrication",
                    },
                    {
                      key: "M55",
                      label: "Manufacturing (Heavy)",
                      value: "Manufacturing (Heavy)",
                    },
                    {
                      key: "N02",
                      label: "Non-Depository Lender",
                      value: "Non-Depository Lender",
                    },
                    {
                      key: "N31",
                      label: "Non-profit Community Services",
                      value: "Non-profit Community Services",
                    },
                    {
                      key: "N33",
                      label: "Non-profit Medical",
                      value: "Non-profit Medical",
                    },
                    {
                      key: "N35",
                      label: "Non-profit Drug/Alcohol Counseling",
                      value: "Non-profit Drug/Alcohol Counseling",
                    },
                    {
                      key: "N36",
                      label: "Non-profit Thrift Store",
                      value: "Non-profit Thrift Store",
                    },
                    {
                      key: "N38",
                      label: "Non-profit Homeless Shelter/Rescue Mission",
                      value: "Non-profit Homeless Shelter/Rescue Mission",
                    },
                    {
                      key: "O07",
                      label: "Open Air Vending",
                      value: "Open Air Vending",
                    },
                    {
                      key: "O08",
                      label: "Outdoor Sports Center and Activities Related",
                      value: "Outdoor Sports Center and Activities Related",
                    },
                    {
                      key: "P02",
                      label: "Parking Lot",
                      value: "Parking Lot",
                    },
                    {
                      key: "P03",
                      label: "Permanent Make Up",
                      value: "Permanent Make Up",
                    },
                    {
                      key: "P06",
                      label: "Photography Business",
                      value: "Photography Business",
                    },
                    {
                      key: "P09",
                      label: "Billiard or Pool Hall",
                      value: "Billiard or Pool Hall",
                    },
                    {
                      key: "P13",
                      label: "Public Bus Service",
                      value: "Public Bus Service",
                    },
                    {
                      key: "P19",
                      label: "Professional Promoter",
                      value: "Professional Promoter",
                    },
                    {
                      key: "P23",
                      label: "Outdoor Pay Phones",
                      value: "Outdoor Pay Phones",
                    },
                    {
                      key: "P26",
                      label: "Party Planning Service",
                      value: "Party Planning Service",
                    },
                    {
                      key: "P27",
                      label: "Personal Services",
                      value: "Personal Services",
                    },
                    {
                      key: "P32",
                      label: "Parade Vendor",
                      value: "Parade Vendor",
                    },
                    {
                      key: "P35",
                      label: "Outdoor Pay Phone per Location",
                      value: "Outdoor Pay Phone per Location",
                    },
                    {
                      key: "P50",
                      label: "Professional Services",
                      value: "Professional Services",
                    },
                    {
                      key: "P55",
                      label: "Professional Services - Medical",
                      value: "Professional Services - Medical",
                    },
                    {
                      key: "P60",
                      label: "Publishing & Newspapers",
                      value: "Publishing & Newspapers",
                    },
                    {
                      key: "Q01",
                      label: "Real Estate Firm",
                      value: "Real Estate Firm",
                    },
                    {
                      key: "Q03",
                      label: "Real Estate Salesperson",
                      value: "Real Estate Salesperson",
                    },
                    {
                      key: "Q05",
                      label: "Funeral/Cemetery Administrators",
                      value: "Funeral/Cemetery Administrators",
                    },
                    {
                      key: "R02",
                      label: "Rooming House",
                      value: "Rooming House",
                    },
                    {
                      key: "R09",
                      label: "Restaurant",
                      value: "Restaurant",
                    },
                    {
                      key: "R10",
                      label: "Food Services or Cafe",
                      value: "Food Services or Cafe",
                    },
                    {
                      key: "R13",
                      label: "Real Estate Developer",
                      value: "Real Estate Developer",
                    },
                    {
                      key: "R15",
                      label: "Rental Referral Service",
                      value: "Rental Referral Service",
                    },
                    {
                      key: "R19",
                      label: "Riding Horse Rental",
                      value: "Riding Horse Rental",
                    },
                    {
                      key: "R20",
                      label: "Recreational Vehicle Park",
                      value: "Recreational Vehicle Park",
                    },
                    {
                      key: "R21",
                      label: "Radio Station",
                      value: "Radio Station",
                    },
                    {
                      key: "R50",
                      label: "Rental & Leasing",
                      value: "Rental & Leasing",
                    },
                    {
                      key: "R55",
                      label: "Recycle Waste Haulers",
                      value: "Recycle Waste Haulers",
                    },
                    {
                      key: "R60",
                      label: "Repair and Maintenance",
                      value: "Repair and Maintenance",
                    },
                    {
                      key: "S01",
                      label: "Short Term Residential Rental (PM)",
                      value: "Short Term Residential Rental (PM)",
                    },
                    {
                      key: "S02",
                      label: "School",
                      value: "School",
                    },
                    {
                      key: "S03",
                      label: "Short Term Residential Rental (Owner)",
                      value: "Short Term Residential Rental (Owner)",
                    },
                    {
                      key: "S04",
                      label: "Shooting Range",
                      value: "Shooting Range",
                    },
                    {
                      key: "S06",
                      label: "Sewer or Septic Drain Cleaning",
                      value: "Sewer or Septic Drain Cleaning",
                    },
                    {
                      key: "S08",
                      label: "Sales or Service Agent or Representative",
                      value: "Sales or Service Agent or Representative",
                    },
                    {
                      key: "S09",
                      label: "Sign Painting Establishment",
                      value: "Sign Painting Establishment",
                    },
                    {
                      key: "S10",
                      label: "Skating Rink",
                      value: "Skating Rink",
                    },
                    {
                      key: "S13",
                      label: "Peddlers and Solicitors",
                      value: "Peddlers and Solicitors",
                    },
                    {
                      key: "S14",
                      label: "Sporting Goods",
                      value: "Sporting Goods",
                    },
                    {
                      key: "S19",
                      label: "Sales-Related Call Center",
                      value: "Sales-Related Call Center",
                    },
                    {
                      key: "S50",
                      label: "Special Care Facility",
                      value: "Special Care Facility",
                    },
                    {
                      key: "T01",
                      label: "Tailor and/or Dressmaker",
                      value: "Tailor and/or Dressmaker",
                    },
                    {
                      key: "T02",
                      label: "Sightseeing Bus or Limousine",
                      value: "Sightseeing Bus or Limousine",
                    },
                    {
                      key: "T03",
                      label: "Theater",
                      value: "Theater",
                    },
                    {
                      key: "T04",
                      label: "Mobile Home Park",
                      value: "Mobile Home Park",
                    },
                    {
                      key: "T05",
                      label: "Trailer or Mobile Home Sales",
                      value: "Trailer or Mobile Home Sales",
                    },
                    {
                      key: "T06",
                      label: "Transfer and Storage Company",
                      value: "Transfer and Storage Company",
                    },
                    {
                      key: "T07",
                      label: "Travel & Ticket Agency",
                      value: "Travel & Ticket Agency",
                    },
                    {
                      key: "T08",
                      label: "Tattoo Establishment",
                      value: "Tattoo Establishment",
                    },
                    {
                      key: "T09",
                      label: "Tree Trimmer",
                      value: "Tree Trimmer",
                    },
                    {
                      key: "T10",
                      label: "Inter-Jurisdictional Mobile Service Operation",
                      value: "Inter-Jurisdictional Mobile Service Operation",
                    },
                    {
                      key: "T12",
                      label: "Answering Message Service",
                      value: "Answering Message Service",
                    },
                    {
                      key: "T16",
                      label: "Thrift Company",
                      value: "Thrift Company",
                    },
                    {
                      key: "T17",
                      label: "Title Insurance Company",
                      value: "Title Insurance Company",
                    },
                    {
                      key: "T19",
                      label: "Truck Rental Agency",
                      value: "Truck Rental Agency",
                    },
                    {
                      key: "T20",
                      label: "Trust Company",
                      value: "Trust Company",
                    },
                    {
                      key: "T21",
                      label: "Time Share Sales Agent",
                      value: "Time Share Sales Agent",
                    },
                    {
                      key: "T22",
                      label: "Time Share Project Broker",
                      value: "Time Share Project Broker",
                    },
                    {
                      key: "T24",
                      label: "Temporary Merchant",
                      value: "Temporary Merchant",
                    },
                    {
                      key: "T27",
                      label: "Television Broadcast Station",
                      value: "Television Broadcast Station",
                    },
                    {
                      key: "T30",
                      label: "Tennis/Handball/Racquetball Court",
                      value: "Tennis/Handball/Racquetball Court",
                    },
                    {
                      key: "T31",
                      label: "Tour or Tour Guide",
                      value: "Tour or Tour Guide",
                    },
                    {
                      key: "T32",
                      label: "Time Share Representative",
                      value: "Time Share Representative",
                    },
                    {
                      key: "T50",
                      label: "Tobacco Sales / Lounge",
                      value: "Tobacco Sales / Lounge",
                    },
                    {
                      key: "T55",
                      label: "Transitional Living Facility",
                      value: "Transitional Living Facility",
                    },
                    {
                      key: "U05",
                      label: "Public Utility Telephone",
                      value: "Public Utility Telephone",
                    },
                    {
                      key: "V01",
                      label: "Valet  Parking",
                      value: "Valet  Parking",
                    },
                    {
                      key: "V06",
                      label: "Video Center",
                      value: "Video Center",
                    },
                    {
                      key: "W07",
                      label: "Warehouse or Storage",
                      value: "Warehouse or Storage",
                    },
                    {
                      key: "W10",
                      label: "Wire Service",
                      value: "Wire Service",
                    },
                    {
                      key: "W11",
                      label: "Mini Warehouse",
                      value: "Mini Warehouse",
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Business Address</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.busaddress}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, busaddress: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Registration Number</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.regnumber}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, regnumber: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Date of Incorporation</Text>
              <Pressable
                onPress={() => showDatepicker()}
                style={styles.inputContainer}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                  pointerEvents="none"
                >
                  <TextInput
                    autoCorrect={false}
                    value={inputs.incdate}
                    style={styles.textinputEnabled}
                  />
                </View>
                <Image
                  style={{
                    width: 20,
                    height: 18,
                    marginRight: 10,
                    marginTop: 13,
                  }}
                  source={require("../../../../assets/calendar.png")}
                />
              </Pressable>
            </View>

            <View style={styles.innera}>
              <Text style={styles.label}>Place of Incorporation </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.incplace}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, incplace: text })
                  }
                  style={styles.textinputEnabled}
                />
              </View>
            </View>
            <View style={styles.innera}>
              <Text style={styles.label}>Signatory</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCorrect={false}
                  value={inputs.signatory}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, signatory: text })
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
                  <Text style={styles.btnAddText}>+ Add Another Signatory</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => handleSubmit()}
              activeOpacity={0.7}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Continue</Text>
              <Image
                style={{ width: 20, height: 18, marginLeft: 7 }}
                source={require("../../../../assets/arrow-white.png")}
              />
              <Image
                style={{ width: 20, height: 18, marginLeft: -18, marginTop: 6 }}
                source={require("../../../../assets/arow-blue.png")}
              />
            </TouchableOpacity>
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
  textinputEnabled: {
    fontSize: 16,
    fontWeight: "600",
    color: "#040B22",
    flex: 1,
  },
  btn: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.signed,
    marginTop: 3,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.login,
    flexDirection: "row",
  },
  btnText: {
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

export default CorporationDetails;
