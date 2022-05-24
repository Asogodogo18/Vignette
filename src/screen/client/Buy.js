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
import { useAuthState } from "../../global";
import Tarif from "../../components/shared/Tarif";
import { Picker } from "@react-native-picker/picker";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useQueryClient } from "react-query";
import { buyVignetteMutation } from "../../services/query";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("screen");

const Buy = ({ navigation, route }) => {
  const queryClient = useQueryClient();
  const { user, isSignedIn } = useAuthState();
  const condition = isSignedIn && user.role === "Client";
  const { puissance } = route.params;

  const [name, setName] = useState(condition ? user.nom : "");
  const [surname, setSurname] = useState(condition ? user.prenom : "");
  const [phone, setPhone] = useState(condition ? user.telephone : "");
  const [marque, setMarque] = useState("ktm");
  const [type, setType] = useState("2roues");
  const [noChassi, setNoChassi] = useState("");
  const [editable, setEditable] = useState(true);
  const [postResult, setPostResult] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleBuy = () => {
    setEditable(false);
    const data = {
      name,
      surname,
      phone,
      type,
      marque,
      noChassi,
      puissance: puissance.id_puissance,
      id: user.id_user,
    };
    buyVignetteMutation(data)
      .then((res) => {
        //console.log("debut du requete", res);
        if (res.data === "true") {
          Toast.show({
            type: "success",
            text1: "Vos modifications ont ete enregistrer!",
          });
          queryClient.invalidateQueries("vignettes"), navigation.goBack();
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
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../../../assets/icon/bg-buy.png")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Tarif item={puissance} navigation={navigation} />
        <BlurView intensity={20} style={styles.inputBox}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            editable={editable}
            value={name}
            placeholder="Nom"
          />
          <TextInput
            style={styles.input}
            onChangeText={setSurname}
            editable={editable}
            value={surname}
            placeholder="Prenom"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPhone}
            editable={editable}
            value={phone}
            placeholder="Numero de Telephone"
            keyboardType="numeric"
          />
          <View
            style={{
              borderWidth: 1,
              borderRadius: 15,
              width: 210,
              height: 40,
              margin: 10,
            }}
          >
            <Picker
              style={{ marginTop: -10 }}
              selectedValue={marque}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => setMarque(itemValue)}
              placeholder="Marque"
            >
              <Picker.Item label="KTM" value="ktm" />
              <Picker.Item label="Honda" value="honda" />
              <Picker.Item label="Yamaha" value="yamaha" />
            </Picker>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 15,
              width: 210,
              height: 40,
              margin: 10,
            }}
          >
            <Picker
              style={{ marginTop: -10 }}
              selectedValue={type}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}
              placeholder="type"
            >
              <Picker.Item label="2 Roues" value="2roues" />
              <Picker.Item label="3 Roues" value="3roues" />
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            onChangeText={setNoChassi}
            editable={editable}
            value={noChassi}
            placeholder="Numero de Chassis "
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
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
                <Text style={styles.btnLabel}>Acheter</Text>
              )}
            </TouchableOpacity>
          </View>
        </BlurView>
      </ImageBackground>
    </ScrollView>
  );
};

export default Buy;

const styles = StyleSheet.create({
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
});
