import { View, Text } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Connexion from "../../screen/login/Connexion";
import Inscription from "../../screen/login/Inscription";
import PassOublier from "../../screen/login/PassOublier";
import Splash from "../../screen/login/Splach";
import Accueil from "../../screen/accueil";
import Scan from "../../screen/scan";
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Accueil"
      screenOptions={{ headerShown: false, headerTitleAlign: "center" }}
    >
      <Stack.Screen name="index" component={Accueil} />
      <Stack.Screen name="Scan" component={Scan} />
    </Stack.Navigator>
  );
};

export default function Index() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(async () => {
    const appData = await AsyncStorage.getItem("isAppFirstLaunched");
    if (appData == null) {
      setIsAppFirstLaunched(false);
      AsyncStorage.setItem("isAppFirstLaunched", "false");
    } else {
      setIsAppFirstLaunched(true);
    }

    // AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);
  return (
    isAppFirstLaunched != null && (
      <Stack.Navigator
        initialRouteName="AppStack"
        screenOptions={{ headerShown: false, headerTitleAlign: "center" }}
      >
        {isAppFirstLaunched && (
          <Stack.Screen name="Splash" component={Splash} />
        )}

        <Stack.Screen name="Accueil" component={AppStack} />
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="PassOublier" component={PassOublier} />
      </Stack.Navigator>
    )
  );
}
