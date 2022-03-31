import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./src/router/stack";

export default function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar style="auto" /> */}
      <Stack />
    </NavigationContainer>
  );
}
