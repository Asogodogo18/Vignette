import { View, Text } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Agent from "../../screen/admin/gestionAgent";
import Guichet from "../../screen/admin/gestionGuichet";
import PuisFiscale from "../../screen/admin/gestionPuisFiscal";
import Vignette from "../../screen/admin/gestionVignette";
const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerTitleAlign: "center" }}
    >
      <Stack.Screen name="Agent" component={Agent} />
      <Stack.Screen name="Guichet" component={Guichet} />
      <Stack.Screen name="PuisFiscale" component={PuisFiscale} />
      <Stack.Screen name="Vignette" component={Vignette} />
    </Stack.Navigator>
  );
};

export default Index;
