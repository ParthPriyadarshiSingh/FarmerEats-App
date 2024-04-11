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
import SignupPhoneInput from "../../components/SignupPhoneInput";

const profileIcon = require("../../assets/images/Group 542x.png");
const atIcon = require("../../assets/images/Vector2x.png");
const lockIcon = require("../../assets/images/Group 472x.png");
const googleLogo = require("../../assets/images/google.png");
const appleLogo = require("../../assets/images/icons8-apple-logo 11x.png");
const fbLogo = require("../../assets/images/Group 521x.png");
const { height } = Dimensions.get("window");

const Signup = ({ navigation }: any) => {
  const [msg, setMsg] = useState<string>("");
  const [fullName, setfullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [passwordRetyped, setPasswordRetyped] = useState<string>("");
  const handleContinue = () => {
    var signupDetails = {
      full_name: fullName,
      email: email,
      phone: phone,
      password: password,
    };
    if (passwordRetyped === password) {
      navigation.navigate("FarmInfo", { signupDetails });
    } else {
      setMsg("Passwords doesn't match");
      setTimeout(() => {
        setMsg("");
      }, 5000);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <Text style={[styles.appName, { marginTop: 40 }]}>My-App</Text>
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
        <Text style={styles.msgBox}>{msg}</Text>

        <View>
          <Image
            source={profileIcon}
            style={styles.inputIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onChangeText={(input) => setfullName(input)}
            value={fullName}
          ></TextInput>
        </View>
        <View>
          <Image
            source={atIcon}
            style={styles.inputIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            onChangeText={(input) => setEmail(input)}
            value={email}
          ></TextInput>
        </View>
        <SignupPhoneInput phone={phone} setPhone={setPhone} />
        <View>
          <Image
            source={lockIcon}
            style={styles.inputIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(input) => setPassword(input)}
            value={password}
          ></TextInput>
        </View>
        <View>
          <Image
            source={lockIcon}
            style={styles.inputIcon}
            resizeMode="contain"
          />
          <TextInput
            style={[styles.input]}
            placeholder="Re-enter Password"
            value={passwordRetyped}
            onChangeText={(input) => setPasswordRetyped(input)}
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
    paddingLeft: 50,
    marginVertical: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
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

export default Signup;
