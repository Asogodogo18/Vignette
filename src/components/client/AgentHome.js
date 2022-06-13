import { ScrollView, Text, Dimensions } from "react-native";
import React, { useState } from "react";

import QuickSelect from "../shared/QuickSelect";
import Fees from "../shared/Fees";
import SearchBar from "../shared/SearchBar";
import { View } from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

import VignetteList from "../shared/VignetteList";
const { height, width } = Dimensions.get("screen");
const AgentHome = ({ navigation, item }) => {
  const [openListing, setOpenListing] = useState(false);

  if (openListing) {
    return (
      <ScrollView>
        <View
          animation="fadeInRight"
          duration={300}
          delay={100}
          style={{
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 8,
            marginTop: 70,
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
              fontSize: 25,
              fontWeight: "bold",
              letterSpacing: 1.2,
              margin: 5,
              marginBottom: 30,
            }}
          >
            Veuillez Choisir Une option:
          </Text>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Fees setOpenListing={setOpenListing} navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 35,
      }}
    >
      <View style={{}}>
        <SearchBar navigation={navigation} />
        <VignetteList />
        <QuickSelect navigation={navigation} setOpenListing={setOpenListing} />

        <Fees navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default AgentHome;
