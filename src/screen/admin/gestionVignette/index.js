import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Keyboard,
  FlatList,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";

import Vignette from "../../../components/shared/Vignette";
import { useVignettes } from "../../../services/query";
import Input from "../../../components/TextInput";
import * as Animatable from "react-native-animatable";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Picker } from "@react-native-picker/picker";
const { width, height } = Dimensions.get("screen");

const Index = ({ navigation }) => {
  const { status, data, error, isFetching, isFetched } = useVignettes();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [marque, setMarque] = useState("");
  const [noChassi, setNoChassi] = useState("");

  Keyboard.dismiss();

  const [currentLoader, setCurrentLoader] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    "Selectionne un Type"
  );

  const handlePress = (loader) => {
    setCurrentLoader(loader);
  };

  if (!currentLoader) {
    return (
      <SafeAreaView>
        <ScrollView>
          <Animatable.View
            animation="fadeIn"
            delay={500}
            duration={300}
            stickyHeaderHiddenOnScroll={true}
            nestedScrollEnabled
            stickyHeaderIndices={[0]}
            contentContainerStyle={styles.contain}
          >
            <View
              style={{
                height: 80,
                backgroundColor: "#1a1818",
                flexDirection: "row",
                elevation: 5,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
                <Ionicons name="ios-arrow-undo" size={30} color="white" />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "white",
                  textAlign: "center",
                  marginLeft: 10,
                }}
              >
                Vignette
              </Text>
              <Image
                source={require("../../../../assets/icon/vignette.png")}
                style={{ height: 40, width: 40 }}
                resizeMode="cover"
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginHorizontal: 10,
                padding: 10,
              }}
            >
              Action Rapide
            </Text>
            <View
              style={{
                padding: 2,
                margin: 2,

                marginHorizontal: 220,

                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handlePress("Ajouter")}
                style={styles.touch}
              >
                <AntDesign name="addfolder" size={24} color="white" />
                <Text style={styles.touchTxt}>Acheter</Text>
              </TouchableOpacity>
            </View>
            <View style={{ margin: 5, padding: 5 }}>
              {isFetching ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: "center",
                    paddingBottom: 50,
                  }}
                  data={data}
                  renderItem={Vignette}
                  keyExtractor={(item) => item.id_engin}
                />
              )}
            </View>
          </Animatable.View>
          <FlatList />
        </ScrollView>
      </SafeAreaView>
    );
  }
  if (currentLoader == "Ajouter") {
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
              <TouchableOpacity onPress={() => navigation.push("Vignette")}>
                <Ionicons name="ios-arrow-undo" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
                Achat Vignette
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
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
                }}
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
                  <View
                    style={{
                      borderWidth: 1,
                      height: 80,
                      width: 200,
                      borderRadius: 15,
                    }}
                  >
                    <Picker
                      selectedValue={selectedLanguage}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                      }
                      style={styles.select}
                      mode="dropdown"
                    >
                      <Picker.Item label="Type" value="" />
                      <Picker.Item label="2 Roues" value="2roues" />
                      <Picker.Item label="3 Roues" value="3roues" />
                    </Picker>
                  </View>

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
            </View>
          </ScrollView>
        </Animatable.View>
      </SafeAreaView>
    );
  }
};

export default Index;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touch: {
    height: 50,
    width: 110,
    maxWidth: 120,
    backgroundColor: "#99D98c",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 5,
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
});
