import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const Index = () => {
  return (
    <View style={styles.contain}>
      <StatusBar hidden />
      <View style={styles.header}>
        <Animatable.Image
          animation="fadeIn"
          duration={300}
          delay={500}
          source={require("../../../../assets/logo.png")}
          style={styles.img}
        />

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            height: 70,
            width: 70,
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
              height: 70,
              width: 70,
              borderRadius: 40,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="account" size={40} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  header: {
    // flex: 1,
    backgroundColor: "#1a1818",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 90,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  img: {
    height: 150,
    width: 200,
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
