import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
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
        <ImageBackground
          source={require("../../../../assets/bg-2.png")}
          style={{
            height: 370,
            width: width,
            alignItems: "center",
            padding: 5,
          }}
          resizeMode="cover"
        >
          <Text style={styles.txtHeader}>Connectez vous avec une compte</Text>
        </ImageBackground>
      </View>
      <View
        style={{
          marginVertical: -160,
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
          }}
        >
          <View style={styles.touch}>
            <Image
              style={styles.img}
              source={require("../../../../assets/icon/agent3.png")}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Connexion", { role: "Agent" })
              }
              style={styles.containerTxt}
            >
              <Text style={styles.title}>Agent</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.touch}>
            <Image
              style={styles.img}
              source={require("../../../../assets/icon/client.png")}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Connexion", { role: "Client" })
              }
              style={styles.containerTxt}
            >
              <Text style={styles.title}>Client</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
          }}
        >
          <View style={styles.touch}>
            <Image
              style={styles.img}
              source={require("../../../../assets/icon/police.png")}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Connexion", { role: "Police" })
              }
              style={styles.containerTxt}
            >
              <Text style={styles.title}>Police</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.touch}>
            <Image
              style={styles.img}
              source={require("../../../../assets/icon/admin.png")}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Connexion", { role: "Administrateur" });
              }}
              style={styles.containerTxt}
            >
              <Text style={styles.title}>Administrateur</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Animatable.View
        animation="fadeIn"
        duration={300}
        delay={500}
        style={{
          position: "absolute",
          bottom: 0,
          // backgroundColor: "#1a1818",
          backgroundColor: "white",
          height: 50,
          width: width,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          alignSelf: "center",
          borderTopLeftRadius: 70,
          borderTopRightRadius: 70,
          elevation: 5,
          marginBottom: Platform.OS === "ios" ? 5 : 0,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "gray",
            textTransform: "uppercase",
            textShadowColor: "black",
            textAlign: "center",
            letterSpacing: 1,
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
    // backgroundColor: "#34A0A4",
  },

  txtHeader: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 65,
  },

  touch: {
    width: 160,
    height: 145,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    margin: 5,
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "gray",
    textAlign: "center",
    // backgroundColor: "#1a1818",
  },
  containerTxt: {
    position: "absolute",
    bottom: 8,
    backgroundColor: "#1a1818",
    width: 150,
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  img: {
    width: "50%",
    height: "50%",
    resizeMode: "cover",
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 15,
  },
});
export default Splach;
