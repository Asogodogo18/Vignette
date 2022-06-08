import { View, Text } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Agent from "../../screen/admin/gestionAgent";
import Guichet from "../../screen/admin/gestionGuichet";
import PuisFiscale from "../../screen/admin/gestionPuisFiscal";
import Vignette from "../../screen/admin/gestionVignette";
import Accueil from "../../screen/admin/Accueil";
import Profil from "../../screen/admin/profil";
import Buy from "../../screen/client/Buy";
import Payment from "../../screen/admin/Payment";
import Transfert from "../../screen/admin/transfert";
import DetailTransfert from "../../screen/client/detailTransfert";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerTitleAlign: "center" }}
    >
      <Stack.Screen name="Accueil" component={Accueil} />
      <Stack.Screen name="Agent" component={Agent} />
      <Stack.Screen
        options={{ headerShown: true, headerTitleAlign: "center" }}
        name="Achat de Vignette"
        component={Buy}
      />
      <Stack.Screen name="Guichet" component={Guichet} />
      <Stack.Screen name="PuisFiscale" component={PuisFiscale} />
      <Stack.Screen name="Vignette" component={Vignette} />
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Transfert" component={Transfert} />
      <Stack.Screen
        options={{ headerShown: false, headerTitleAlign: "center" }}
        name="Detail"
        component={DetailTransfert}
      />
    </Stack.Navigator>
  );
};

export default Index;
