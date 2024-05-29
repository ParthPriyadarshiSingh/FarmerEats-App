import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "#d5715b" }}>Welcome!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Welcome;
