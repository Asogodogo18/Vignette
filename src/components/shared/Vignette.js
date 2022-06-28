import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import * as Animatable from "react-native-animatable";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuthState } from "../../global";
const AnimatedImg = Animatable.createAnimatableComponent(ImageBackground);

const Vignette = ({ item, modify = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, isSignedIn } = useAuthState();
  const isAgent = user.role === "Agent";

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setIsVisible(!isVisible)}
    >
      <AnimatedImg
        resizeMode="cover"
        source={require("../../../assets/bg.png")}
        animation="fadeInRight"
        style={styles.vignette}
        // onPress={() => setVignette(item)}
        duration={1000}
        delay={parseInt(item.id) * 500}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text
            style={{
              // marginLeft: 15,
              fontSize: 20,
              fontWeight: "200",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            {" "}
            {item.prenom}{" "}
          </Text>
          <Text
            style={{
              // marginLeft: 10,
              fontSize: 20,
              color: "white",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            {" "}
            {item.nom}{" "}
          </Text>
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
        {isVisible ? (
          <BlurView
            intensity={150}
            tint="dark"
            style={{
              position: "absolute",
              top: -15,
              left: -15,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              width: 350,
              minHeight: 250,
              maxHeight: 380,
            }}
          >
            <View
              style={
                {
                  // flexDirection: "row",
                  // justifyContent: "space-around",
                }
              }
            >
              {isAgent && (
                <TouchableOpacity
                  onPress={() => {
                    if (isAgent) {
                      navigation.navigate("Modify", { item });
                    } else handlePress("Modify", item);
                  }}
                  style={styles.btnBlur}
                >
                  <FontAwesome name="edit" size={30} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </BlurView>
        ) : null}
        {!item.statut === "vignette valide" ? (
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
    </TouchableOpacity>
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
  btnBlur: {
    // flex: 2,
    height: 55,
    width: 55,
    backgroundColor: "#99D98c",
    borderRadius: 40,
    marginTop: -20,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
});
