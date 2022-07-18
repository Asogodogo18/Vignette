import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Alert,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useVignette, vignetteRetrouve } from "../../services/query";
import { useAuthState } from "../../global";
import { SkypeIndicator } from "react-native-indicators";
import Toast from "react-native-toast-message";

import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
const { height, width } = Dimensions.get("screen");

const VignetteSelection = ({ setSelectedVignette, setModalVisible }) => {
  const { user } = useAuthState();

  const {
    status,
    data: vignettes,
    error,
    isFetching,
  } = useVignette(user.id_user);
  // const listVignette = vignettes.data.filter(
  //   (item) => item.statut_vol === true
  // );

  // console.log(
  //   "data :",
  //   vignettes.data.filter((item) => item.statut_vol === true).length
  // );

  const RenderVignette = ({ item }) => {
    // console.log("item :", item.id_engin);

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedVignette({ item, id_engin: item.id_engin }),
            setModalVisible(true);
        }}
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
  if (vignettes.data.filter((item) => item.statut_vol === true).length === 0) {
    return (
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          textAlign: "center",
          textTransform: "capitalize",
          marginTop: 220,
          color: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        Aucun engin declarée comme perte
      </Text>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingVertical: 10 }}
      data={vignettes.data.filter((item) => item.statut_vol === true)}
      renderItem={RenderVignette}
      keyExtractor={(item) => item.id_engin}
    />
  );
};
const VignetteRetrouve = ({ navigation }) => {
  const [selectedVignette, setSelectedVignette] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const handleConfirme = () => {
    vignetteRetrouve({ id_engin: selectedVignette.item.id_engin })
      .then((res) => {
        // console.log("reponse retrouve: ", res.data);
        if (res.data === "true") {
          Toast.show({
            type: "success",
            text1: "Vignette retrouve avec succes!",
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
  };
  if (selectedVignette) {
    {
      return (
        modalVisible && (
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: 20,
                color: "gray",
                fontWeight: "600",
                margin: 10,
                padding: 10,
                letterSpacing: 1.5,
              }}
            >
              Veuillez Confirme
            </Text>

            <Image
              source={require("../../../assets/icon/retrouver.png")}
              style={{ height: 150, width: 150 }}
              resizeMode="contain"
            />
            <Text
              style={{
                marginLeft: 15,
                fontSize: 20,
                fontWeight: "200",
                color: "black",
                textTransform: "capitalize",
                textAlign: "center",

                zIndex: 100,
              }}
            >
              {selectedVignette.item.prenom}
              {"    "}
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                {selectedVignette.item.nom}
                {"    "}
              </Text>
            </Text>
            <Text
              style={{
                marginTop: 20,
                textAlign: "center",
                fontSize: 15,
                color: "black",
                textTransform: "uppercase",
                fontWeight: "bold",
                zIndex: 100,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "200",
                  color: "black",
                  textTransform: "capitalize",
                  marginTop: 20,
                  zIndex: 100,
                }}
              >
                No Chassis :
              </Text>
              {"  "}
              {selectedVignette.item.num_chassis}
            </Text>
            {/* <View
              style={{
                flexDirection: "row", 
                // justifyContent: "space-between",
                flex: 1,
              }}
            >
              <View>
                <Text>Nom:</Text>
                <Text>{selectedVignette.item.nom}</Text>
              </View>
              <View>
                <Text>Prenom:</Text>
                <Text>{selectedVignette.item.prenom}</Text>
              </View>
            </View>
            <View>
              <Text>Numero Chassis</Text>
              <Text>{selectedVignette.item.num_chassis}</Text>
            </View> */}

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={styles.addWrapper}
                onPress={handleConfirme}
              >
                <AntDesign name="checkcircle" size={24} color="green" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addWrapper}
                onPress={() => {
                  setModalVisible(false), setSelectedVignette(null);
                }}
              >
                <Ionicons name="close-circle" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )
      );
    }
  }
  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../../../assets/bg1.png")}
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
          Vignette-Retrouves
        </Text>
        <Image
          source={require("../../../assets/icon/vignetteRetrouve.png")}
          style={{ height: 40, width: 40, marginTop: 5 }}
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
        Veuillez choisir la vignette Retrouve
      </Text>

      <VignetteSelection
        setSelectedVignette={setSelectedVignette}
        setModalVisible={setModalVisible}
      />
    </ImageBackground>
  );
};

export default VignetteRetrouve;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    right: 0,
    left: 0,
    top: 170,
  },
  addWrapper: {
    width: width - 250,
    height: 60,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 0.5,
    elevation: 5,
    alignSelf: "center",
    margin: 10,
  },
});
