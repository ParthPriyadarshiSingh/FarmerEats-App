import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const lockIcon = require("../../assets/images/Group 472x.png");

const ResetPassword = ({ navigation }: any) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
    useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const handlePasswordInputChange = (text: string) => {
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
    }
    setConfirmPassword(text);
  };

  const validateResetPasswordForm = (): boolean => {
    let isFormValid = true;
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
    return isFormValid;
  };

  const handleSubmitPress = async () => {
    if (validateResetPasswordForm()) {
      const resetPasswordDetails = {
        token: "123456",
        password: password,
        cPassword: confirmPassword,
      };
      try {
        const response = await fetch(`${BASE_URL}/user/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resetPasswordDetails),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        for (const key in responseData) {
          console.log(`${key}: ${responseData[key]}`);
        }
        if (responseData.success === true) {
          console.warn("Password Reset");
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log("reset password error:" + error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.appName, { marginTop: 40 }]}>FarmerEats</Text>
      <Text style={styles.reset}>Reset Password</Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 40 }}>
        <Text style={styles.remember}>Remember your password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginBtn}>Login</Text>
        </TouchableOpacity>
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
          placeholder="New Password"
          value={password}
          onChangeText={(input) => handlePasswordInputChange(input)}
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
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={(input) => handleConfirmPasswordInputChange(input)}
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitPress}>
        <Text style={styles.submitBtnText}>Submit</Text>
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
  reset: {
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
    width: 18,
    height: 18,
    position: "absolute",
    left: 15,
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
});

export default ResetPassword;
