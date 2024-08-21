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
import { useAuth, useOAuth } from "@clerk/clerk-expo";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const atIcon = require("../../assets/images/Vector2x.png");
const lockIcon = require("../../assets/images/Group 472x.png");
const googleLogo = require("../../assets/images/google.png");
const appleLogo = require("../../assets/images/icons8-apple-logo 11x.png");
const fbLogo = require("../../assets/images/Group 522x.png");
const { height } = Dimensions.get("window");

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleEmailInputChange = (text: string): void => {
    if (text !== "") {
      setIsEmailValid(true);
      setEmailError("");
    }
    setEmail(text);
  };

  const handlePasswordInputChange = (text: string): void => {
    if (text !== "") {
      setIsPasswordValid(true);
      setPasswordError("");
    }
    setPassword(text);
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

  const validateLoginForm = (): boolean => {
    let isFormValid: boolean = true;
    isFormValid = validateEmailFormat();
    if (email === "") {
      setIsEmailValid(false);
      setEmailError("Required");
      isFormValid = false;
    }
    if (password === "") {
      setIsPasswordValid(false);
      setPasswordError("Required");
      isFormValid = false;
    }
    return isFormValid;
  };

  const onLoginPress = async () => {
    if (validateLoginForm()) {
      const loginDetails = {
        email: email,
        password: password,
        role: "farmer",
        device_token: "0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx",
        type: "email",
        social_id: "0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx",
      };
      console.log(loginDetails);

      try {
        const response = await fetch(`${BASE_URL}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginDetails),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        for (const key in responseData) {
          console.log(`${key}: ${responseData[key]}`);
        }
        if (responseData.success === true) {
          console.warn("Login successful");
          navigation.navigate("Welcome");
        }
      } catch (error) {
        console.log("Login error:" + error);
      }
    }
  };

  enum Strategy {
    Google = "oauth_google",
    Apple = "oauth_apple",
    Facebook = "oauth_facebook",
  }

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        navigation.navigate("Welcome");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const { isSignedIn, signOut } = useAuth();

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <SafeAreaView style={[styles.container, { paddingHorizontal: 25 }]}>
          <Text style={[styles.appName]}>FarmerEats</Text>
          <Text style={styles.welcome}>Welcome back!</Text>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 40 }}>
            <Text style={styles.newHere}>New here?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.createAccBtn}>Create account</Text>
            </TouchableOpacity>
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
              value={email}
              onChangeText={(text) => handleEmailInputChange(text)}
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
              value={password}
              secureTextEntry
              onChangeText={(text) => handlePasswordInputChange(text)}
            ></TextInput>
            <TouchableOpacity
              style={styles.forgotBtn}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotBtnText}>Forgot?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn} onPress={onLoginPress}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or login with</Text>
          <View style={styles.loginOptionsContainer}>
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => onSelectAuth(Strategy.Google)}
            >
              <Image source={googleLogo} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => onSelectAuth(Strategy.Apple)}
            >
              <Image source={appleLogo} style={styles.logo} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => onSelectAuth(Strategy.Facebook)}
            >
              <Image source={fbLogo} style={styles.logo} />
            </TouchableOpacity>
          </View>
          {isSignedIn && (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => signOut()}
            >
              <Text style={{ fontSize: 24, marginTop: 30, color: "blue" }}>
                Logout
              </Text>
            </TouchableOpacity>
          )}
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
  welcome: {
    fontSize: 40,
    fontWeight: "700",
    color: "#261C12",
    marginBottom: 30,
  },
  newHere: {
    fontSize: 16,
    fontWeight: "500",
    color: "#CCCCCC",
  },
  createAccBtn: {
    fontSize: 16,
    fontWeight: "500",
    color: "#d5715b",
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

  forgotBtn: {
    position: "absolute",
    right: 30,
    top: 26,
    zIndex: 2,
  },
  forgotBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#d5715b",
  },
  btn: {
    width: "100%",
    height: 45,
    marginVertical: 10,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#d5715b",
  },
  btnText: {
    letterSpacing: 1.1,
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
  orText: {
    marginVertical: 10,
    color: "#261C124D",
    alignSelf: "center",
  },
  loginOptionsContainer: {
    width: "100%",
    marginTop: 20,
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
});

export default Login;
