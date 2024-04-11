import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import CountryData from "../assets/data/CountryCodes.json";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  phone: string;
  setPhone: (phone: string) => void;
}

const SignupPhoneInput = ({ phone, setPhone }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState(["🇮🇳", "+91", "IN"]);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(CountryData);

  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);
  const [phoneError, setPhoneError] = useState<string>("");

  const handleBlur = (): void => {
    if (phone === "") {
      return;
    }
    if (phone && validatePhoneNumber(phone, selectedCountry[2])) {
      setIsPhoneValid(true);
      setPhoneError("");
    } else {
      setIsPhoneValid(false);
      setPhoneError("Invalid format");
    }
  };

  const handleUpdatePhoneNumber = (text: string) => {
    setPhone(text);
    if (text !== "") {
      setIsPhoneValid(true);
      setPhoneError("");
    }
  };

  const validatePhoneNumber = (phoneNumber: string, countryCode: any) => {
    try {
      const phoneNumberObj = parsePhoneNumberFromString(
        phoneNumber,
        countryCode
      );
      if (phoneNumberObj && phoneNumberObj.isValid()) {
        return true; // Valid phone number format
      }
    } catch (error) {
      console.log("error in mobile number validation");
    }
    return false; // Invalid phone number format
  };

  const onSearch = (searchText: string) => {
    if (searchText) {
      let filteredData = CountryData.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(CountryData);
    }
  };

  return (
    <View style={styles.container}>
      {!isPhoneValid ? (
        <Text style={{ color: "red" }}>{phoneError}</Text>
      ) : null}
      <View style={styles.numberContainer}>
        <TouchableOpacity
          style={[
            styles.dropdownBox,
            !isPhoneValid && { borderWidth: 1.5, borderRightWidth: 0 },
          ]}
          activeOpacity={0.6}
          onPress={() => setClicked(!clicked)}
        >
          {clicked ? (
            <FontAwesome name="angle-up" size={18} color="#000" />
          ) : (
            <FontAwesome name="angle-down" size={18} color="#000" />
          )}
          <Text style={styles.selectedInput}>
            {selectedCountry[0] + selectedCountry[1]}{" "}
          </Text>
          <Text
            style={{
              fontSize: 32,
              color: "#000",
              fontWeight: "200",
              marginBottom: 5,
            }}
          >
            |
          </Text>
        </TouchableOpacity>
        <TextInput
          style={[
            styles.numberInput,
            !isPhoneValid && { borderWidth: 1.5, borderLeftWidth: 0 },
          ]}
          placeholder="Phone Number"
          keyboardType="numeric"
          returnKeyType="done"
          maxLength={10}
          value={phone}
          onChangeText={(text) => handleUpdatePhoneNumber(text)}
          onBlur={handleBlur}
        />
      </View>
      {clicked ? (
        <Modal
          transparent={true}
          visible={clicked}
          onRequestClose={() => setClicked(false)}
          animationType="slide"
        >
          <TouchableOpacity
            onPress={() => setClicked(false)}
            style={{ flex: 1 }}
          ></TouchableOpacity>
          <View style={styles.dropdownArea}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#000"
              onChangeText={(txt) => {
                onSearch(txt);
              }}
            ></TextInput>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectedCountry([item.flag, item.dial_code, item.code]);
                    setClicked(!clicked);
                    onSearch("");
                  }}
                >
                  <Text style={styles.dropdownText}>
                    {item.flag} {item.dial_code} | {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  numberContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownBox: {
    width: "30%",
    height: 50,
    backgroundColor: "#e9e9e9",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 0,
    borderColor: "red",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 5,
  },
  selectedInput: {
    fontSize: 20,
  },
  numberInput: {
    width: "70%",
    height: 50,
    paddingLeft: 10,
    backgroundColor: "#e9e9e9",
    borderWidth: 0,
    fontSize: 20,
    borderColor: "red",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  dropdownArea: {
    paddingVertical: 10,
    backgroundColor: "#F89880",
    width: "100%",
    height: "60%",
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
  },
  searchInput: {
    backgroundColor: "#fff",
    fontSize: 16,
    width: "95%",
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#000",
    alignSelf: "center",
    paddingLeft: 10,
  },
  dropdownText: {
    fontSize: 20,
    color: "#000",
  },
  countryItem: {
    width: "90%",
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default SignupPhoneInput;
