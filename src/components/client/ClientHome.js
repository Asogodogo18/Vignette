import { ScrollView, Text } from "react-native";
import React, { useState } from "react";

import QuickSelect from "../shared/QuickSelect";
import Fees from "../shared/Fees";
import VignetteList from "../shared/VignetteList";
import { View } from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

const ClientHome = ({ navigation }) => {
  const [openListing, setOpenListing] = useState(false);

  if (openListing) {
    return (
      <View
        animation="fadeInRight"
        duration={300}
        delay={100}
        style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 8 }}
      >
        <Ionicons
          onPress={() => setOpenListing(false)}
          name="chevron-back-circle-outline"
          size={34}
          color="black"
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            letterSpacing: 1.2,
            margin: 5,
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
        paddingBottom: 40,
      }}
    >
      <VignetteList />
      <QuickSelect navigation={navigation} setOpenListing={setOpenListing} />
      <Fees navigation={navigation} />
    </ScrollView>
  );
};

export default ClientHome;
