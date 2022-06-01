import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { Ionicons, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("screen");
const DetailTransfert = ({ route, navigation }) => {
  const { item } = route.params;
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
        <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
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
                Numero carte d'identite
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
                {item.numero}
              </Text>
            </View>
          </View>
        </View>
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
    maxHeight: 150,
    minHeight: 100,
    width: width - 15,
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 8,
  },
});
