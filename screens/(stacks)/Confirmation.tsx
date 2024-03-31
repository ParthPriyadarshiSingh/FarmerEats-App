import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const tickIcon = require("../../assets/images/Vector3x-5.png");

const Confirmation = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image source={tickIcon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.title}>You're all done!</Text>
      <Text style={styles.info}>
        Hang tight! We are currently reviewing your account and will follow up
        with you in 2-3 business days. In the meantime, you can setup your
        inventory.
      </Text>
      <TouchableOpacity
        style={styles.gotItBtn}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "500" }}>
          Got it!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  icon: {
    marginTop: 180,
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#261C12",
    marginVertical: 20,
  },
  info: {
    marginVertical: 20,
    fontSize: 16,
    fontWeight: "400",
    color: "#898989",
    textAlign: "center",
  },
  gotItBtn: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#d5715b",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Confirmation;
