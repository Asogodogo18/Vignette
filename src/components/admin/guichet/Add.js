import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import * as Animatable from "react-native-animatable";
import { addGuichet } from "../../../services/query";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useQueryClient } from "react-query";
const { width, height } = Dimensions.get("screen");

const Add = ({ setCurrentLoader, currentLoader, item }) => {
  const queryClient = useQueryClient();
  const [numero, setNumero] = useState("");
  const handleAdd = () => {
    addGuichet(numero)
      .then((res) => {
        if (res.data == "true") {
          Toast.show({
            type: "success",
            text1: "Guichet cree avec success!",
          });
          queryClient.invalidateQueries("guichets");
          setCurrentLoader(null);
        } else {
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, \nVeuillez ressayer!",
          });
        }
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue, Veuillez ressayer!",
          text2: e.toString(),
        });
      });
  };

  return (
    <KeyboardAvoidingView>
      <Animatable.View animation="fadeIn">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
              {currentLoader == "Ajouter" ? "Ajout du Guichet" : null}
            </Text>
            <TouchableOpacity onPress={() => setCurrentLoader(null)}>
              <Entypo name="cross" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ padding: 5, margin: 10 }}>
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Veuillez Ajouter un Guichet
            </Text>
          </View>
          <View style={styles.container}>
            <ImageBackground
              source={require("../../../../assets/icon/bg-buy.png")}
              resizeMode="cover"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: height - 200,
              }}
            >
              <BlurView intensity={20} style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setNumero(text)}
                  value={numero}
                  placeholder="N° du Guichet"
                />

                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    onPress={() => setCurrentLoader(null)}
                    style={[styles.button, { backgroundColor: "black" }]}
                  >
                    <Text style={styles.btnLabel}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleAdd}
                    style={[styles.button, { backgroundColor: "green" }]}
                  >
                    <Text style={styles.btnLabel}>Ajouter</Text>
                  </TouchableOpacity>
                </View>
              </BlurView>
            </ImageBackground>
          </View>
        </ScrollView>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

export default Add;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  touch: {
    height: 50,
    width: 110,
    maxWidth: 120,
    backgroundColor: "#99D98c",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: "row",
  },
  touchAchat: {
    height: 50,
    width: width - 100,
    backgroundColor: "#99D98c",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  touchTxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  vignette: {
    width: width - 90,
    padding: 10,

    marginBottom: 10,
  },
  section: {
    flex: 1,
  },
  Card: {
    margin: 5,
    padding: 5,
    height: 90,
    width: width - 19,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
  },
  btnBlur: {
    // flex: 2,
    height: 55,
    width: 55,
    backgroundColor: "#99D98c",
    borderRadius: 40,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  delete: {
    // flex: 2,
    height: 35,
    width: 35,
    backgroundColor: "red",
    borderRadius: 20,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 20,
  },
  CardDelete: {
    margin: 5,
    padding: 5,
    height: 90,
    width: width - 50,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
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

    width: 250,
  },
  buttonGroup: {
    flexDirection: "row",
    height: 60,
    marginTop: 40,
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
