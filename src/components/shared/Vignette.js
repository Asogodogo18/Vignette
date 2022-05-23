import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

import * as Animatable from "react-native-animatable";
import { BlurView } from "expo-blur";
const AnimatedImg = Animatable.createAnimatableComponent(ImageBackground);

const Vignette = ({ item, modify = false }) => {
  return (
    <AnimatedImg
      resizeMode="cover"
      source={require("../../../assets/bg.png")}
      animation="fadeInRight"
      style={styles.vignette}
      // onPress={() => setVignette(item)}
      duration={1000}
      delay={parseInt(item.id) * 500}
    >
      <Text
        style={{
          marginLeft: 15,
          fontSize: 20,
          fontWeight: "200",
          color: "white",
          textTransform: "capitalize",
        }}
      >
        {" "}
        {item.prenom}{" "}
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            color: "white",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          {" "}
          {item.nom}{" "}
        </Text>
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "200",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            Marque
          </Text>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 15,
              color: "white",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {item.marque}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "200",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            utilisation
          </Text>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 15,
              color: "white",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {item.utilisation}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "200",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            Type
          </Text>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 15,
              color: "white",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {item.type}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "200",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            Montant
          </Text>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 15,
              color: "white",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {item.montant} FCFA
          </Text>
        </View>
      </View>
      <Text
        style={{
          marginTop: 5,
          textAlign: "center",
          fontSize: 15,
          color: "white",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "200",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          No Chassis
        </Text>{" "}
        {item.num_chassis}
      </Text>
      {!modify && !item.statut ? (
        <BlurView
          intensity={70}
          tint="dark"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
            maxHeight: 380,
            minWidth: 300,
            maxWidth: 450,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "white",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            En cours de Traitement
          </Text>
        </BlurView>
      ) : null}
    </AnimatedImg>
  );
};

export default Vignette;

const styles = StyleSheet.create({
  vignette: {
    // height: 180,
    backgroundColor: "white",
    marginHorizontal: 8,
    marginVertical: 5,
    padding: 15,
    elevation: 10,
    width: 300,
    borderRadius: 5,
    overflow: "hidden",
    minHeight: 180,
    maxHeight: 380,
  },
});
