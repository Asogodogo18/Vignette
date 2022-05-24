import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";

import { useAuthState } from "../../../global";
import Vignette from "../../shared/Vignette";
import { updateVignette } from "../../../services/query";
import * as Animatable from "react-native-animatable";
import { useQueryClient } from "react-query";

const { width, height } = Dimensions.get("screen");

const Modify = ({ handlePress, item }) => {
  const { user, isSignedIn } = useAuthState();
  const condition = isSignedIn && user.role === "Client";
  //console.log("vignette:", item);
  const queryClient = useQueryClient();

  const [name, setName] = useState(condition ? user.nom : item.nom);
  const [surname, setSurname] = useState(condition ? user.prenom : item.prenom);
  const [phone, setPhone] = useState(
    condition ? user.telephone : item.telephone
  );
  const [marque, setMarque] = useState(item.marque || "ktm");
  const [type, setType] = useState(item.type || "2roues");
  const [noChassi, setNoChassi] = useState(item.num_chassis || "");
  const [editable, setEditable] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const handleBuy = () => {
    setEditable(false);

    const data = {
      type,
      marque,
      noChassi,
      puissance: item.id_puissance,
      id: item.id_engin,
    };
    updateVignette(data)
      .then((res) => {
        //console.log("debut du requete", res);
        if (res.data === "true") {
          Toast.show({
            type: "success",
            text1: "Vos modifications ont ete enregistrer!",
          });
          queryClient.invalidateQueries("vignettes"), handlePress(null);
        } else {
          setEditable(true);
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, \nVeuillez ressayer!",
          });
        }
      })
      .catch((e) => {
        //console.log("error", e);

        setEditable(true);
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue, Veuillez ressayer!",
          text2: e.toString(),
        });
      });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground
          source={require("../../../../assets/icon/bg-buy.png")}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Vignette
            modify={true}
            item={{
              nom: name,
              prenom: surname,
              marque,
              type,
              num_chassis: noChassi,
              montant: item.montant,
              utilisation: item.utilisation,
            }}
          />
          <BlurView intensity={20} style={styles.inputBox}>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              editable={false}
              value={name}
              placeholder="Nom"
            />
            <TextInput
              style={styles.input}
              onChangeText={setSurname}
              editable={false}
              value={surname}
              placeholder="Prenom"
            />

            <Picker
              style={styles.input}
              selectedValue={marque}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => setMarque(itemValue)}
              placeholder="Marque"
            >
              <Picker.Item label="KTM" value="ktm" />
              <Picker.Item label="Honda" value="honda" />
              <Picker.Item label="Yamaha" value="yamaha" />
            </Picker>
            <Picker
              style={styles.input}
              selectedValue={type}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}
              placeholder="type"
            >
              <Picker.Item label="2 Roues" value="2roues" />
              <Picker.Item label="3 Roues" value="3roues" />
            </Picker>
            <TextInput
              style={styles.input}
              onChangeText={setNoChassi}
              editable={editable}
              value={noChassi}
              placeholder="Numero de Chassis "
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                onPress={() => handlePress(null)}
                style={[styles.button, { backgroundColor: "black" }]}
              >
                <Text style={styles.btnLabel}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isVisible}
                onPress={handleBuy}
                style={[styles.button, { backgroundColor: "green" }]}
              >
                {!editable ? (
                  <SkypeIndicator color="#99D98c" size={40} />
                ) : (
                  <Text style={styles.btnLabel}>Modifier</Text>
                )}
              </TouchableOpacity>
            </View>
          </BlurView>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  inputBox: {
    marginVertical: 8,
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
});

export default Modify;
