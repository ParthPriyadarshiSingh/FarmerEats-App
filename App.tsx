import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./screens/(stacks)/Onboarding";
import Login from "./screens/(stacks)/Login";
import ForgotPassword from "./screens/(stacks)/ForgotPassword";
import OtpScreen from "./screens/(stacks)/OtpScreen";
import ResetPassword from "./screens/(stacks)/ResetPassword";
import Signup from "./screens/(stacks)/Signup";
import FarmInfo from "./screens/(stacks)/FarmInfo";
import Verification from "./screens/(stacks)/Verification";
import BusinessHours from "./screens/(stacks)/BusinessHours";
import Confirmation from "./screens/(stacks)/Confirmation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="FarmInfo" component={FarmInfo} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="BusinessHours" component={BusinessHours} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
