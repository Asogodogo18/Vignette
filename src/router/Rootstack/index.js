import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Authstack from "../Auth";
import Appstack from "../Appstack";
import Adminstack from "../AdminStack";
const RootStack = createNativeStackNavigator();

import { useAuthState } from "../../global";

const Index = () => {
  const { user, isSignedIn } = useAuthState();
  return (
    <RootStack.Navigator initialRouteName="Authstack">
      {isSignedIn ? (
        user.role === "Administrateur" ? (
          <RootStack.Screen
            name="Adminstack"
            component={Adminstack}
            options={{ headerShown: false }}
          />
        ) : (
          <RootStack.Screen
            name="Appstack"
            component={Appstack}
            options={{ headerShown: false }}
          />
        )
      ) : (
        <RootStack.Screen
          name="Authstack"
          component={Authstack}
          options={{ headerShown: false }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default Index;
