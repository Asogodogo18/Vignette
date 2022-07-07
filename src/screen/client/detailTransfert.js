import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { useAuthState } from "../../global";
import { valideTransferts, getVignetteByChassis } from "../../services/query";
import Toast from "react-native-toast-message";
const { height, width } = Dimensions.get("screen");
const isTablet = width > 360;
const DetailTransfert = ({ route, navigation }) => {
  const { user } = useAuthState();
  const condition = user.role === "Superviseur" || user.role == "Compta public";
  const { item } = route.params;
  console.log("item :", item);

  const handleValide = () => {
    const { id_transfert, nouveau, id_engin } = item;
    const data = {
      id_transfert,
      id_user: nouveau,
      id_engin,
    };
    valideTransferts(data)
      .then((res) => {
        console.log("validation", res);
        if (res.data === "true") {
          Toast.show({
            type: "success",
            text1: "Transfert Valide avec succes!",
          });
          setTimeout(() => {
            navigation.goBack();
          }, 1500);
        } else {
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, \nVeuillez ressayer!",
          });
        }
      })
      .catch((e) => {
        console.log("error", e);
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue, Veuillez ressayer!",
          text2: e.toString(),
        });
      });
  };
  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../../../assets/bg_transfert1.png")}
      style={styles.contain}
    >
      <View
        style={{
          height: 80,
          backgroundColor: "#1a1818",
          flexDirection: "row",
          elevation: 5,
          alignItems: "center",
          justifyContent: "space-around",
          // marginBottom: 15,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-undo" size={30} color="white" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "white",
            textAlign: "center",
            marginLeft: 10,
          }}
        >
          Transfert
        </Text>
        <Image
          source={require("../../../assets/icon/transfert.png")}
          style={{ height: 40, width: 40 }}
          resizeMode="cover"
        />
      </View>

      <View activeOpacity={0.8} style={[styles.Card]}>
        <Animatable.View
          duration={300}
          delay={300}
          animation="bounceInLeft"
          style={{
            // flex: 1,
            height: 50,
            width: 50,
            backgroundColor: "green",
            borderRadius: 70,
            marginTop: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/icon/transfert.png")}
            style={{
              height: 35,
              width: 35,
            }}
            resizeMode="contain"
          />
        </Animatable.View>
        <View style={styles.vignette}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "300",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Nom
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.nom}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "300",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Prénom
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.prenom}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "300",
                color: "black",
                textTransform: "capitalize",
                marginLeft: -30,
              }}
            >
              Telephone
            </Text>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 18,
                color: "black",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.telephone}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 0,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1, marginLeft: 20, marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "300",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Numero Chassi
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.num_chassis}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 0,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1, marginLeft: 20, marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "300",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                date du transfert
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.date_transfert}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, { backgroundColor: "black" }]}
        >
          <Text style={styles.btnLabel}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleValide}
          style={[styles.button, { backgroundColor: "green" }]}
        >
          <Text style={styles.btnLabel}>Valider</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default DetailTransfert;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  vignette: {
    marginVertical: 5,
    padding: 5,
    flex: 8,
  },
  //
  Card: {
    flex: 1,
    margin: 10,
    padding: 5,
    flexDirection: "row",
    maxHeight: 180,
    minHeight: 150,
    width: width - 20,
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 110,
  },
  CardT: {
    margin: 10,
    padding: 5,
    flexDirection: "row",
    maxHeight: 220,
    minHeight: 190,
    width: width - 20,
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: isTablet ? 240 : width - 210,
  },
  btnLabel: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: "row",
    height: 60,
    marginTop: 60,
    alignSelf: "center",
  },
  txt: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
    marginBottom: 5,
    marginLeft: 40,
  },
  text: {
    fontWeight: "900",
    fontSize: 18,
  },
});
