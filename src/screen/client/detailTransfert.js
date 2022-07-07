import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useAuthState } from "../../global";
import { valideTransferts, getVignetteByChassis } from "../../services/query";
import Toast from "react-native-toast-message";
const { height, width } = Dimensions.get("screen");
const isTablet = width > 360;
const DetailTransfert = ({ route, navigation }) => {
  const { user } = useAuthState();
  const condition = user.role === "Superviseur" || user.role == "Compta public";
  const { item } = route.params;
  // console.log("item :", item);
  const [modalVisible, setModalVisible] = useState(false);
  const [numChassis2, setNumChassis2] = useState("");

  const handleValide = () => {
    const { id_transfert, nouveau, id_engin } = item;
    const data = {
      id_transfert,
      id_user: nouveau,
      id_engin,
    };
    if (item.num_chassis === numChassis2) {
      valideTransferts(data)
        .then((res) => {
          console.log("validation", res);
          if (res.data === "true") {
            Toast.show({
              type: "success",
              text1: "Transfert Valide avec succes!",
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
        .catch((e) => {
          console.log("error", e);
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, Veuillez ressayer!",
            text2: e.toString(),
          });
        });
    } else {
      Toast.show({
        type: "error",
        text1: "le numero de chassis ne correspond pas, \nVeuillez ressayer!",
      });
    }
  };
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
          // marginBottom: 15,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

      <View activeOpacity={0.8} style={[styles.Card]}>
        <Animatable.View
          duration={300}
          delay={300}
          animation="bounceInLeft"
          style={{
            // flex: 1,
            height: 50,
            width: 50,
            backgroundColor: "green",
            borderRadius: 70,
            marginTop: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/icon/transfert.png")}
            style={{
              height: 35,
              width: 35,
            }}
            resizeMode="contain"
          />
        </Animatable.View>
        <View style={styles.vignette}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "300",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Nom
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.nom}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "300",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Prénom
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.prenom}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "300",
                color: "black",
                textTransform: "capitalize",
                marginLeft: -30,
              }}
            >
              Telephone
            </Text>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 18,
                color: "black",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.telephone}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 0,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1, marginLeft: 20, marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "300",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Numero Chassi
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.num_chassis}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 0,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1, marginLeft: 20, marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "300",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                date du transfert
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.date_transfert}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, { backgroundColor: "black" }]}
        >
          <Text style={styles.btnLabel}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={[styles.button, { backgroundColor: "green" }]}
        >
          <Text style={styles.btnLabel}>Valider</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.modalText}>
              Veuillez confirme a nouveau la Mutation du Vignette en saisisant
              le numero du chassis
            </Text>
            <TextInput
              placeholder="Numero du chassis"
              style={styles.input}
              onChangeText={(text) => setNumChassis2(text)}
              value={numChassis2}
            />
            <TouchableOpacity onPress={handleValide} style={styles.touch}>
              <Text style={styles.txtTouch}>confirme</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default DetailTransfert;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  vignette: {
    marginVertical: 5,
    padding: 5,
    flex: 8,
  },
  //
  Card: {
    flex: 1,
    margin: 10,
    padding: 5,
    flexDirection: "row",
    maxHeight: 180,
    minHeight: 150,
    width: width - 20,
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 110,
  },
  CardT: {
    margin: 10,
    padding: 5,
    flexDirection: "row",
    maxHeight: 220,
    minHeight: 190,
    width: width - 20,
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: isTablet ? 240 : width - 210,
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
  txt: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
    marginBottom: 5,
    marginLeft: 40,
  },
  text: {
    fontWeight: "900",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width - 50,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 15,
    fontWeight: "600",
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
  touch: {
    height: 50,
    width: 100,
    backgroundColor: "green",
    padding: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  txtTouch: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
  buttonClose: {
    position: "relative",
    right: 0,
    top: 0,
    left: 110,
    margin: 10,
    height: 40,
    width: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 5,
  },
});
