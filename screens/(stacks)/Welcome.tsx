import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

const Welcome = ({ navigation }: any) => {
  const { signOut, isSignedIn } = useAuth();

  const handleLogout = () => {
    signOut();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "#d5715b" }}>Welcome!!!</Text>
      {isSignedIn && (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ fontSize: 24, marginTop: 30, color: "blue" }}>
            Logout
          </Text>
        </TouchableOpacity>
      )}
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
