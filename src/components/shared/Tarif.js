import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Tarif = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Achat de Vignette", { puissance: item })}
      style={styles.container}
    >
      <View style={styles.iconBox}>
        <Image
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
          source={require("../../../assets/icon/scooter.png")}
        />
      </View>
      <Text style={styles.description}>{item.puissance}</Text>
      <Text style={styles.pricetag}>{item.montant} FCFA</Text>
    </TouchableOpacity>
  );
};

export default Tarif;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    width: 250,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#52b788",
  },
  iconBox: {
    position: "absolute",
    top: 5,
    right: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 50,
    overflow: "hidden",
    elevation: 5,
  },
  description: {
    color: "white",
    fontSize: 14,
    letterSpacing: 1.2,
    width: 160,
    left: 13,
  },
  pricetag: {
    fontWeight: "bold",
    fontSize: 18,
    position: "absolute",
    bottom: 5,
    alignSelf: "center",
  },
});
