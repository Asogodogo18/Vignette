import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/router/Rootstack";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootStack />
    </NavigationContainer>
  );
}
