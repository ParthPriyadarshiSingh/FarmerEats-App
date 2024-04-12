import React, { useEffect, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

interface Props {
  otp: string[];
  setOtp: (otp: string[]) => void;
  otpLength: number;
}

const OtpInput = ({ otp, setOtp, otpLength }: Props) => {
  const otpInputRefs = useRef<TextInput[]>(new Array(otpLength).fill(null));

  useEffect(() => {
    otpInputRefs.current[0].focus();
  }, []);

  const handleOTPInputChange = (text: string, index: number): void => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);
    if (
      text !== "" &&
      index < otpLength - 1 &&
      otpInputRefs.current[index + 1]
    ) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPInputKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void => {
    const { key } = event.nativeEvent;
    const index = otp.findIndex((value) => value === "");
    if (key === "Backspace" && index > 0 && otp[index] === "") {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          ref={(ref) => (otpInputRefs.current[index] = ref as TextInput)}
          value={value}
          onChangeText={(text) => handleOTPInputChange(text, index)}
          onKeyPress={handleOTPInputKeyPress}
          keyboardType="numeric"
          maxLength={1}
          enterKeyHint="done"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    backgroundColor: "#E9E9E9",
    width: 50,
    height: 50,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 28,
  },
});

export default OtpInput;
