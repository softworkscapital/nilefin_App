//Certificate of incoporation
const pickCOIImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let selectedDoc = true;
    try {
      console.log("CERT OF INC: "+result.assets[0].uri);
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
    console.log("DIRECTORSHIP: "+result.assets[0].uri);
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
    console.log("CONSTITUTION: "+result.assets[0].uri);
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
    console.log("FINANCE: "+result.assets[0].uri);
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
    console.log("BANK: "+result.assets[0].uri);
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
    console.log("PBC: "+result.assets[0].uri);
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
    console.log("MOA: "+result.assets[0].uri);
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