import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { Ionicons, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const Perte = ({ navigation }) => {
  const [image, setImage] = useState([]);
  const [numChassis, setNumChassis] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 13],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage([...image, result.uri]);
      console.log(image);
    }
  };
  const onRemove = (index) => {
    setImage([
      ...image.slice(0, index),
      ...image.slice(index + 1, image.length),
    ]);
  };

  const handleSubmit = () => {
    Toast.show({
      type: "success",
      text1: "Votre vignette a ete enregistrer!",
    });
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };
  return (
    <ScrollView ContentContainerStyle={styles.contain}>
      <Image
        style={{ width, height: 300, marginBottom: 20 }}
        resizeMode="contain"
        source={require("../../../assets/lost.png")}
      />
      <TextInput
        placeholder="Entrer le Numero de Chassis"
        style={{
          height: 55,
          alignSelf: "center",
          marginTop: 10,
          width: "90%",
          borderColor: "lightgreen",
          borderWidth: 1,
          borderRadius: 8,
          padding: 15,
          backgroundColor: "white",
          elevation: 5,
        }}
        value={numChassis}
        onChangeText={setNumChassis}
      />
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
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
              key={index}
            />
          </View>
        );
      })}
      <TouchableOpacity style={styles.quickselect} onPress={pickImage}>
        <MaterialIcons name="add-photo-alternate" size={40} color="black" />
        <Text style={styles.label}>
          Veuillez ajouter la declaration de perte
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, { backgroundColor: "black" }]}
        >
          <Text style={styles.btnLabel}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, { backgroundColor: "green" }]}
        >
          <Text style={styles.btnLabel}>Valider</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Perte;

const styles = StyleSheet.create({
  contain: {
    flexGrow: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
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
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    width: 295,
    alignSelf: "center",
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
    width: width - 210,
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
  },
});
