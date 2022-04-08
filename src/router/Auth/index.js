import { View, Text } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Connexion from "../../screen/login/Connexion";
import Inscription from "../../screen/login/Inscription";
import PassOublier from "../../screen/login/PassOublier";
import Splash from "../../screen/login/Splach";
import Ecran from "../../screen/login/Splach/splach";
const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="Ecran" component={Ecran} />
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="PassOublier" component={PassOublier} />
      </Stack.Navigator>
    )
  );
}
