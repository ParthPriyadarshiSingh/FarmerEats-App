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
  const [zipCode, setZipCode] = useState<number>();

  const handleContinue = () => {
    const newDetails = {
      business_name: businessName,
      informal_name: informalName,
      address: address,
      city: city,
      state: state,
      zip_code: zipCode,
    };
    signupDetails = { ...signupDetails, ...newDetails };
    // setSignupDetails(updatedSignupDetails);
    console.log(signupDetails);
    navigation.navigate("Verification", { signupDetails });
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <Text style={[styles.appName, { marginTop: 40 }]}>FarmerEats</Text>
        <Text style={styles.signup}>Signup 2 of 4</Text>
        <Text style={styles.farmInfo}>Farm Info</Text>
        <View>
          <Image
            source={tagIcon}
            style={styles.inputIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Business Name"
            onChangeText={(input) => setBusinessName(input)}
            value={businessName}
          ></TextInput>
        </View>
        <View>
          <Image
            source={emojiIcon}
            style={styles.inputIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Informal Name"
            onChangeText={(input) => setInformalName(input)}
            value={informalName}
          ></TextInput>
        </View>
        <View>
          <Image
            source={homeIcon}
            style={styles.inputIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Street Address"
            onChangeText={(input) => setAddress(input)}
            value={address}
          ></TextInput>
        </View>
        <View>
          <Image
            source={cityIcon}
            style={styles.inputIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            onChangeText={(input) => setCity(input)}
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
          <View style={{ width: "38%" }}>
            <TextInput
              style={styles.stateInput}
              placeholder="State"
              onChangeText={(input) => setState(input)}
              value={state}
            ></TextInput>
            <Image
              source={arrowIcon}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </View>
          <TextInput
            style={styles.zipcodeInput}
            placeholder="Enter Zipcode"
            keyboardType="numeric"
            onChangeText={(input) => setZipCode(Number(input))}
            value={zipCode?.toString()}
          ></TextInput>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={backIcon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
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
    width: "100%",
    height: 50,
    backgroundColor: "#e9e9e9",
    padding: 10,
    zIndex: 0,
    borderRadius: 10,
  },
  arrowIcon: {
    position: "absolute",
    top: 16,
    right: 18,
    width: 16,
    height: 16,
    zIndex: 1,
  },
  zipcodeInput: {
    width: "55%",
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
    bottom: 30,
    alignSelf: "center",
  },
  continueBtn: {
    width: "70%",
    height: 50,
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#d5715b",
  },
  continueBtnText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
});

export default FarmInfo;
