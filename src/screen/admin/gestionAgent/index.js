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
} from "react-native";
import React, { useState } from "react";
import Input from "../../../components/TextInput";
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
import { useUsers } from "../../../services/query";

import { Picker } from "@react-native-picker/picker";
const { width, height } = Dimensions.get("screen");

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
  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  Keyboard.dismiss();

  const [currentLoader, setCurrentLoader] = useState(null);

  const [isDelete, setIsDelete] = useState(false);

  const renderAgent = ({ item }) => {
    return (
      // <View style={{ flexDirection: "row" }}>

      //   <Animatable.View
      //     delay={200}
      //     duration={250}
      //     animation="bounceInLeft"
      //     style={styles.CardDelete}
      //   >
      //     <View
      //       style={{
      //         // flex: 2,
      //         height: 50,
      //         width: 50,
      //         backgroundColor: "#99D98c",
      //         borderRadius: 80,
      //         // marginTop: 20,
      //         justifyContent: "center",
      //         alignItems: "center",
      //       }}
      //     >
      //       <Image
      //         source={require("../../../../assets/icon/agent3.png")}
      //         style={{
      //           height: 35,
      //           width: 35,
      //         }}
      //         resizeMode="contain"
      //       />
      //     </View>

      //     <View style={styles.vignette}>
      //       <View
      //         style={{
      //           flexDirection: "row",
      //           marginTop: 10,
      //           justifyContent: "center",
      //         }}
      //       >
      //         <View style={{ flex: 1 }}>
      //           <Text
      //             style={{
      //               fontSize: 15,
      //               fontWeight: "200",
      //               color: "black",
      //               textTransform: "capitalize",
      //             }}
      //           >
      //             Nom
      //           </Text>
      //           <Text
      //             style={{
      //               marginLeft: 5,
      //               fontSize: 18,
      //               color: "black",
      //               textTransform: "uppercase",
      //               fontWeight: "bold",
      //             }}
      //           >
      //             Sogodogo
      //           </Text>
      //         </View>
      //         <View style={{ flex: 1 }}>
      //           <Text
      //             style={{
      //               fontSize: 15,
      //               fontWeight: "200",
      //               color: "black",
      //               textTransform: "capitalize",
      //             }}
      //           >
      //             Prénom
      //           </Text>
      //           <Text
      //             style={{
      //               marginLeft: 5,
      //               fontSize: 18,
      //               color: "black",
      //               textTransform: "uppercase",
      //               fontWeight: "bold",
      //             }}
      //           >
      //             Cheick abba
      //           </Text>
      //         </View>
      //       </View>
      //       <View
      //         style={{
      //           flexDirection: "row",
      //           marginTop: 5,
      //           justifyContent: "center",
      //         }}
      //       >
      //         <View style={{ flex: 1 }}>
      //           <Text
      //             style={{
      //               fontSize: 15,
      //               fontWeight: "200",
      //               color: "black",
      //               textTransform: "capitalize",
      //             }}
      //           >
      //             Telephone
      //           </Text>
      //           <Text
      //             style={{
      //               marginLeft: 5,
      //               fontSize: 18,
      //               color: "black",
      //               textTransform: "uppercase",
      //               fontWeight: "bold",
      //             }}
      //           >
      //             72192458
      //           </Text>
      //         </View>
      //         <View style={{ flex: 1 }}>
      //           <Text
      //             style={{
      //               fontSize: 15,
      //               fontWeight: "200",
      //               color: "black",
      //               textTransform: "capitalize",
      //             }}
      //           >
      //             Role
      //           </Text>
      //           <Text
      //             style={{
      //               marginLeft: 15,
      //               fontSize: 18,
      //               color: "black",
      //               textTransform: "uppercase",
      //               fontWeight: "bold",
      //             }}
      //           >
      //             Police
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
      //     {isDelete ? (
      //       <TouchableOpacity style={styles.delete}>
      //         <AntDesign name="delete" size={20} color="white" />
      //       </TouchableOpacity>
      //     ) : null}
      //   </Animatable.View>
      // </View>

      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        style={styles.Card}
      >
        {isDelete && (
          <View style={{ marginTop: 50, padding: 10 }}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
            />
          </View>
        )}
        <View
          style={{
            // flex: 1,
            height: 50,
            width: 50,
            backgroundColor: "#99D98c",
            borderRadius: 80,
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../../assets/icon/agent3.png")}
            style={{
              height: 35,
              width: 35,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.vignette}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "200",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Nom
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.nom}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "200",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Prénom
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.prenom}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "200",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Telephone
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.telephone}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "200",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Role
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.role}
              </Text>
            </View>
          </View>
        </View>
        {isVisible ? (
          <BlurView
            intensity={50}
            tint="dark"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
              height: 130,
              width: width - 15,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={() => handlePress("Modify")}
                style={styles.btnBlur}
              >
                <FontAwesome name="edit" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsDelete(!isDelete)}
                style={styles.btnBlur}
              >
                <MaterialCommunityIcons name="delete" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </BlurView>
        ) : null}
      </TouchableOpacity>
    );
  };

  const handlePress = (loader) => {
    setCurrentLoader(loader);
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
              onPress={() => setIsDelete(!isDelete)}
              style={styles.touch}
            >
              <AntDesign name="delete" size={24} color="white" />
              <Text style={styles.touchTxt}>Supprimer</Text>
            </TouchableOpacity>
          </View>
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
              renderItem={renderAgent}
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
});
