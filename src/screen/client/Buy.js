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
  Image,
} from "react-native";
import { SkypeIndicator } from "react-native-indicators";
import React, { useState } from "react";
import { useAuthState } from "../../global";
import Tarif from "../../components/shared/Tarif";
import { Picker } from "@react-native-picker/picker";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useQueryClient } from "react-query";
import {
  buyVignetteMutation,
  getVignetteByChassis,
} from "../../services/query";
import * as ImagePicker from "expo-image-picker";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("screen");

const Buy = ({ navigation, route }) => {
  const queryClient = useQueryClient();
  const { user, isSignedIn } = useAuthState();
  const condition = isSignedIn && user.role === "Client";
  const { puissance } = route.params;
  const [idpic, setIdpic] = useState([]);
  const [certPick, setCertPick] = useState([]);
  const [name, setName] = useState(condition ? user.nom : "");
  const [surname, setSurname] = useState(condition ? user.prenom : "");
  const [phone, setPhone] = useState(condition ? user.telephone : "");
  const [marque, setMarque] = useState("ktm");
  const [type, setType] = useState("2roues");
  const [noChassi, setNoChassi] = useState("");
  const [editable, setEditable] = useState(true);
  const [postResult, setPostResult] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [queriedID, setQueriedID] = useState(null);
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
        console.log("debut du requete", res);
        if (res.data === "true") {
          Toast.show({
            type: "success",
            text1: "Votre vignette a ete enregistrer!",
          });
          queryClient.invalidateQueries("vignettes");
          if (user.role === "Agent") {
            getVignetteByChassis(noChassi)
              .then((res) => {
                console.log("vignetteId: ", res);
                if (res.data.length > 0 && res.data != "False") {
                  const vignette = res.data[0];
                  navigation.navigate("Payment", {
                    item: vignette,
                    id_user: user.id_user,
                  });
                }
                //
              })
              .catch((e) => {
                console.log("error :", e);
              });
          } else navigation.goBack();
        } else {
          setEditable(true);
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, \nVeuillez ressayer!",
          });
        }
      })
      .catch((e) => {
        console.log("error", e);
        setEditable(true);
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue, Veuillez ressayer!",
          text2: e.toString(),
        });
      });
  };

  const pickImage = async (index) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 13],
      quality: 1,
    });

    if (!result.cancelled) {
      switch (index) {
        case 1:
          setIdpic([result.uri]);
          console.log(idpic);
          break;
        case 2:
          setCertPick([result.uri]);
          console.log(certPick);
          break;
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../../../assets/icon/bg-buy.png")}
        resizeMode="cover"
        style={{
          marginTop: 10,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tarif item={puissance} navigation={navigation} />
        <BlurView tint="light" intensity={100} style={styles.inputBox}>
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
              borderRadius: 8,
              width: 250,
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
              borderRadius: 8,
              width: 250,
              height: 40,
              margin: 10,
            }}
          >
            <Picker
              style={{
                marginTop: -10,
              }}
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.label}> Pièce d'identité</Text>
              {idpic.length === 0 && (
                <TouchableOpacity
                  style={styles.quickselect}
                  onPress={() => pickImage(1)}
                >
                  <MaterialIcons
                    name="add-photo-alternate"
                    size={40}
                    color="black"
                  />
                  <Text style={styles.label}>
                    Veuillez ajouter la photo de votre Pièce d'identité
                  </Text>
                </TouchableOpacity>
              )}
              {idpic.map((image, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => pickImage(1)}
                    style={styles.photo}
                    key={`id-{index}`}
                  >
                    <Image
                      source={{ uri: image }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}> Facture d'Achat</Text>
              {certPick.length === 0 && (
                <TouchableOpacity
                  style={styles.quickselect}
                  onPress={() => pickImage(2)}
                >
                  <MaterialIcons
                    name="add-photo-alternate"
                    size={40}
                    color="black"
                  />
                  <Text style={styles.label}>
                    Veuillez ajouter la photo du document d'achat de l'engin
                  </Text>
                </TouchableOpacity>
              )}
              {certPick.map((image, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => pickImage(2)}
                    style={styles.photo}
                    key={`id-{index}`}
                  >
                    <Image
                      source={{ uri: image }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </BlurView>
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
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    borderRadius: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 8,
    fontWeight: "bold",

    width: 250,
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
  quickselect: {
    // flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "beige",
    elevation: 5,
    borderRadius: 5,
    minHeight: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  photo: {
    width: 110,
    height: 120,
    marginTop: 10,
    elevation: 20,
    borderRadius: 10,
    alignSelf: "center",
    //overflow: "hidden",
    //alignContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
