import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Welcome = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome!</Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
  },
});
