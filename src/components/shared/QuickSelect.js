import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const QuickSelect = ({ navigation }) => {
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
          onPress={() => navigation.push("Achat de Vignette")}
          style={styles.quickselect}
        >
          <FontAwesome5 name="address-card" size={24} color="black" />
          <Text style={styles.label}>Acheter une Vignette</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("Gestion des Vignettes")}
          style={styles.quickselect}
        >
          <AntDesign name="eyeo" size={24} color="black" />
          <Text style={styles.label}>Voir Toutes Mes Vignettes</Text>
        </TouchableOpacity>
      </View>
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
