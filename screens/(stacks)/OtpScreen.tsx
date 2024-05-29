import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import OtpInput from "../../components/OtpInput";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const OtpScreen = ({ navigation }: any) => {
  const otpLength = 6;
  const [isOtpFilled, setIsOtpFilled] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(new Array(otpLength).fill(""));
  const [otpError, setOtpError] = useState<string>("");

  useEffect(() => {
    setOtpError("");
    if (otp.findIndex((value) => value === "") < 0) {
      setIsOtpFilled(true);
    } else {
      setIsOtpFilled(false);
    }
  }, [otp]);

  const onSubmitPress = async () => {
    const otpDetail = {
      otp: otp,
    };
    try {
      const response = await fetch(`${BASE_URL}/user/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otpDetail),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      for (const key in responseData) {
        console.log(`${key}: ${responseData[key]}`);
      }
      if (responseData.success === true) {
        navigation.navigate("ResetPassword");
      } else {
        setOtpError(responseData.message);
        setTimeout(() => {
          setOtpError("");
        }, 5000);
      }
    } catch (error) {
      console.log("verify otp error: " + error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.container, { paddingHorizontal: 25 }]}>
        <Text style={styles.appName}>FarmerEats</Text>
        <Text style={styles.verify}>Verify OTP</Text>
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 40 }}>
          <Text style={styles.remember}>Remember your password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginBtn}>Login</Text>
          </TouchableOpacity>
        </View>
        {otpError !== "" ? (
          <Text style={{ color: "red" }}>{otpError}</Text>
        ) : null}

        {otpLength ? (
          <OtpInput otp={otp} setOtp={setOtp} otpLength={otpLength} />
        ) : null}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onSubmitPress}
          style={[styles.submitBtn, { opacity: isOtpFilled ? 1 : 0.5 }]}
          disabled={!isOtpFilled}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Text style={styles.resendBtnText}>Resend Code</Text>
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
  verify: {
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
  submitBtn: {
    width: "100%",
    height: 50,
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#d5715b",
  },
  submitBtnText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
  resendBtnText: {
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default OtpScreen;
