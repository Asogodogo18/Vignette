import {
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import QuickSelect from "../shared/QuickSelect";
import Fees from "../shared/Fees";
import VignetteList from "../shared/VignetteList";
import { View } from "react-native-animatable";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthState } from "../../global";

const { width, height } = Dimensions.get("screen");
const ClientHome = ({ navigation }) => {
  const [openListing, setOpenListing] = useState(false);
  const { user } = useAuthState();

  if (openListing) {
    return (
      <View
        animation="fadeInRight"
        duration={300}
        delay={100}
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 8,
          // backgroundColor: "blue",
          // height: height,
          marginTop: 60,
        }}
      >
        <Ionicons
          onPress={() => setOpenListing(false)}
          name="chevron-back-circle-outline"
          size={34}
          color="black"
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            letterSpacing: 1.2,
            margin: 10,
            marginBottom: 30,
          }}
        >
          Veuillez Choisir Une option:
        </Text>
        <Fees navigation={navigation} />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 20,
        paddingBottom: 65,
        // height,
        marginTop: 57,
      }}
    >
      {user.role === "Client" && <VignetteList />}
      <QuickSelect navigation={navigation} setOpenListing={setOpenListing} />

      <Fees navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  quickselect: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "beige",
    elevation: 5,
    borderRadius: 15,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
});

export default ClientHome;
