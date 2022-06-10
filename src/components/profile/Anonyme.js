import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { logout, useAuthDispatch } from "../../global";

const { width, height } = Dimensions.get("screen");

const Anonyme = () => {
  const navigation = useNavigation();
  const dispatch = useAuthDispatch();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ height: height / 2.9, width }}
        resizeMode="contain"
        source={require("../../../assets/bg-profile.png")}
      />
      <Text style={styles.bodyText}>Vous n'avez pas de Compte </Text>
      <Text style={styles.bodyText}>Veuillez vous inscrire </Text>
      <TouchableOpacity
        onPress={() => navigation.replace("Inscription")}
        style={styles.btn}
      >
        <Text style={styles.btnText}>S'incrire</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => logout(dispatch)} style={styles.btn}>
        <Text style={styles.btnText}>se Connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyText: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "50%",
    height: 50,
    backgroundColor: "#7AD3BD",
    elevation: 5,
    marginBottom: 0,
    borderTopLeftRadius: 8,
  },
  btnText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
    letterSpacing: 1.3,
  },
});

export default Anonyme;
