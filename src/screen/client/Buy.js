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
import React, { useState } from "react";
import { useAuthState } from "../../global";
import Tarif from "../../components/shared/Tarif";
import { Picker } from "@react-native-picker/picker";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";
import { buyVignetteMutation } from "../../services/query";
import * as Animatable from "react-native-animatable";

const fortmatResponse = (res) => {
  return JSON.stringify(res, null, 2);
};

const { width, height } = Dimensions.get("screen");

const Toast = ({ setIsVisible, children }) => {
  setTimeout(() => setIsVisible(false), 5000);
  return (
    <Animatable.View
      duration={500}
      animation="fadeInUp"
      style={{
        width: "80%",
        height: 250,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 10,
        zIndex: 20,
        position: "absolute",
        top: height / 3,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {children}
    </Animatable.View>
  );
};

const Buy = ({ navigation, route }) => {
  const { user, isSignedIn } = useAuthState();
  console.log(route.params)
  const { puissance } = route.params;

  const [name, setName] = useState(isSignedIn ? user.nom : "");
  const [surname, setSurname] = useState(isSignedIn ? user.prenom : "");
  const [phone, setPhone] = useState(isSignedIn ? user.telephone : "");
  const [marque, setMarque] = useState("ktm");
  const [type, setType] = useState("2roues");
  const [noChassi, setNoChassi] = useState("");
  const [editable, setEditable] = useState(true);
  const [postResult, setPostResult] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleBuy = () => {
    setEditable(false);
    try {
      setIsVisible(true);
      buyVignetteMutation({
        name,
        surname,
        phone,
        type,
        marque,
        noChassi,
        puissance: puissance.id_puissance,
        id: user.id_user,
      }).then((res) => {
        console.log("reponse:", res.data);
        setPostResult(fortmatResponse(res.data));
      });
    } catch (err) {
      setIsVisible(true);
      setPostResult(fortmatResponse(err));
    } finally {
      setEditable(true);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../../../assets/icon/bg-buy.png")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Tarif item={puissance} navigation={navigation}  />
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
                <ActivityIndicator size="large" />
              ) : (
                <Text style={styles.btnLabel}>Acheter</Text>
              )}
            </TouchableOpacity>
          </View>
        </BlurView>

        {postResult && isVisible && (
          <Toast setIsVisible={setIsVisible}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {isError ? (
                <>
                <AntDesign name="exclamationcircleo" size={800} color="red" />
                <Text> Une Erreur est Survenue. Veuillez Reessayer ulterieurement</Text>
                </>
              ) : (
                <>
                  <AntDesign name="checkcircle" size={60} color="green" />
                  <Text>SUCCES</Text>
                </>
              )}

              <Text>{postResult}</Text>
            </ScrollView>
          </Toast>
        )}
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
