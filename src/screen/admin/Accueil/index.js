import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("screen");
const Index = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View
        style={{
          position: "absolute",
          zIndex: 5,
          top: Platform.OS == "ios" ? 30 : -5,
          left: 0,
          right: 0,
          width: width,
        }}
      >
        <View style={styles.header}>
          <Animatable.Image
            animation="fadeIn"
            duration={300}
            delay={500}
            source={require("../../../../assets/logo.png")}
            style={styles.img}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("Profil")}
            style={{
              height: 50,
              width: 50,
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
                height: 50,
                width: 50,
                borderRadius: Platform.OS == "ios" ? 20 : 40,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                elevation: 5,
                shadowColor: "white",
              }}
            >
              <MaterialCommunityIcons name="account" size={40} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contain}
      >
        <StatusBar hidden />

        <Text
          style={{
            marginTop: 80,
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            margin: 5,
            padding: 5,
            color: "black",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Tableau de Board{" "}
        </Text>
        <View style={{ alignItems: "center", padding: 10 }}>
          <Animatable.View
            animation="fadeIn"
            duration={300}
            delay={500}
            style={{
              flexDirection: "row",
              marginVertical: -10,
              alignSelf: "center",
              padding: 5,
            }}
          >
            <View style={styles.touch}>
              <View style={styles.containerTxt}>
                <Text style={styles.title}>VIGNETTE EN CIRCULATION</Text>
              </View>
              <View style={styles.fond}>
                <Text style={styles.containerTitle}>15</Text>
              </View>
            </View>
            <View style={styles.touch}>
              <View style={styles.containerTxt}>
                <Text style={styles.title}>VIGNETTE AUJOURD'HUI</Text>
              </View>
              <View style={styles.fond}>
                <Text style={styles.containerTitle}>15</Text>
              </View>
            </View>
          </Animatable.View>
          <Animatable.View
            animation="fadeIn"
            duration={300}
            delay={500}
            style={{ flexDirection: "row" }}
          >
            <View style={styles.touch}>
              <View style={styles.containerTxt}>
                <Text style={styles.title}>CHIFFRE D'AFFAIRE AUJOURD'HUI</Text>
              </View>
              <View style={styles.fond}>
                <Text style={styles.containerTitle}>1500 cfa</Text>
              </View>
            </View>
            <View style={styles.touch}>
              <View style={styles.containerTxt}>
                <Text style={styles.title}>VIGNETTE PAYÉE AUJOURD'HUI</Text>
              </View>
              <View style={styles.fond}>
                <Text style={styles.containerTitle}>15</Text>
              </View>
            </View>
          </Animatable.View>
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginHorizontal: 20,
            margin: 5,
            padding: 5,
            color: "black",
          }}
        >
          Action Rapide
        </Text>
        <View style={styles.section}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Vignette")}
            >
              <View style={styles.touchAction}>
                <View style={styles.coverIcon}>
                  <Image
                    source={require("../../../../assets/icon/vignette.png")}
                    style={{ height: 50, width: 50 }}
                    resizeMode="contain"
                  />
                </View>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  VIGNETTE
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Guichet")}
            >
              <View style={styles.touchAction}>
                <View style={styles.coverIcon}>
                  <Image
                    source={require("../../../../assets/icon/guichet.png")}
                    style={{ height: 45, width: 45 }}
                    resizeMode="contain"
                  />
                </View>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  GUICHET
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("PuisFiscale")}
            >
              <View style={styles.touchAction}>
                <View style={styles.coverIcon}>
                  <Image
                    source={require("../../../../assets/icon/puissance.png")}
                    style={{ height: 45, width: 45 }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={{ width: 100, fontWeight: "bold", fontSize: 17 }}>
                  PUISSANCE FISCALE
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Agent")}
            >
              <View style={styles.touchAction}>
                <View style={styles.coverIcon}>
                  <Image
                    source={require("../../../../assets/icon/agent3.png")}
                    style={{ height: 45, width: 45 }}
                    resizeMode="contain"
                  />
                </View>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  AGENT
                </Text>
              </View>
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
          backgroundColor: "white",
          height: 40,
          width: width,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          alignSelf: "center",
          borderTopLeftRadius: 70,
          borderTopRightRadius: 70,
          elevation: 5,
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
          }}
        >
          Créer par CIRTIC
        </Text>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  contain: {
    flexGrow: 1,
    paddingBottom: 40,
    // backgroundColor: "#34A0A4",
    // backgroundColor: "#1a1818",
  },
  section: {
    // padding: 2,
    alignSelf: "center",
  },
  header: {
    // flex: 1,
    backgroundColor: "#1a1818",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 70,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  img: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    marginTop: 5,
  },
  txt: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginRight: 20,
  },
  touch: {
    width: 160,
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: "200",
    color: "black",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  containerTxt: {
    marginTop: 5,
    // backgroundColor: "#1a1818",
    minWidth: 150,
    maxWidth: 250,
    height: 45,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  containerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "white",
  },
  fond: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#99D98c",
    height: 50,
    maxWidth: 210,
    minWidth: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  touchAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: 95,
    maxWidth: 270,
    minWidth: 170,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 15,
  },
  coverIcon: {
    height: 60,
    width: 60,
    backgroundColor: "#99D98c",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    padding: 15,
  },
});
