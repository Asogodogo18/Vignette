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
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import Tableau from "../../../components/admin/tableau";
import Action from "../../../components/admin/Action";

const { width, height } = Dimensions.get("screen");

const Index = ({ navigation }) => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <StatusBar barStyle="light-content" backgroundColor="red" currentHeight />
      <View
        style={{
          position: "absolute",
          zIndex: 5,
          top: 0,
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
            source={require("../../../../assets/icon/logobko1.png")}
            style={styles.img}
          />
          <Text style={styles.txtHeader}>Vignette Mali</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profil")}
            style={{
              height: 50,
              width: 50,
              borderRadius: 45,
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
                borderRadius: 40,
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
            // margin: 5,
            padding: 5,
            color: "gray",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Tableau de Bord
        </Text>
        <View style={{ alignItems: "center", padding: 10 }}>
          <Tableau />
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginHorizontal: 20,
            margin: 5,
            padding: 5,
            color: "gray",
          }}
        >
          Action Rapide
        </Text>
        <View style={styles.section}>
          <Action navigation={navigation} />
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
          height: 15,
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
            fontSize: 10,
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
    alignSelf: "center",
  },
  header: {
    backgroundColor: "#1a1818",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 80,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  img: {
    height: 70,
    width: 70,
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
  txtHeader: {
    color: "gray",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    marginRight: 10,
  },
});
