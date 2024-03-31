import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React from "react";

const lockIcon = require("../../assets/images/Group 471x.png");

const ResetPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.appName, { marginTop: 40 }]}>FarmerEats</Text>
      <Text style={styles.reset}>Reset Password</Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 40 }}>
        <Text style={styles.remember}>Remember your password?</Text>
        <TouchableOpacity>
          <Text style={styles.loginBtn}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={lockIcon}
          style={styles.inputIcon}
          resizeMode="contain"
        />
        <TextInput style={styles.input} placeholder="New Password"></TextInput>
      </View>
      <View>
        <Image
          source={lockIcon}
          style={styles.inputIcon}
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.submitBtn}>
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
