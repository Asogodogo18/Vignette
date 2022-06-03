import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {} from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
const { height, width } = Dimensions.get("screen");

const renderValidation = ({ item, navigation }) => {
  const { ancien, nouveau } = item;
  const [showBox, setShowBox] = useState(true);

  const showConfirmDialog = () => {
    return Alert.alert(
      "Êtes-vous sûr?",
      "Êtes-vous sûr de vouloir Confirme cette Transfert ?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };
  return (
    <View style={styles.contain}>
      <TouchableOpacity
        onPress={() => showConfirmDialog()}
        activeOpacity={0.8}
        style={[styles.Card]}
      >
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
        <Animatable.View
          duration={300}
          delay={300}
          animation="bounceInLeft"
          style={styles.container}
        >
          <View style={styles.section1}>
            <Text>Ancien Propritaire</Text>
            <Text>{ancien.nom}</Text>
          </View>
          <View style={styles.section2}>
            <Text>nouveau Propritaire</Text>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
};

export default renderValidation;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },

  //
  container: {
    flexDirection: "row",
  },
  section1: {
    flex: 1,
    backgroundColor: "red",
    height: 220,
  },
  section2: {
    flex: 1,
    backgroundColor: "yellow",
  },
  //
  Card: {
    flex: 1,
    margin: 10,
    padding: 5,

    maxHeight: 350,
    minHeight: 250,
    width: width - 15,
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,

    alignItems: "center",
    marginVertical: 8,
  },
});
