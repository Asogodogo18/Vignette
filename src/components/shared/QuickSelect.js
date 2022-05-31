import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Badge } from "react-native-paper";

const QuickSelect = ({ navigation, setOpenListing }) => {
  return (
    <View>
      <Text
        style={{
          marginLeft: 15,
          margin: 5,
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
          textTransform: "capitalize",
        }}
      >
        Actions Rapides
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Transfer")}
          style={styles.quickselect}
        >
          <Badge size={24}>3</Badge>
          <MaterialCommunityIcons
            name="transit-transfer"
            size={30}
            color="black"
          />
          <Text style={styles.label}>Effectuer une Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("Gestion des Vignettes")}
          style={styles.quickselect}
        >
          <AntDesign name="eyeo" size={24} color="black" />
          <Text style={styles.label}>Voir Toutes Mes Vignettes</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setOpenListing(true)}
        style={styles.quickselect}
      >
        <FontAwesome5 name="address-card" size={24} color="black" />
        <Text style={styles.label}>Acheter une Vignette</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuickSelect;

const styles = StyleSheet.create({
  quickselect: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "beige",
    elevation: 5,
    borderRadius: 5,
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
