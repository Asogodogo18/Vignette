import { View, Text } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Accueil from "../../screen/accueil";
import Scan from "../../screen/scan";
import Buy from "../../screen/client/Buy";
import Manage from "../../screen/client/Manage";
import Profil from "../../screen/admin/profil";
import AdminStack from "../AdminStack";
import Transfer from "../../screen/transfert";
import DetailTransfert from "../../screen/client/detailTransfert";
import InitTransfert from "../../screen/client/initTransfert";
import Payment from "../../screen/Payment";
import Inscription from "../../screen/login/Inscription";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator
      initialRouteName="Accueil"
      screenOptions={{ headerShown: false, headerTitleAlign: "center" }}
    >
      <Stack.Screen name="Accueil" component={Accueil} />
      <Stack.Screen name="Scan" component={Scan} />
      <Stack.Screen
        options={{ headerShown: true, headerTitleAlign: "center" }}
        name="Achat de Vignette"
        component={Buy}
      />
      <Stack.Screen
        options={{ headerShown: false, headerTitleAlign: "center" }}
        name="Transfer"
        component={Transfer}
      />
      <Stack.Screen
        options={{ headerShown: false, headerTitleAlign: "center" }}
        name="Detail"
        component={DetailTransfert}
      />
      <Stack.Screen
        options={{ headerShown: false, headerTitleAlign: "center" }}
        name="Initialisaton"
        component={InitTransfert}
      />
      <Stack.Screen
        options={{ headerShown: true, headerTitleAlign: "center" }}
        name="Gestion des Vignettes"
        component={Manage}
      />
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="AdminStack" component={AdminStack} />
      <Stack.Screen name="Inscription" component={Inscription} />
    </Stack.Navigator>
  );
};

export default Index;
