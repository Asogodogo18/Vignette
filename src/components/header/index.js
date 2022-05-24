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

const Header = ({ navigation }) => {
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 5,
        top: 0,
        left: 0,
        right: 0,
        width: width,
      }}
    >
      <View style={styles.header}>
        <Animatable.Image
          animation="fadeIn"
          duration={300}
          delay={500}
          source={require("../../../assets/icon/logobko1.png")}
          style={styles.img}
        />
        <Text style={styles.txtHeader}>Vignette Mali</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profil")}
          style={{
            height: 50,
            width: 50,
            borderRadius: 40,
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
              height: 50,
              width: 50,
              borderRadius: 30,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              elevation: 5,
              shadowColor: "white",
            }}
          >
            <MaterialCommunityIcons name="account" size={40} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  header: {
    backgroundColor: "#1a1818",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 80,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  img: {
    height: 70,
    width: 70,
    resizeMode: "contain",
    marginTop: 5,
  },
  txt: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginRight: 20,
  },
  txtHeader: {
    color: "gray",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
});
export default Header;
