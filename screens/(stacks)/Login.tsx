import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React from "react";

const atIcon = require("../../assets/images/Vector1x.png");
const lockIcon = require("../../assets/images/Group 471x.png");
const googleLogo = require("../../assets/images/google.png");
const appleLogo = require("../../assets/images/icons8-apple-logo 11x.png");
const fbLogo = require("../../assets/images/Group 521x.png");

const Login = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.appName, { marginTop: 40 }]}>FarmerEats</Text>
      <Text style={styles.welcome}>Welcome back!</Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 40 }}>
        <Text style={styles.newHere}>New here?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.createAccBtn}>Create account</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image source={atIcon} style={styles.inputIcon} resizeMode="contain" />
        <TextInput style={styles.input} placeholder="Email Address"></TextInput>
      </View>
      <View>
        <Image
          source={lockIcon}
          style={styles.inputIcon}
          resizeMode="contain"
        />
        <TextInput style={styles.input} placeholder="Password"></TextInput>
        <TouchableOpacity
          style={styles.forgotBtn}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.forgotBtnText}>Forgot?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or login with</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  appName: {
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 80,
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
    top: 35,
    zIndex: 2,
  },
  input: {
    width: "100%",
    height: 50,
    alignSelf: "center",

    backgroundColor: "#e9e9e9",
    paddingLeft: 40,
    marginVertical: 20,
    borderRadius: 10,
    zIndex: 1,
  },
  forgotBtn: {
    position: "absolute",
    right: 30,
    top: 36,
    zIndex: 2,
  },
  forgotBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#d5715b",
  },
  loginBtn: {
    width: "100%",
    height: 50,
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    backgroundColor: "#d5715b",
  },
  loginBtnText: {
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
});

export default Login;
