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
  Keyboard,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import {
  Ionicons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Checkbox from "expo-checkbox";
import { useUsers, deleteUser } from "../../../services/query";
import { Chip } from "react-native-paper";

import { Picker } from "@react-native-picker/picker";
import RenderAgent from "../gestionAgent/renderAgent";
const { width, height } = Dimensions.get("screen");
const Data = [
  {
    id: "1",
    name: "Agent",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
  {
    id: "2",
    name: "Superviseur",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
  {
    id: "3",
    name: "Policier",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
  {
    id: "4",
    name: "Verificateur",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
  {
    id: "5",
    name: "Client",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
];

const Index = ({ navigation }) => {
  const {
    data: userData,
    error: userError,
    isFetching: isFetchingUsers,
  } = useUsers();
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState();
  Keyboard.dismiss();

  const [currentLoader, setCurrentLoader] = useState(null);

  const [IsActive, setIsActive] = useState(0);
  const [isDelete, setIsDelete] = useState(false);

  const handlePress = (loader) => {
    setCurrentLoader(loader);
  };
  const [elementsToDelete, setElementsToDelete] = useState([]);

  const [operationItem, setOperationItem] = useState(null);

  useEffect(() => {
    console.log("user del:", elementsToDelete);
  }, [elementsToDelete]);

  const handleMultipleDelete = () => {
    setIsDelete(!isDelete);
    if (elementsToDelete.length != 0) {
      elementsToDelete.forEach((element) => {
        handleDelete(element);
      });
    }
  };
  const handleDelete = (id) => {
    console.log("id", id);
    deleteUser(id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  if (!currentLoader) {
    return (
      <SafeAreaView>
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
              Agent
            </Text>
            <Image
              source={require("../../../../assets/icon/agent3.png")}
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
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 2,
              margin: 2,

              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => handlePress("Ajouter")}
              style={styles.touch}
            >
              <AntDesign name="addfolder" size={24} color="white" />
              <Text style={styles.touchTxt}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress("Modify")}
              style={styles.touch}
            >
              <MaterialCommunityIcons
                name="file-document-edit-outline"
                size={24}
                color="white"
              />
              <Text style={styles.touchTxt}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleMultipleDelete}
              style={styles.touch}
            >
              <AntDesign name="delete" size={24} color="white" />
              <Text style={styles.touchTxt}>Supprimer</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chip}
          >
            {Data.map((item, index) => {
              return (
                <Chip
                  key={item.id}
                  selectedColor="black"
                  selected={IsActive == index ? true : false}
                  style={styles.chipItem}
                  avatar={
                    <Ionicons
                      name="person"
                      size={20}
                      color="white"
                      style={{
                        backgroundColor: "#99D98c",
                        padding: 2,
                      }}
                    />
                  }
                  onPress={() => {
                    setIsActive(!IsActive);
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: Platform.OS === "ios" ? "500" : "800",
                      fontSize: 15,
                      letterSpacing: 1,
                    }}
                  >
                    {item.name}
                  </Text>
                </Chip>
              );
            })}
          </ScrollView>
          {isFetchingUsers ? (
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
              data={userData.filter((user) => user.role === "Agent")}
              renderItem={({ item }) => (
                <RenderAgent
                  item={item}
                  handlePress={handlePress}
                  isDelete={isDelete}
                  handleDelete={handleDelete}
                  elementsToDelete={elementsToDelete}
                  setElementsToDelete={setElementsToDelete}
                />
              )}
              keyExtractor={(item) => item.id_user}
            />
          )}
        </Animatable.View>
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
              <TouchableOpacity onPress={() => navigation.push("Agent")}>
                <Ionicons name="ios-arrow-undo" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
                Espace Agent
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
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

                  <View
                    style={{
                      borderWidth: 1,
                      height: 80,
                      width: 200,
                      borderRadius: 15,
                    }}
                  >
                    <Picker
                      selectedValue={role}
                      onValueChange={(itemValue, itemIndex) =>
                        setRole(itemValue)
                      }
                      style={styles.select}
                      mode="dropdown"
                    >
                      <Picker.Item label="Rôle" value="" />
                      <Picker.Item
                        label="Superviseur"
                        value="administraateur"
                      />
                      <Picker.Item label="Police" value="police" />
                      <Picker.Item label="Client" value="client" />
                      <Picker.Item label="Agent" value="agent" />
                      <Picker.Item label="Verificateur" value="verificateur" />
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
      </SafeAreaView>
    );
  }
  if (currentLoader == "Modify") {
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
              <TouchableOpacity onPress={() => navigation.push("Agent")}>
                <Ionicons name="ios-arrow-undo" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
                Espace Agent
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
                <Entypo name="cross" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 5, margin: 10 }}>
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                Modification de L'agent
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

                  <View
                    style={{
                      borderWidth: 1,
                      height: 80,
                      width: 200,
                      borderRadius: 15,
                    }}
                  >
                    <Picker
                      selectedValue={role}
                      onValueChange={(itemValue, itemIndex) =>
                        setRole(itemValue)
                      }
                      style={styles.select}
                      mode="dropdown"
                    >
                      <Picker.Item label="Rôle" value="" />
                      <Picker.Item
                        label="Superviseur"
                        value="administraateur"
                      />
                      <Picker.Item label="Police" value="police" />
                      <Picker.Item label="Client" value="client" />
                      <Picker.Item label="Agent" value="agent" />
                      <Picker.Item label="Verificateur" value="verificateur" />
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
                      style={[styles.button, { backgroundColor: "green" }]}
                    >
                      <Text style={styles.btnLabel}>Modifier</Text>
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
    borderRadius: Platform.OS == "ios" ? 20 : 50,
    backgroundColor: "white",
  },
});
