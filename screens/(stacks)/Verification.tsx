import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const cameraIcon = require("../../assets/images/Group 612x.png");

const backIcon = require("../../assets/images/Vector2x-3.png");

const closeIcon = require("../../assets/images/Group 712x.png");

const Verification = ({ navigation, route }: any) => {
  var { signupDetails } = route.params;
  const [file, setFile] = useState<string>("");

  const handleContinue = () => {
    const newDetails = {
      registration_proof: file,
    };
    signupDetails = { ...signupDetails, ...newDetails };
    console.log(signupDetails);
    navigation.navigate("BusinessHours", { signupDetails });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.appName, { marginTop: 40 }]}>FarmerEats</Text>
      <Text style={styles.signup}>Signup 3 of 4</Text>
      <Text style={styles.verification}>Verification</Text>
      <Text style={styles.inst}>
        Attached proof of Department of Agriculture registrations i.e. Florida
        Fresh, USDA Approved, USDA Organic
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setFile("usda_registration.pdf")}>
          <Text style={styles.attachText}>Attach proof of registration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Image source={cameraIcon} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      {file && (
        <View style={styles.fileBox}>
          <Text
            style={{
              textDecorationLine: "underline",
              fontSize: 16,
              fontWeight: "400",
            }}
          >
            {file}
          </Text>
          <TouchableOpacity onPress={() => setFile("usda_registration.pdf")}>
            <Image source={closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={backIcon}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 30,
  },
  signup: {
    fontSize: 16,
    fontWeight: "500",
    color: "#CCCCCC",
    marginBottom: 10,
  },
  verification: {
    fontSize: 40,
    fontWeight: "700",
    color: "#261C12",
    marginBottom: 30,
  },
  inst: {
    color: "#CCCCCC",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 30,
  },
  attachText: {
    color: "#261C12",
    fontSize: 16,
    fontWeight: "500",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#d5715b",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  fileBox: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e9e9e9",
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  continueBtn: {
    width: "70%",
    height: 50,
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#d5715b",
  },
  continueBtnText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
});

export default Verification;
