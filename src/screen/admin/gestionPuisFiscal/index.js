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
} from "react-native";
import React, { useState } from "react";
import Input from "../../../components/TextInput";
import * as Animatable from "react-native-animatable";
import {
  FontAwesome,
  Ionicons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

import Checkbox from "expo-checkbox";
import { BlurView } from "expo-blur";

const Index = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
  });
  Keyboard.dismiss();

  const [currentLoader, setCurrentLoader] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

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
                Puissance Fiscale
              </Text>
              <Image
                source={require("../../../../assets/icon/puissance.png")}
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
                justifyContent: "space-around",
                padding: 2,
                margin: 2,
                // position: "relative",
                // marginHorizontal: 240,

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
              {/* <TouchableOpacity style={styles.touch}>
                <AntDesign name="delete" size={24} color="white" />
                <Text style={styles.touchTxt}>Supprimer</Text>
              </TouchableOpacity> */}
            </View>
            <TouchableOpacity
              onPress={() => setIsVisible(!isVisible)}
              style={styles.card}
            >
              <View
                style={{
                  // flex: 2,
                  height: 60,
                  width: 60,
                  backgroundColor: "#99D98c",
                  borderRadius: 40,
                  marginTop: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../assets/icon/puissance.png")}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 7 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
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
                      Puissance
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 18,
                        color: "black",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      0 à 50 cm3
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
                      Usage
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 18,
                        color: "black",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Personnel
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    marginTop: 15,
                    alignContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginHorizontal: 0,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "200",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Montant
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
                    6000
                  </Text>
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
                    height: 100,
                    maxWidth: 450,
                    minWidth: 350,
                    borderRadius: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handlePress("Ajouter")}
                      style={styles.btnBlur}
                    >
                      <AntDesign name="addfolder" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handlePress("Modify")}
                      style={styles.btnBlur}
                    >
                      <FontAwesome name="edit" size={30} color="white" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      onPress={() => setIsDelete(!isDelete)}
                      style={styles.btnBlur}
                    >
                      <MaterialCommunityIcons
                        name="delete"
                        size={30}
                        color="white"
                      />
                    </TouchableOpacity> */}
                  </View>
                </BlurView>
              ) : null}
            </TouchableOpacity>
          </Animatable.View>
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
              <TouchableOpacity onPress={() => navigation.push("PuisFiscale")}>
                <Ionicons name="ios-arrow-undo" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
                Puissance Fiscale
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

            <View
              style={{
                padding: 2,
                margin: 2,
              }}
            >
              <TouchableOpacity
                onPress={() => handlePress("Ajouter")}
                style={styles.touchAchat}
              >
                <AntDesign name="addfolder" size={24} color="white" />
                <Text style={styles.touchTxt}>Ajouter</Text>
              </TouchableOpacity>
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
              <TouchableOpacity onPress={() => navigation.push("PuisFiscale")}>
                <Ionicons name="ios-arrow-undo" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
                Puissance Fiscale
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
                <Entypo name="cross" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 5, margin: 10 }}>
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                Modification du Puissance Fiscale
              </Text>
            </View>

            <View
              style={{
                padding: 2,
                margin: 2,
              }}
            >
              <TouchableOpacity style={styles.touchAchat}>
                <FontAwesome name="edit" size={30} color="white" />
                <Text style={styles.touchTxt}>Modifier</Text>
              </TouchableOpacity>
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
});
