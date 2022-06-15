import { View, Text } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "../../screen/login/Connexion/Login";
import SignUp from "../../screen/login/Inscription/SignUp";
import PassOublier from "../../screen/login/PassOublier";
import Splash from "../../screen/login/Splach";
import Ecran from "../../screen/login/Splach/splach";
const Stack = createNativeStackNavigator();

export default function Index() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(() => {
    async function loadState() {
      const appData = await AsyncStorage.getItem("isAppFirstLaunched");
      if (appData == null) {
        setIsAppFirstLaunched(false);
        AsyncStorage.setItem("isAppFirstLaunched", "false");
      } else {
        setIsAppFirstLaunched(true);
      }
    }
    loadState();

    // AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);
  return (
    isAppFirstLaunched != null && (
      <Stack.Navigator
        initialRouteName="Ecran"
        screenOptions={{ headerShown: false, headerTitleAlign: "center" }}
      >
        {isAppFirstLaunched && (
          <Stack.Screen name="Splash" component={Splash} />
        )}

        <Stack.Screen name="Ecran" component={Ecran} />
        <Stack.Screen name="Connexion" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="PassOublier" component={PassOublier} />
      </Stack.Navigator>
    )
  );
}
