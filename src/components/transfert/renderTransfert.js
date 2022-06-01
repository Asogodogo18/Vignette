import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import {} from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
const { height, width } = Dimensions.get("screen");

const renderTransfert = ({ item, navigation }) => {
  return (
    <View style={styles.contain}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { item })}
        activeOpacity={0.8}
        style={[styles.Card]}
      >
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
        <Animatable.View
          duration={300}
          delay={300}
          animation="bounceInLeft"
          style={styles.vignette}
        >
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
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
};

export default renderTransfert;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },

  //
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
    maxHeight: 350,
    minHeight: 170,
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
