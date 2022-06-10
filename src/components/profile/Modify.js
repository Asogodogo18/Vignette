import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { useAuthState } from "../../global";
import { updateUser } from "../../services/query";
const { width, height } = Dimensions.get("screen");

function Modify({ setCurrentLoader }) {
  const { user, isSignedIn } = useAuthState();
  const [name, setName] = useState(user.nom || "");
  const [surname, setSurname] = useState(user.prenom || "");
  const [telephone, setTelephone] = useState(user.telephone || "");
  const [login, setLogin] = useState(user.login || "");
  const [adresse, setAdresse] = useState(user.adresse ? user.adresse : "");
  const [isChanged, setIsChanged] = useState(false);

  const handleSave = () => {
    updateUser({
      name,
      surname,
      adresse,
      tel: telephone,
      login,
      role: user.id_role,
      id: user.id_user,
    })
      .then((res) => {
        if (res.data == "true") {
          Toast.show({
            type: "success",
            text1: "Vos Modifiactions ont ete enregistre!",
          });
          setCurrentLoader(null);
        } else {
          Toast.show({
            type: "tomatoToast",
            text1: "Une erreur est survenue, Veuillez ressayer!",
          });
        }
      })
      .catch((e) =>
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue, Veuillez ressayer!",
          text2: e.toString(),
        })
      );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: 80,
          backgroundColor: "#1a1818",
          flexDirection: "row",
          elevation: 5,
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity onPress={() => setCurrentLoader(null)}>
          <Ionicons name="ios-arrow-undo" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
          Modifications
        </Text>
        <TouchableOpacity onPress={() => setCurrentLoader(null)}>
          <Entypo name="cross" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <Animatable.View animation="fadeIn">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ padding: 5, margin: 10 }}>
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Modification du compte Superviseur
            </Text>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              onChange={() => (isChanged ? null : setIsChanged(true))}
              style={styles.txt}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.label}>Prenom</Text>
            <TextInput
              onChange={() => (isChanged ? null : setIsChanged(true))}
              style={styles.txt}
              value={surname}
              onChangeText={setSurname}
            />
            <Text style={styles.label}>Telephone</Text>
            <TextInput
              onChange={() => (isChanged ? null : setIsChanged(true))}
              style={styles.txt}
              value={telephone}
              keyboardType="numeric"
              onChangeText={setTelephone}
            />
            <Text style={styles.label}>Login</Text>
            <TextInput
              onChange={() => (isChanged ? null : setIsChanged(true))}
              style={styles.txt}
              value={login}
              onChangeText={setLogin}
            />
            <Text style={styles.label}>Adresse</Text>
            <TextInput
              onChange={() => (isChanged ? null : setIsChanged(true))}
              style={styles.txt}
              value={adresse}
              onChangeText={setAdresse}
            />
          </View>
          <View
            style={{
              padding: 2,
              margin: 2,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              disabled={!isChanged}
              onPress={handleSave}
              style={isChanged && styles.touch}
            >
              <MaterialCommunityIcons
                name="file-document-edit-outline"
                size={24}
                color="white"
              />
              <Text style={styles.touchTxt}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingTop: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  touch: {
    height: 50,
    width: 150,
    maxWidth: 230,
    // backgroundColor: "#99D98c",
    backgroundColor: "#1a1818",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: "row",
    margin: 5,
  },

  touchTxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  txt: {
    color: "gray",
    fontSize: 15,
    fontWeight: "bold",
    maxWidth: 250,
    minWidth: 50,
    marginLeft: 20,
    marginBottom: 8,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },

  Card: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: "white",
    maxHeight: 250,
    minHeight: 90,
    width: width - 20,
    alignSelf: "center",
    elevation: 5,
    borderRadius: 15,
    // marginVertical: 50,
  },

  text: {
    textAlign: "center",
    textTransform: "uppercase",
    alignContent: "center",
    color: "white",
    fontSize: 15,
  },
  label: {
    flex: 1,
    flexDirection: "row",
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    width,
    // justifyContent:"space-between",
    // alignItems:"flex-end"
  },
});
export default Modify;
