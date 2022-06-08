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
  const [image, setImage] = useState([]);
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
                  const { id_engin } = res.data[0];
                  navigation.navigate("Adminstack", {
                    screen: "Payment",
                    params: { id_engin },
                  });
                }
                //
              })
              .catch((e) => {
                console.log("erro :", e);
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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../../../assets/icon/bg-buy.png")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Tarif item={puissance} navigation={navigation} />
        <BlurView intensity={90} style={styles.inputBox}>
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
    width: 200,
  },
  label: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
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
});
