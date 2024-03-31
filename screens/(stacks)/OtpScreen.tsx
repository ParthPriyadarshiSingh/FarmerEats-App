import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import OtpInput from "../../components/OtpInput";

const statusBarHeight = StatusBar.currentHeight || 0;
const OtpScreen = ({ navigation }: any) => {
  const [otpFilled, setOtpFilled] = useState<boolean>(false);

  const verifyBtnOpac = (otpFilledStatus: boolean) => {
    setOtpFilled(otpFilledStatus);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.appName, { marginTop: statusBarHeight + 40 }]}>
        FarmerEats
      </Text>
      <Text style={styles.verify}>Verify OTP</Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 40 }}>
        <Text style={styles.remember}>Remember your password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginBtn}>Login</Text>
        </TouchableOpacity>
      </View>
      <OtpInput length={5} sendOtpFilledStatus={verifyBtnOpac} />
      <TouchableOpacity
        style={[styles.submitBtn, { opacity: otpFilled ? 1 : 0.5 }]}
        disabled={!otpFilled}
      >
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignSelf: "center" }}>
        <Text style={styles.resendBtnText}>Resend Code</Text>
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
    width: "90%",
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
