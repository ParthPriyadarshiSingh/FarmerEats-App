import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { SafeAreaView } from "react-native-safe-area-context";

const profileIcon = require("../../assets/images/Group 542x.png");
const atIcon = require("../../assets/images/Vector2x.png");
const phoneIcon = require("../../assets/images/Vector2x-2.png");

const lockIcon = require("../../assets/images/Group 472x.png");
const googleLogo = require("../../assets/images/google.png");
const appleLogo = require("../../assets/images/icons8-apple-logo 11x.png");
const fbLogo = require("../../assets/images/Group 522x.png");
const { height } = Dimensions.get("window");

const Signup = ({ navigation }: any) => {
  const [msg, setMsg] = useState<string>("");
  const [fullName, setfullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);

  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
    useState<boolean>(true);
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const handleNameInputChange = (text: string): void => {
    if (text !== "") {
      setIsNameValid(true);
      setNameError("");
    }
    setfullName(text);
  };

  const handleNameBlur = (): void => {
    if (fullName !== "") {
      validateNameFormat();
    }
  };

  const handleEmailInputChange = (text: string): void => {
    if (text !== "") {
      setIsEmailValid(true);
      setEmailError("");
    }
    setEmail(text);
  };

  const handleEmailBlur = (): void => {
    if (email !== "") {
      validateEmailFormat();
    }
  };

  const handlePhoneInputChange = (text: string): void => {
    if (phone !== "") {
      setIsPhoneValid(true);
      setPhoneError("");
    }
    setPhone(text);
  };

  const handlePasswordInputChange = (text: string): void => {
    if (text !== "") {
      setIsPasswordValid(true);
      setPasswordError("");
    }
    setPassword(text);
  };

  const handleConfirmPasswordInputChange = (text: string): void => {
    if (text !== "") {
      setIsConfirmPasswordValid(true);
      setConfirmPasswordError("");
      setMsg("");
    }
    setConfirmPassword(text);
  };

  const validateNameFormat = (): boolean => {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (!nameRegex.test(fullName)) {
      setIsNameValid(false);
      setNameError("Invalid format");
      return false;
    } else {
      setIsEmailValid(true);
      setEmailError("");
      return true;
    }
  };

  const validateEmailFormat = (): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      setEmailError("Invalid format");
      return false;
    } else {
      setIsEmailValid(true);
      setEmailError("");
      return true;
    }
  };
  const handleContinue = () => {
    var signupDetails = {
      full_name: fullName,
      email: email,
      phone: `+91${phone}`,
      password: password,
    };
    if (validateSignupForm()) {
      navigation.navigate("FarmInfo", { signupDetails });
    }
  };

  const validateSignupForm = (): boolean => {
    let isFormValid: boolean = true;
    isFormValid = validateEmailFormat();
    isFormValid = validateNameFormat();
    if (fullName === "") {
      setIsNameValid(false);
      setNameError("Required");
      isFormValid = false;
    }
    if (email === "") {
      setIsEmailValid(false);
      setEmailError("Required");
      isFormValid = false;
    }
    if (phone === "") {
      setIsPhoneValid(false);
      setPhoneError("Required");
      isFormValid = false;
    }
    if (password === "") {
      setIsPasswordValid(false);
      setPasswordError("Required");
      isFormValid = false;
    }
    if (confirmPassword === "") {
      setIsConfirmPasswordValid(false);
      setConfirmPasswordError("Required");
      isFormValid = false;
    }
    if (password !== confirmPassword) {
      setMsg("Passwords didn't match");
      isFormValid = false;
    }
    return isFormValid;
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <SafeAreaView style={[styles.container, { paddingHorizontal: 25 }]}>
          <Text style={styles.appName}>FarmerEats</Text>
          <Text style={styles.signup}>Signup 1 of 4</Text>
          <Text style={styles.welcome}>Welcome!</Text>
          <View style={styles.loginOptionsContainer}>
            <TouchableOpacity style={styles.logoContainer}>
              <Image source={googleLogo} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoContainer}>
              <Image source={appleLogo} style={styles.logo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoContainer}>
              <Image source={fbLogo} style={styles.logo} />
            </TouchableOpacity>
          </View>
          <Text style={styles.orText}>or signup with</Text>
          {msg === "" ? null : <Text style={styles.msgBox}>{msg}</Text>}
          {!isNameValid ? (
            <Text style={{ color: "red" }}>{nameError}</Text>
          ) : null}
          <View>
            <Image
              source={profileIcon}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={[
                styles.input,
                isNameValid && { borderWidth: 0 },
                !isNameValid && { borderWidth: 1.5 },
              ]}
              placeholder="Full Name"
              onChangeText={(text) => handleNameInputChange(text)}
              onBlur={handleNameBlur}
              value={fullName}
            ></TextInput>
          </View>
          {!isEmailValid ? (
            <Text style={{ color: "red" }}>{emailError}</Text>
          ) : null}
          <View>
            <Image
              source={atIcon}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={[
                styles.input,
                isEmailValid && { borderWidth: 0 },
                !isEmailValid && { borderWidth: 1.5 },
              ]}
              placeholder="Email Address"
              onChangeText={(text) => handleEmailInputChange(text)}
              onBlur={handleEmailBlur}
              value={email}
            ></TextInput>
          </View>

          {!isPhoneValid ? (
            <Text style={{ color: "red" }}>{phoneError}</Text>
          ) : null}
          <View>
            <Image
              source={phoneIcon}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={[
                styles.input,
                isPhoneValid && { borderWidth: 0 },
                !isPhoneValid && { borderWidth: 1.5 },
              ]}
              placeholder="Phone Number"
              maxLength={10}
              value={phone}
              onChangeText={(input) => handlePhoneInputChange(input)}
              keyboardType="numeric"
            ></TextInput>
          </View>
          {!isPasswordValid ? (
            <Text style={{ color: "red" }}>{passwordError}</Text>
          ) : null}
          <View>
            <Image
              source={lockIcon}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={[
                styles.input,
                isPasswordValid && { borderWidth: 0 },
                !isPasswordValid && { borderWidth: 1.5 },
              ]}
              placeholder="Password"
              onChangeText={(text) => handlePasswordInputChange(text)}
              value={password}
            ></TextInput>
          </View>
          {!isConfirmPasswordValid ? (
            <Text style={{ color: "red" }}>{confirmPasswordError}</Text>
          ) : null}
          <View>
            <Image
              source={lockIcon}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={[
                styles.input,
                isConfirmPasswordValid && { borderWidth: 0 },
                !isConfirmPasswordValid && { borderWidth: 1.5 },
              ]}
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChangeText={(input) => handleConfirmPasswordInputChange(input)}
            ></TextInput>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontSize: 18,
                  fontWeight: "400",
                }}
              >
                Login
              </Text>
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
  welcome: {
    fontSize: 40,
    fontWeight: "700",
    color: "#261C12",
    marginBottom: 10,
  },

  loginOptionsContainer: {
    width: "100%",
    marginTop: 30,
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  logoContainer: {
    width: 100,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#e9e9e9",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 28,
    height: 28,
  },
  orText: {
    fontWeight: "500",
    marginVertical: 20,
    color: "#CCCCCC",
    alignSelf: "center",
  },
  msgBox: {
    fontSize: 16,
    color: "red",
    alignSelf: "center",
  },
  inputIcon: {
    width: 18,
    height: 18,
    position: "absolute",
    left: 16,
    top: 25,
    zIndex: 2,
  },
  input: {
    width: "100%",
    height: 50,
    alignSelf: "center",
    fontSize: 20,
    backgroundColor: "#e9e9e9",
    paddingLeft: 40,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 0,
    zIndex: 1,
  },
  btnContainer: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
  },
  continueBtn: {
    width: "70%",
    height: 50,
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

export default Signup;
