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
  Ionicons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
const Index = ({ navigation }) => {
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
                // justifyContent: "space-between",
                paddingHorizontal: 10,
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
                  marginLeft: 130,
                }}
              >
                Profil
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1a1818",
                borderBottomRightRadius: 70,
                height: 200,
              }}
            >
              <Image
                source={require("../../../../assets/icon/profil.png")}
                style={{ height: 170, width: 170 }}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                alignSelf: "center",
                marginVertical: 0,
                width: width,
              }}
            >
              <TouchableOpacity
                style={styles.touch}
                onPress={() => handlePress("Modify")}
              >
                <MaterialCommunityIcons
                  name="file-document-edit-outline"
                  size={24}
                  color="white"
                />
                <Text style={styles.text}>Modifier</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.Card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
              >
                <Text style={styles.txt}>Nom :</Text>
                <Text style={styles.txt}>Kante</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
              >
                <Text style={styles.txt}>Prénom :</Text>
                <Text style={styles.txt}>Moussa</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
              >
                <FontAwesome name="phone-square" size={30} color="gray" />
                <Text style={styles.txt}>5548784545454</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
              >
                <Ionicons name="mail" size={30} color="gray" />

                <Text style={styles.txt}>mousaa@gmai.com</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
              >
                <Ionicons name="md-location-sharp" size={30} color="gray" />

                <Text style={styles.txt}>Sotuba</Text>
              </View>
            </View>

            <View
              style={{
                alignSelf: "center",
                marginVertical: 0,
              }}
            >
              <TouchableOpacity style={styles.touch} onPress={() => {}}>
                <FontAwesome name="sign-out" size={24} color="white" />
                <Text style={styles.text}>Déconnexion</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
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
              <TouchableOpacity onPress={() => navigation.push("Profil")}>
                <Ionicons name="ios-arrow-undo" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
                Espace Administrateur
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
                <Entypo name="cross" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 5, margin: 10 }}>
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                Modification du compte Administrateur
              </Text>
            </View>

            <View
              style={{
                padding: 2,
                margin: 2,
              }}
            >
              <TouchableOpacity style={styles.touch}>
                <MaterialCommunityIcons
                  name="file-document-edit-outline"
                  size={24}
                  color="white"
                />
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
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: 250,
    minWidth: 50,
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
});
