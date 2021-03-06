import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useAuthState } from "../../../global";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { BlurView } from "expo-blur";
import Toast from "react-native-toast-message";

import { deleteVignette, getVignetteByChassis } from "../../../services/query";
const AnimatedImg = Animatable.createAnimatableComponent(ImageBackground);

const Vignette = ({ item, handlePress, navigation }) => {
  const { user } = useAuthState();
  const [isVisible, setIsVisible] = useState(false);
  // console.log("item :", item);

  const handleDelete = (id) => {
    deleteVignette(id)
      .then((res) => {
        if (res.data == "true") {
          Toast.show({
            type: "success",
            text1: "Supprime avec success!",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, \nVeuillez ressayer!",
          });
        }
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue, Veuillez ressayer!",
          text2: e.toString(),
        });
      });
  };

  const redirectToBuyScreen = () => {
    navigation.navigate("Payment", {
      item,
      id_user: user.id_user,
    });
  };

  return (
    <AnimatedImg
      resizeMode="cover"
      source={require("../../../../assets/bg.png")}
      animation="fadeInRight"
      style={styles.vignette}
      duration={1000}
      delay={parseInt(item.id) * 500}
    >
      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        style={{ flex: 1 }}
      >
        <Text
          style={{
            marginLeft: 15,
            fontSize: 20,
            fontWeight: "200",
            color: "white",
            textTransform: "capitalize",
            textAlign: "center",

            zIndex: 100,
          }}
        >
          {item.prenom}
          {"    "}
          <Text
            style={{
              fontSize: 20,
              color: "white",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            {item.nom}
            {"    "}
          </Text>
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
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
              {"    "}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "200",
                color: "white",
                textTransform: "capitalize",
                marginLeft: 40,
              }}
            >
              utilisation
            </Text>
            <Text
              style={{
                marginLeft: 50,
                fontSize: 15,
                color: "white",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.utilisation}
              {"    "}
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
              {"    "}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "200",
                color: "white",
                textTransform: "capitalize",
                marginLeft: 40,
              }}
            >
              Montant
            </Text>
            <Text
              style={{
                marginLeft: 50,
                fontSize: 15,
                color: "white",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.montant}
              {"    "}
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 15,
            color: "white",
            textTransform: "uppercase",
            fontWeight: "bold",
            zIndex: 100,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "200",
              color: "white",
              textTransform: "capitalize",
              marginTop: 20,
              zIndex: 100,
            }}
          >
            No Chassis :
          </Text>
          {"  "}
          {item.num_chassis}
        </Text>

        {!item.statut ? (
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
              minHeight: 250,
              maxHeight: 380,

              width: 350,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "white",
                textAlign: "center",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              En cours de Traitement
            </Text>
          </BlurView>
        ) : null}
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
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {item.statut ? (
                <TouchableOpacity
                  onPress={() => handlePress("Modify", item)}
                  style={styles.btnBlur}
                >
                  <FontAwesome name="edit" size={30} color="white" />
                </TouchableOpacity>
              ) : null}
              {!item.statut ? (
                <TouchableOpacity
                  onPress={redirectToBuyScreen}
                  style={styles.btnBlur}
                >
                  <MaterialIcons name="payment" size={30} color="white" />
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                onPress={() => handleDelete(item.id_engin)}
                style={styles.btnBlur}
              >
                <MaterialCommunityIcons name="delete" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </BlurView>
        ) : null}
      </TouchableOpacity>
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
    minWidth: 350,
    maxWidth: 450,
    borderRadius: 5,
    overflow: "hidden",
    minHeight: 120,
    maxHeight: 200,
    flex: 1,
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
