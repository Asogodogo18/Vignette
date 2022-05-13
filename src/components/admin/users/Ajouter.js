import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  
} from "react-native";
import Toast from "react-native-toast-message";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import { Picker } from "@react-native-picker/picker";
import { addUser, useRoles } from "../../../services/query";
import { useQueryClient } from "react-query";
const { width, height } = Dimensions.get("screen");

const Ajouter = ({ setCurrentLoader, currentLoader, navigation }) => {
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useRoles();
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [adresse, setAdresse] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleAdd = () => {
    addUser({ name, prenom, phone, role, adresse, login, password })
      .then((res) => {
        console.log(res);
        if (res.data == "true") {
          queryClient.invalidateQueries('users')
          Toast.show({
            type: "success",
            text1: "Ajoute avec success!",
          });
          setCurrentLoader(null);
        } else {
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, \nVeuillez ressayer!",
          });
        }
      })
      .catch((e) => {
        console.log(e);
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue, Veuillez ressayer!",
          text2: e.toString(),
        });
      });
  };
  return (
    <KeyboardAvoidingView
      
    >
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
              {currentLoader == "Ajouter" ? "Espace Agent" : null}
            </Text>
            <TouchableOpacity onPress={() => setCurrentLoader(null)}>
              <Entypo name="cross" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ padding: 5, margin: 10 }}>
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Veuillez Ajouter un Agent
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
                height: height - 190,
              }}
            >
              <BlurView intensity={50} style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  onChangeText={setName}
                  value={name}
                  placeholder="Nom"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={setPrenom}
                  value={prenom}
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
                  onChangeText={setAdresse}
                  value={adresse}
                  placeholder="Adresse"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={setLogin}
                  value={login}
                  placeholder="User name"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Mot de Pass"
                  secureTextEntry
                />

                <View
                  style={{
                    borderWidth: 1,
                    height:100 ,
                    width: 200,
                    borderRadius: 15,
                  }}
                >
                  <Picker
                    selectedValue={role}
                    onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
                    style={styles.select}
                    itemStyle={{
                      height: 40,
                      marginTop: -10,
                      width: 190,
                      alignSelf: "center",
                    }}
                    mode="dialog"
                  >
                    <Picker.Item label="choisir un rôle" value="" />
                    {data &&
                      data.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            label={item.role}
                            value={item.id_role}
                          />
                        );
                      })}
                  </Picker>
                </View>

                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
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

export default Ajouter;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  touch: {
    height: 50,
    width: 110,
    maxWidth: 130,
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
    paddingHorizontal: 70,
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
    marginVertical: 5,
    padding: 5,
    flex: 8,
  },
  section: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  Card: {
    flex: 1,
    margin: 5,
    padding: 5,
    flexDirection: "row",
    backgroundColor: "white",
    maxHeight: 250,
    minHeight: 100,
    width: width - 15,
    alignSelf: "center",
    elevation: 5,
    borderRadius: 10,
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

    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 80,
  },
  CardDelete: {
    margin: 5,
    padding: 5,
    height: 120,
    width: width - 50,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
  },
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

    width: 200,
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
  select: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontWeight: "bold",
  },

  chip: {
    flexDirection: "row",
    padding: 2,
    flexGrow: 1,
    height: 40,
    justifyContent: "center",
    margin: 10,
  },
  chipItem: {
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "black",
    marginHorizontal: 10,
    padding: 0,
    overflow: "hidden",
    minWidth: 100,
    maxWidth: 150,
    borderRadius: 20, 
    backgroundColor: "white",
  },
});
