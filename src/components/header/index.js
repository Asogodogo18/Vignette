import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import * as Animatable from "react-native-animatable";

const { height, width } = Dimensions.get("screen");

const Header = ({ setVisible }) => {
  return (
    <View style={stytles.contain}>
      <Animatable.Image
        animation="fadeIn"
        duration={300}
        delay={500}
        source={require("../../../assets/logo.png")}
        style={stytles.img}
      />
      <Animatable.Text
        animation="fadeIn"
        duration={300}
        delay={500}
        style={stytles.txt}
      >
        Accueil
      </Animatable.Text>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          elevation: 10,
          shadowColor: "white",
        }}
      >
        <LinearGradient
          colors={["#1a1818", "#FFFF"]}
          start={{ x: 0.1, y: 0.0 }}
          end={{ x: 2.0, y: 0.0 }}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons name="account" size={30} color="white" />
        </LinearGradient>
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
    paddingHorizontal: 8,
  },
  img: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    marginTop: 5,
  },
  txt: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginRight: 20,
  },
});
export default Header;
