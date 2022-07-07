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
  ActivityIndicator,
  Alert,
} from "react-native";
import { SkypeIndicator } from "react-native-indicators";
import * as ImagePicker from "expo-image-picker";
import DocumentPicker from "react-native-document-picker";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useContext, useRef, useEffect } from "react";
import VignetteList from "../../components/shared/VignetteList";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { Ionicons, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { transfertVignette, useVignette } from "../../services/query";
import { useAuthState } from "../../global";

import axios from "axios";
const { height, width } = Dimensions.get("screen");

const VignetteSelection = ({ setSelectedVignette }) => {
  const { user } = useAuthState();

  const {
    status,
    data: vignettes,
    error,
    isFetching,
  } = useVignette(user.id_user);

  const RenderVignette = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedVignette({ item, ancien: user.id_user })}
        style={{
          height: 80,
          width: "97%",
          padding: 10,
          margin: 10,
          alignItems: "center",
          // borderWidth: 1.2,
          alignSelf: "center",
          borderRadius: 15,
          backgroundColor: "white",
          elevation: 5,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            flex: 3,
            fontSize: 16,
            fontWeight: "700",
            letterSpacing: 1.2,
            color: "black",
          }}
        >
          {item.num_chassis}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            letterSpacing: 1.2,
            flex: 1,
          }}
        >
          {item.marque}
        </Text>
      </TouchableOpacity>
    );
  };

  if (isFetching) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SkypeIndicator color="#99D98c" size={40} />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingVertical: 10 }}
      data={vignettes.data}
      renderItem={RenderVignette}
      keyExtractor={(item) => item.id_engin}
    />
  );
};

const InitTransfert = ({ navigation }) => {
  const [selectedVignette, setSelectedVignette] = useState(null);
  const [image, setImage] = useState([]);
  const [image2, setImage2] = useState([]);

  const [numero, setNumero] = useState("");

  const [isTranfering, setIsTranfering] = useState(false);
  const [singleFile, setSingleFile] = useState(null);

  const handleTransfert = () => {
    transfertVignette({
      id_engin: selectedVignette.item.id_engin,
      nouveau: numero,
      ancien: selectedVignette.ancien,
      image: image[0],
      image2: image2[0],
    })
      .then((res) => {
        // console.log("reponse transfert: ", res);
        if (res.status === "200") {
          Toast.show({
            type: "success",
            text1: "Transfert éffectué avec succès!",
          });
          setTimeout(() => {
            navigation.goBack();
          }, 1500);
        } else {
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, ",
            text2: "Veuillez ressayer!",
          });
        }
      })
      .catch((err) =>
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue, Veuillez ressayer!",
          text2: err.toString(),
        })
      );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 13],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage([...image, { ...result }]);
    }
  };
  const pickImage2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 13],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage2([...image2, { ...result }]);
    }
  };

  const onRemove2 = (index) => {
    setImage2([
      ...image2.slice(0, index),
      ...image2.slice(index + 1, image2.length),
    ]);
  };
  const onRemove = (index) => {
    setImage([
      ...image.slice(0, index),
      ...image.slice(index + 1, image.length),
    ]);
  };

  if (selectedVignette) {
    return (
      <ImageBackground
        resizeMode="cover"
        source={require("../../../assets/bg_transfert1.png")}
        style={{ flex: 1 }}
      >
        <View
          style={{
            height: 80,
            backgroundColor: "#1a1818",
            flexDirection: "row",
            elevation: 5,
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSelectedVignette(null), navigation.goBack();
            }}
          >
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
            Transfert
          </Text>
          <Image
            source={require("../../../assets/icon/transfert.png")}
            style={{ height: 40, width: 40 }}
            resizeMode="cover"
          />
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "black",
              marginLeft: 10,
              padding: 5,
            }}
          >
            Veuillez Entrer les informations suivantes
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNumero(text)}
            value={numero}
            placeholder="N° Telephone de l'acheteur"
          />
          <ScrollView
            horizontal
            contentContainerStyle={{ flexDirection: "row", flexGrow: 1 }}
          >
            {image.map((image, index) => {
              return (
                <View style={styles.photo} key={index}>
                  <TouchableOpacity
                    onPress={() => onRemove(index)}
                    style={{
                      position: "absolute",
                      top: 5,
                      elevation: 5,
                      right: 5,
                      bottom: 0,
                      zIndex: 100,
                      backgroundColor: "white",
                      height: 30,
                      width: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20,
                    }}
                  >
                    <Entypo name="circle-with-cross" size={27} color="red" />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.image}
                    resizeMode="cover"
                    key={index}
                  />
                </View>
              );
            })}
            {image2.map((image, index) => {
              return (
                <View style={styles.photo} key={index}>
                  <TouchableOpacity
                    onPress={() => onRemove2(index)}
                    style={{
                      position: "absolute",
                      top: 5,
                      elevation: 5,
                      right: 5,
                      bottom: 0,
                      zIndex: 100,
                      backgroundColor: "white",
                      height: 30,
                      width: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20,
                    }}
                  >
                    <Entypo name="circle-with-cross" size={27} color="red" />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.image}
                    resizeMode="cover"
                    key={index}
                  />
                </View>
              );
            })}
          </ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={styles.quickselect} onPress={pickImage}>
              <MaterialIcons
                name="add-photo-alternate"
                size={40}
                color="black"
              />
              <Text style={styles.label}>
                Veuillez ajouter la photo de votre facture d'achat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickselect} onPress={pickImage2}>
              <MaterialIcons
                name="add-photo-alternate"
                size={40}
                color="black"
              />
              <Text style={styles.label}>
                Veuillez ajouter la photo de votre déclaration de vente
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={() => setSelectedVignette(null)}
              style={[styles.button, { backgroundColor: "black" }]}
            >
              <Text style={styles.btnLabel}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleTransfert}
              style={[styles.button, { backgroundColor: "green" }]}
            >
              <Text style={styles.btnLabel}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../../../assets/bg_transfert1.png")}
      style={styles.contain}
    >
      <View
        style={{
          height: 80,
          backgroundColor: "#1a1818",
          flexDirection: "row",
          elevation: 5,
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: 15,
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
          Transfert
        </Text>
        <Image
          source={require("../../../assets/icon/transfert.png")}
          style={{ height: 40, width: 40 }}
          resizeMode="cover"
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          color: "black",
          marginLeft: 10,
          padding: 5,
        }}
      >
        Veuillez choisir la vignette à transférer
      </Text>
      <VignetteSelection setSelectedVignette={setSelectedVignette} />
    </ImageBackground>
  );
};

export default InitTransfert;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    height: height,
  },
  photo: {
    width: 180,
    height: 180,

    marginTop: 10,
    elevation: 0,
    borderRadius: 10,
    //overflow: "hidden",
    //alignContent: "center",

    // marginLeft: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  quickselect: {
    // flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "beige",
    elevation: 5,
    borderRadius: 10,
    // height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  label: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 0.8,
    padding: 10,
    borderRadius: 15,
    fontWeight: "bold",
    alignSelf: "center",
    width: 295,
    backgroundColor: "white",
    elevation: 5,
  },
  button: {
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    minWidth: width - 400,
    maxWidth: width,
  },
  btnLabel: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: "row",
    height: 60,
    marginTop: 60,
    alignSelf: "center",
    paddingHorizontal: 100,
  },
});
