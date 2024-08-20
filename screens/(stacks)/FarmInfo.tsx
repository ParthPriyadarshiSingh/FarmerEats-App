import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const tagIcon = require("../../assets/images/Group 592x.png");
const emojiIcon = require("../../assets/images/Group 572x.png");
const homeIcon = require("../../assets/images/Vector2x-4.png");
const cityIcon = require("../../assets/images/Group 582x.png");
const arrowIcon = require("../../assets/images/Polygon 12x.png");
const backIcon = require("../../assets/images/Vector2x-3.png");
const { height } = Dimensions.get("window");

const FarmInfo = ({ navigation, route }: any) => {
  var { signupDetails } = route.params;
  const [businessName, setBusinessName] = useState<string>("");
  const [informalName, setInformalName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [isBusinessNameValid, setIsBusinessNameValid] = useState<boolean>(true);
  const [isInformalNameValid, setIsInformalNameValid] = useState<boolean>(true);

  const [isAddressValid, setIsAddressValid] = useState<boolean>(true);
  const [isCityValid, setIsCityValid] = useState<boolean>(true);
  const [isStateValid, setIsStateValid] = useState<boolean>(true);
  const [isZipcodeValid, setIsZipcodeValid] = useState<boolean>(true);
  const [businessNameError, setBusinessNameError] = useState<string>("");
  const [informalNameError, setInformalNameError] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");

  const [cityError, setCityError] = useState<string>("");
  const [stateError, setStateError] = useState<string>("");
  const [zipcodeError, setZipcodeError] = useState<string>("");

  const handleBusinessNameChange = (text: string): void => {
    if (text !== "") {
      setIsBusinessNameValid(true);
      setBusinessNameError("");
    }
    setBusinessName(text);
  };

  const handleBusinessNameBlur = (): void => {
    if (businessName !== "") {
      validateBusinessNameFormat();
    }
  };

  const handleInformalNameChange = (text: string): void => {
    if (text !== "") {
      setIsInformalNameValid(true);
      setInformalNameError("");
    }
    setInformalName(text);
  };

  const handleInformalNameBlur = (): void => {
    if (informalName !== "") {
      validateInformalNameFormat();
    }
  };

  const handleAddressChange = (text: string): void => {
    if (address !== "") {
      setIsAddressValid(true);
      setAddressError("");
    }
    setAddress(text);
  };

  const handleCityChange = (text: string): void => {
    if (city !== "") {
      setIsCityValid(true);
      setCityError("");
    }
    setCity(text);
  };

  const handleStateChange = (text: string): void => {
    if (state !== "") {
      setIsStateValid(true);
      setStateError("");
    }
    setState(text);
  };

  const handleZipCodeChange = (text: string): void => {
    if (zipCode !== null) {
      setIsZipcodeValid(true);
      setZipcodeError("");
    }
    setZipCode(text);
  };

  const validateBusinessNameFormat = (): boolean => {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (!nameRegex.test(businessName)) {
      setIsBusinessNameValid(false);
      setBusinessNameError("Invalid format");
      return false;
    } else {
      setIsBusinessNameValid(true);
      setBusinessNameError("");
      return true;
    }
  };

  const validateInformalNameFormat = (): boolean => {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (!nameRegex.test(businessName)) {
      setIsInformalNameValid(false);
      setInformalNameError("Invalid format");
      return false;
    } else {
      setIsInformalNameValid(true);
      setInformalNameError("");
      return true;
    }
  };

  const handleContinue = () => {
    const newDetails = {
      business_name: businessName,
      informal_name: informalName,
      address: address,
      city: city,
      state: state,
      zip_code: +zipCode,
    };
    if (validateSignupForm()) {
      signupDetails = { ...signupDetails, ...newDetails };
      navigation.navigate("Verification", { signupDetails });
    }
  };

  const validateSignupForm = (): boolean => {
    let isFormValid: boolean = true;
    isFormValid = validateBusinessNameFormat();
    isFormValid = validateInformalNameFormat();
    if (businessName === "") {
      setIsBusinessNameValid(false);
      setBusinessNameError("Required");
      isFormValid = false;
    }
    if (informalName === "") {
      setIsInformalNameValid(false);
      setInformalNameError("Required");
      isFormValid = false;
    }
    if (address === "") {
      setIsAddressValid(false);
      setAddressError("Required");
      isFormValid = false;
    }
    if (city === "") {
      setIsCityValid(false);
      setCityError("Required");
      isFormValid = false;
    }
    if (state === "") {
      setIsStateValid(false);
      setStateError("Required");
      isFormValid = false;
    }
    if (zipCode === "") {
      setIsZipcodeValid(false);
      setZipcodeError("Required");
      isFormValid = false;
    }

    return isFormValid;
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <SafeAreaView style={[styles.container, { paddingHorizontal: 25 }]}>
          <Text style={styles.appName}>FarmerEats</Text>
          <Text style={styles.signup}>Signup 2 of 4</Text>
          <Text style={styles.farmInfo}>Farm Info</Text>
          {!isBusinessNameValid ? (
            <Text style={{ color: "red" }}>{businessNameError}</Text>
          ) : null}
          <View>
            <Image
              source={tagIcon}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              onChangeText={handleBusinessNameChange}
              onBlur={handleBusinessNameBlur}
              value={businessName}
            ></TextInput>
          </View>
          {!isInformalNameValid ? (
            <Text style={{ color: "red" }}>{informalNameError}</Text>
          ) : null}
          <View>
            <Image
              source={emojiIcon}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={styles.input}
              placeholder="Informal Name"
              onChangeText={handleInformalNameChange}
              onBlur={handleInformalNameBlur}
              value={informalName}
            ></TextInput>
          </View>
          {!isAddressValid ? (
            <Text style={{ color: "red" }}>{addressError}</Text>
          ) : null}
          <View>
            <Image
              source={homeIcon}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={styles.input}
              placeholder="Street Address"
              onChangeText={handleAddressChange}
              value={address}
            ></TextInput>
          </View>
          {!isCityValid ? (
            <Text style={{ color: "red" }}>{cityError}</Text>
          ) : null}
          <View>
            <Image
              source={cityIcon}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              onChangeText={handleCityChange}
              value={city}
            ></TextInput>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <View style={{ width: "45%" }}>
              {!isStateValid ? (
                <Text style={{ color: "red" }}>{stateError}</Text>
              ) : null}
              <View>
                <TextInput
                  style={styles.stateInput}
                  placeholder="State"
                  onChangeText={handleStateChange}
                  value={state}
                ></TextInput>
                <Image
                  source={arrowIcon}
                  style={styles.arrowIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={{ width: "55%" }}>
              {!isZipcodeValid ? (
                <Text style={{ color: "red" }}>{zipcodeError}</Text>
              ) : null}
              <TextInput
                style={styles.zipcodeInput}
                placeholder="Enter Zipcode"
                keyboardType="numeric"
                onChangeText={handleZipCodeChange}
                value={zipCode}
              ></TextInput>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={backIcon}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={handleContinue}
            >
              <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minHeight: height,
  },
  appName: {
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 30,
  },
  signup: {
    fontSize: 16,
    fontWeight: "500",
    color: "#CCCCCC",
    marginBottom: 10,
  },
  farmInfo: {
    fontSize: 40,
    fontWeight: "700",
    color: "#261C12",
    marginBottom: 30,
  },
  inputIcon: {
    width: 18,
    height: 18,
    position: "absolute",
    left: 15,
    top: 25,
    zIndex: 2,
  },
  input: {
    width: "100%",
    height: 50,
    alignSelf: "center",
    backgroundColor: "#e9e9e9",
    paddingLeft: 40,
    marginVertical: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  stateInput: {
    width: "85%",
    height: 50,
    backgroundColor: "#e9e9e9",
    padding: 10,
    zIndex: 0,
    borderRadius: 10,
  },
  arrowIcon: {
    position: "absolute",
    top: 16,
    right: 32,
    width: 16,
    height: 16,
    zIndex: 1,
  },
  zipcodeInput: {
    height: 50,
    backgroundColor: "#e9e9e9",
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  continueBtn: {
    width: "70%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d5715b",
  },
  continueBtnText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
});

export default FarmInfo;
