import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import { useAuthState } from "../../global";
import { useTransferts } from "../../services/query";

const QuickSelect = ({ navigation, setOpenListing }) => {
  const { user } = useAuthState();

  const conditionPerte = user.role == "Agent" || user.role == "Anonyme";

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
        {user.role != "Anonyme" && (
          <>
            {user.role !== "Agent" && (
              <TouchableOpacity
                onPress={() => navigation.navigate("Transfer")}
                style={styles.quickselect}
              >
                {/* <Badge size={24}>{transfert && transfert.data.lenght}</Badge> */}
                <MaterialCommunityIcons
                  name="transit-transfer"
                  size={30}
                  color="black"
                />
                <Text style={styles.label}>Mutation</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => navigation.push("Gestion des Vignettes")}
              style={styles.quickselect}
            >
              <AntDesign name="eyeo" size={24} color="black" />
              <Text style={styles.label}>Voir Toutes Mes Vignettes</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={{ flexDirection: "row" }}>
        {!conditionPerte ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.push("VignetteRetrouve")}
              style={styles.quickselect}
            >
              <MaterialCommunityIcons
                name="file-find"
                size={27}
                color="black"
              />
              <Text style={styles.label}>Vignette Retrouve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.push("Perte")}
              style={styles.quickselect}
            >
              <MaterialCommunityIcons
                name="fridge-industrial-off"
                size={24}
                color="black"
              />
              <Text style={styles.label}>Declarer Vol ou Perte</Text>
            </TouchableOpacity>
          </>
        ) : null}
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
