import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
const { width, height } = Dimensions.get("screen");

import * as Animatable from "react-native-animatable";
const Splach = ({ navigation }) => {
  return (
    <Animatable.View
      duration={300}
      delay={500}
      animation="fadeIn"
      style={styles.contain}
    >
      <View style={styles.header}>
        <Text style={styles.txtHeader}>Connecte vous avec une compte</Text>
      </View>
      <Animatable.View
        animation="fadeIn"
        duration={300}
        delay={500}
        style={{ flexDirection: "row", marginVertical: 50 }}
      >
        <TouchableOpacity
          style={styles.touch}
          // onPress={() => {
          //   Navigation.navigate("Course");
          // }}
        >
          <Image
            style={{
              width: "80%",
              height: "80%",
              resizeMode: "cover",
              overflow: "hidden",
              alignSelf: "center",
            }}
            source={require("../../../../assets/icon/1.png")}
          />
          <Text style={styles.title}>Agent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touch}
          // onPress={() => {
          //   Navigation.navigate("Course");
          // }}
        >
          <Image
            style={{
              width: "75%",
              height: "75%",
              resizeMode: "cover",
              overflow: "hidden",
              alignSelf: "center",
            }}
            source={require("../../../../assets/icon/1.png")}
          />
          <Text style={styles.title}>Client</Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        animation="fadeIn"
        duration={300}
        delay={500}
        style={{ flexDirection: "row" }}
      >
        <TouchableOpacity
          style={styles.touch}
          // onPress={() => {
          //   Navigation.navigate("Course");
          // }}
        >
          <Image
            style={{
              width: "80%",
              height: "80%",
              resizeMode: "cover",
              overflow: "hidden",
              alignSelf: "center",
            }}
            source={require("../../../../assets/icon/1.png")}
          />
          <Text style={styles.title}>Police</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => {
            navigation.navigate("Adminstack", { screen: "Accueil" });
          }}
        >
          <Image
            style={{
              width: "80%",
              height: "80%",
              resizeMode: "cover",
              overflow: "hidden",
              alignSelf: "center",
            }}
            source={require("../../../../assets/icon/1.png")}
          />
          <Text style={styles.title}>Administrateur</Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        animation="fadeIn"
        duration={300}
        delay={500}
        style={{
          position: "absolute",
          bottom: 0,
          // backgroundColor: "#1a1818",
          height: 50,
          width: width - 20,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "gray",
            textTransform: "uppercase",
            textShadowColor: "black",
          }}
        >
          Créer par CIRTIC
        </Text>
      </Animatable.View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  header: {
    height: 70,
    width: width,
    backgroundColor: "#1a1818",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  txtHeader: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  touch: {
    width: 160,
    height: 180,
    backgroundColor: "white",
    borderRadius: 10,

    elevation: 5,

    margin: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "gray",
    textAlign: "center",
  },
});
export default Splach;
