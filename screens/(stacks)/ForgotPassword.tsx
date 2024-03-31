import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";

const statusBarHeight = StatusBar.currentHeight || 0;
const phoneIcon = require("../../assets/images/Vector2x-2.png");

const ForgotPassword = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const handleInputChange = (txt: string): void => {
    setPhoneNumber(txt);
    if (txt.length === 10) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.appName, { marginTop: statusBarHeight + 40 }]}>
        FarmerEats
      </Text>
      <Text style={styles.forgot}>Forgot Password?</Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 40 }}>
        <Text style={styles.remember}>Remember your password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginBtn}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={phoneIcon}
          style={styles.inputIcon}
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          maxLength={10}
          value={phoneNumber}
          onChangeText={(txt) => handleInputChange(txt)}
          keyboardType="numeric"
        ></TextInput>
      </View>

      <TouchableOpacity
        style={[styles.sendCodeBtn, { opacity: isFilled ? 1 : 0.5 }]}
        disabled={!isFilled}
        onPress={() => navigation.navigate("OtpScreen")}
      >
        <Text style={styles.sendCodeBtnText}>Send Code</Text>
      </TouchableOpacity>
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
  forgot: {
    fontSize: 40,
    fontWeight: "700",
    color: "#261C12",
    marginBottom: 30,
  },
  remember: {
    fontSize: 16,
    fontWeight: "500",
    color: "#CCCCCC",
  },
  loginBtn: {
    fontSize: 16,
    fontWeight: "500",
    color: "#d5715b",
  },
  inputIcon: {
    width: 16,
    height: 16,
    position: "absolute",
    left: 18,
    top: 36,
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
  sendCodeBtn: {
    width: "100%",
    height: 50,
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    backgroundColor: "#d5715b",
  },
  sendCodeBtnText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
});

export default ForgotPassword;
