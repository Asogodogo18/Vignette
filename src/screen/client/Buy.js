import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";

const Buy = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [marque, setMarque] = useState("");
  const [type, setType] = useState("");
  const [noChassi, setNoChassi] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../../../assets/icon/bg-buy.png")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <BlurView intensity={20} style={styles.inputBox}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Nom"
          />
          <TextInput
            style={styles.input}
            onChangeText={setSurname}
            value={surname}
            placeholder="Prenom"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPhone}
            value={phone}
            placeholder="Numero de Telephone"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setMarque}
            value={marque}
            placeholder="Marque"
          />
          <TextInput
            style={styles.input}
            onChangeText={setType}
            value={type}
            placeholder="type"
          />
          <TextInput
            style={styles.input}
            onChangeText={setNoChassi}
            value={noChassi}
            placeholder="Numero de Chassis "
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.button, { backgroundColor: "black" }]}
            >
              <Text style={styles.btnLabel}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
            >
              <Text style={styles.btnLabel}>Acheter</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ImageBackground>
    </ScrollView>
  );
};

export default Buy;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  inputBox: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontWeight: "bold",

    width:200
  },
  buttonGroup: {
    flexDirection: "row",
    height: 60,
    marginTop:40
  },
  button: {
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  btnLabel: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 14,
  },
});
