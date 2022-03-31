import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

const Header = () => {
  return (
    <View style={stytles.contain}>
      <Image source={require("../../../assets/logo.png")} style={stytles.img} />
      <Text style={stytles.txt}>Accueil</Text>
      <TouchableOpacity>
        <Avatar.Icon size={40} icon="account" color="white" />
      </TouchableOpacity>
    </View>
  );
};

const stytles = StyleSheet.create({
  contain: {
    // flex: 1,
    backgroundColor: "#1a1818",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 70,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  img: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  txt: {
    fontSize: 18,
    color: "white",
    fontWeight: "800",
  },
});
export default Header;
