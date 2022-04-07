import { View, Text } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Accueil from "../../screen/accueil";
import Scan from "../../screen/scan";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerTitleAlign: "center" }}
    >
      <Stack.Screen name="Accueil" component={Accueil} />
      <Stack.Screen name="Scan" component={Scan} />
    </Stack.Navigator>
  );
};

export default Index;
