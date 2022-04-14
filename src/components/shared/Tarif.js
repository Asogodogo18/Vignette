import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Tarif = ({ item }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <View style={styles.iconBox}>
        <Image
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
          source={require("../../../assets/icon/scooter.png")}
        />
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.pricetag}>{item.montant}</Text>
    </TouchableOpacity>
  );
};

export default Tarif;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#52b788",
    minHeight: 120,
    maxHeight: 320,
    minWidth: 250,
    maxWidth: 350,
    elevation: 5,
    shadowColor: "#000",
    margin: 5,
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
