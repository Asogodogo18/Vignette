import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { declarationVol, getVignetteByChassis } from "../../services/query";
import { Ionicons, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const isTablet = width > 360;

const Perte = ({ navigation }) => {
  const [isCheckingVignette, setisCheckingVignette] = useState(false);
  const [isVignetteValid, setIsVignetteValid] = useState(false);
  const [image, setImage] = useState([]);
  const [numChassis, setNumChassis] = useState("");
  const [id_user, setId_user] = useState("");
  const [id_engin, setId_engin] = useState("");

  const onSubmitChassis = () => {
    setisCheckingVignette(true);
    getVignetteByChassis(numChassis)
      .then((res) => {
        if (res.data !== "False") {
          setIsVignetteValid(true);
          console.log("numero chassis :", res.data[0]);
          setId_user(res.data[0].id_user);
          setId_engin(res.data[0].id_engin);
        } else setIsVignetteValid(false);
      })
      .catch((e) => {
        console.log("error :", e);
      })
      .finally(() => setisCheckingVignette(false));
  };
  const handleSubmit = () => {
    if (!isVignetteValid) {
      Toast.show({
        type: "error",
        text1: "Numero de Chassis Non Valide!",
      });
      return;
    }
    if (!image) {
      Toast.show({
        type: "error",
        text1: "Veuillez ajouter la déclaration de perte!",
      });
      return;
    }
    declarationVol({
      id_engin: id_engin,
      id_user: id_user,
      certificat: image[0],
    })
      .then((res) => {
        // console.log("reponse pert: ", res);
        if (res.status === "200") {
          Toast.show({
            type: "success",
            text1: "Declaration effectue avec succes!",
          });
          setTimeout(() => {
            navigation.goBack();
          }, 1500);
        } else {
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, \nVeuillez ressayer!",
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
    //
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
      console.log("image", image);
    }
  };
  const onRemove = (index) => {
    setImage([
      ...image.slice(0, index),
      ...image.slice(index + 1, image.length),
    ]);
  };

  return (
    <ScrollView ContentContainerStyle={styles.contain}>
      <Image
        style={{ width, height: 300, marginBottom: 20 }}
        resizeMode="contain"
        source={require("../../../assets/lost.png")}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <TextInput
          placeholder="Entrer le Numero de Chassis"
          onSubmitEditing={onSubmitChassis}
          style={{
            height: 55,
            alignSelf: "center",
            width: "80%",
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
        {isCheckingVignette ? (
          <ActivityIndicator size="large" />
        ) : isVignetteValid ? (
          <AntDesign
            style={[
              { marginLeft: 10 },
              numChassis !== "" && isVignetteValid
                ? styles.showIcon
                : styles.hideIcon,
            ]}
            name="checkcircleo"
            size={30}
            color="green"
          />
        ) : (
          <AntDesign
            style={[
              { marginLeft: 10 },
              numChassis !== "" && isVignetteValid
                ? styles.showIcon
                : styles.hideIcon,
            ]}
            name="closecircleo"
            size={30}
            color="red"
          />
        )}
      </View>
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
    width: isTablet ? width - 400 : 110,
  },
  btnLabel: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: "row",
    // height: 60,
    marginTop: 60,
    alignSelf: "center",
  },
  hideIcon: {
    display: "none",
  },
  showIcon: {
    display: "flex",
  },
});
