import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
const { width, height } = Dimensions.get("screen");

import * as Animatable from "react-native-animatable";
const Splach = ({ navigation }) => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.contain}>
        <View style={styles.header}>
          <Image
            source={require("../../../../assets/icon/logobko.png")}
            style={{ height: 150, width: 150, marginTop: 5 }}
            resizeMode="center"
          />
          <Text style={styles.txtHeader}>Connectez vous avec une compte</Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            // marginTop: 10,
            alignItems: "center",
            padding: 20,
            marginBottom: 20,
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
                  navigation.navigate("Connexion", { role: "Superviseur" });
                }}
                style={styles.containerTxt}
              >
                <Text style={styles.title}>Superviseur</Text>
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
                source={require("../../../../assets/icon/superviseur.png")}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Connexion", { role: "Compta public" })
                }
                style={styles.containerTxt}
              >
                <Text style={styles.title}>Compta Public</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.touch}>
              <Image
                style={styles.img}
                source={require("../../../../assets/icon/maire.jpg")}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Connexion", { role: "Maire" });
                }}
                style={styles.containerTxt}
              >
                <Text style={styles.title}>Maire</Text>
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
                source={require("../../../../assets/icon/maire.png")}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Connexion", { role: "Maire adjoint" })
                }
                style={styles.containerTxt}
              >
                <Text style={styles.title}>Maire-Adjoint</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.touch}>
              <Image
                style={styles.img}
                source={require("../../../../assets/icon/verificateur.jpg")}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Connexion", { role: "Verificateur" })
                }
                style={styles.containerTxt}
              >
                <Text style={styles.title}>Verificateur</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Animatable.View
          animation="fadeIn"
          duration={300}
          delay={500}
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "#1a1818",
            height: 50,
            width: width,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            alignSelf: "center",
            borderTopLeftRadius: 70,
            borderTopRightRadius: 70,
            elevation: 5,
            // marginBottom: Platform.OS === "ios" ? 5 : 0,
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "red",
  },

  txtHeader: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },

  touch: {
    width: 165,
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,

    margin: 5,
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "gray",
    textAlign: "center",
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
  header: {
    height: 200,
    width: width,
    backgroundColor: "#1a1818",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
export default Splach;
