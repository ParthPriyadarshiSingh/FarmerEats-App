import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const phoneIcon = require("../../assets/images/Vector2x-2.png");

const ForgotPassword = ({ navigation }: any) => {
  const [phone, setPhone] = useState<string>("");
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const handleInputChange = (text: string): void => {
    setPhone(text);
    if (text.length === 10) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
    console.log(`+91${text}`);
  };

  const onSendCodePress = async () => {
    const phoneDetail = {
      mobile: `+91${phone}`,
    };
    try {
      const response = await fetch(`${BASE_URL}/user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(phoneDetail),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      for (const key in responseData) {
        console.log(`${key}: ${responseData[key]}`);
      }
      if (responseData.success === true) {
        navigation.navigate("OtpScreen");
      } else {
        setMsg(responseData.message);
        setTimeout(() => {
          setMsg("");
        }, 5000);
      }
    } catch (error) {
      console.log("Send code error: " + error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.container, { paddingHorizontal: 25 }]}>
        <Text style={styles.appName}>FarmerEats</Text>
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
            value={phone}
            onChangeText={(txt) => handleInputChange(txt)}
            keyboardType="numeric"
          ></TextInput>
        </View>
        <Text style={{ color: "red", textAlign: "center" }}>{msg}</Text>
        <TouchableOpacity
          style={[styles.sendCodeBtn, { opacity: isFilled ? 1 : 0.5 }]}
          disabled={!isFilled}
          onPress={onSendCodePress}
        >
          <Text style={styles.sendCodeBtnText}>Send Code</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
