import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { addPuissance } from "../../../services/query";
import * as Animatable from "react-native-animatable";
import {
  FontAwesome,
  Ionicons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { Picker } from "@react-native-picker/picker";
import { usePuissances } from "../../../services/query";

const { width, height } = Dimensions.get("screen");

import Checkbox from "expo-checkbox";
import { BlurView } from "expo-blur";

const Add = ({ handlePress }) => {
  const [puissance, setPuissance] = useState("");
  const [montant, setMontant] = useState("");
  const [selectedType, setSelectedType] = useState("personnel");

  const handleAdd = () => {
    addPuissance({ puissance, montant, utilisation: selectedType })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <SafeAreaView>
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
            <TouchableOpacity onPress={() => handlePress(null)}>
              <Ionicons name="ios-arrow-undo" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
              Puissance Fiscale
            </Text>
            <TouchableOpacity onPress={() => handlePress(null)}>
              <Entypo name="cross" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ padding: 5, margin: 10 }}>
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Veuillez acheter une Vignette
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
                  onChangeText={setPuissance}
                  value={puissance}
                  placeholder="Puissance"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={setMontant}
                  value={montant}
                  placeholder="Montant"
                  keyboardType="numeric"
                />

                <Picker
                  selectedValue={selectedType}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedType(itemValue)
                  }
                  style={styles.input}
                  mode="dropdown"
                >
                  <Picker.Item label="Personnel" value="personnel" />
                  <Picker.Item label="Transport" value="transport" />
                </Picker>

                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    onPress={() => handlePress(null)}
                    style={[styles.button, { backgroundColor: "black" }]}
                  >
                    <Text style={styles.btnLabel}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleAdd}
                    style={[styles.button, { backgroundColor: "green" }]}
                  >
                    <Text style={styles.btnLabel}>Acheter</Text>
                  </TouchableOpacity>
                </View>
              </BlurView>
            </ImageBackground>
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touch: {
    height: 50,
    width: 120,
    maxWidth: 140,
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
    maxHeight: 350,
    minHeight: 200,
    width: width - 20,
    backgroundColor: "white",
    marginVertical: 5,
    padding: 5,
    elevation: 10,
  },
  section: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  card: {
    flex: 1,
    margin: 5,
    // padding: 5,
    height: 100,
    maxWidth: 450,
    minWidth: 345,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
    flexDirection: "row",
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
  select: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontWeight: "bold",
  },
});
