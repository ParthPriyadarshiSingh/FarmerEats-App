import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClerkProvider } from "@clerk/clerk-expo";
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
import Welcome from "./screens/(stacks)/Welcome";

const Stack = createNativeStackNavigator();

export default function App() {
  const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!}>
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
          <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider>
  );
}
