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
} from "react-native";
import { SkypeIndicator } from "react-native-indicators";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useContext, useRef } from "react";
import VignetteList from "../../components/shared/VignetteList";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { Ionicons, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useVignette } from "../../services/query";
import { useAuthState } from "../../global";
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
        onPress={() => setSelectedVignette(item)}
        style={{
          height: 80,
          // borderBottomColor: "tomato",
          // borderBottomWidth: 1,
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
        {/* <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            letterSpacing: 1.2,
            flex: 2,
          }}
        >
          {item.type}
        </Text> */}
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
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 13],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage([result.uri]);
      console.log(image);
    }
  };

  if (selectedVignette) {
    return (
      <ImageBackground
        resizeMode="cover"
        source={require("../../../assets/bg_transfert1.png")}
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
          <TouchableOpacity onPress={() => setSelectedVignette(null)}>
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
          Veuillez Entrer les informations suivantes
        </Text>
        <TouchableOpacity style={styles.quickselect} onPress={pickImage}>
          <MaterialIcons name="add-photo-alternate" size={40} color="black" />
          <Text style={styles.label}>
            Veuillez ajouter la photo de votre Carte d'identite
          </Text>
        </TouchableOpacity>
        {image.map((image, index) => {
          return (
            <View style={styles.photo}>
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
                key={index}
              />
            </View>
          );
        })}
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
    height: 190,

    marginTop: 10,
    elevation: 20,
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
    borderRadius: 5,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
});
