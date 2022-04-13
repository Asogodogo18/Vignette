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
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const AnimatedImg = Animatable.createAnimatableComponent(ImageBackground);

const Index = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
  });
  Keyboard.dismiss();

  const [currentLoader, setCurrentLoader] = useState(null);

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
                // flexDirection: "row",
                // justifyContent: "space-around",
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
              {/* <TouchableOpacity style={styles.touch}>
                <MaterialCommunityIcons
                  name="file-document-edit-outline"
                  size={24}
                  color="white"
                />
                <Text style={styles.touchTxt}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch}>
                <AntDesign name="delete" size={24} color="white" />
                <Text style={styles.touchTxt}>Supprimer</Text>
              </TouchableOpacity> */}
            </View>
            <View style={{ margin: 5, padding: 5 }}>
              <AnimatedImg
                resizeMode="cover"
                source={require("../../../../assets/bg.png")}
                animation="slideInRight"
                style={styles.vignette}
                duration={1000}
              >
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 25,
                    fontWeight: "200",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  Sogodogo
                  {"    "}
                  <Text
                    style={{
                      fontSize: 25,
                      color: "white",
                      textTransform: "uppercase",
                      fontWeight: "600",
                    }}
                  >
                    Cheick abba
                  </Text>
                </Text>
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
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      Marque
                    </Text>
                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: 18,
                        color: "white",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      KTM
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "200",
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      utilisation
                    </Text>
                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: 18,
                        color: "white",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Personnelle
                    </Text>
                  </View>
                </View>
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
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      Type
                    </Text>
                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: 18,
                        color: "white",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Vignette
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "200",
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      Montant
                    </Text>
                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: 18,
                        color: "white",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      6000
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    marginTop: 5,
                    textAlign: "center",
                    fontSize: 18,
                    color: "white",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  NBHU844558HHH777
                </Text>
              </AnimatedImg>
            </View>
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

            <View style={styles.section}>
              <Input iconName="account" label="Password" placeholder="Nom" />
              <Input iconName="account" label="Password" placeholder="Prenom" />
              <Input
                iconName="account-switch-outline"
                label="Password"
                placeholder="Prenom"
              />
              <Input
                iconName="account-switch-outline"
                label="Password"
                placeholder="Marque"
              />
              <Input
                iconName="account-switch-outline"
                label="Password"
                placeholder="Utilisation"
              />
              <Input
                iconName="account-switch-outline"
                label="Type"
                placeholder="Enter your password"
              />
              <Input
                iconName="account-switch-outline"
                label="Montant"
                placeholder="Enter your password"
              />
              <Input
                iconName="account-switch-outline"
                label="Password"
                placeholder="N°Chassis"
              />
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
                <Text style={styles.touchTxt}>Acheter</Text>
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
});
