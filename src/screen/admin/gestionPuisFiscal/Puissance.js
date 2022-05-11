import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Platform,
  UIManager,
  Keyboard,
  ActivityIndicator,
  LayoutAnimation,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";
import {
  FontAwesome,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import GetRandomColor from "../../../Utils/getColor";
const { width, height } = Dimensions.get("screen");
const Puissance = ({ item, handlePress, handleDelete }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setIsVisible(!isVisible)}
      style={[
        styles.card,
        { backgroundColor: GetRandomColor(`${item.puissance}`) },
      ]}
    >
      <View
        style={{
          height: 60,
          width: 60,
          backgroundColor: "white",
          borderRadius: 40,
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../../assets/icon/puissance.png")}
          style={{
            height: 40,
            width: 40,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "200",
                color: "black",
                textTransform: "capitalize",
              }}
            >
              Puissance
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                color: "black",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.puissance.substring(0, 10).concat("...")}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                marginLeft: Platform.OS == "ios" ? -35 : -30,
                fontSize: 15,
                fontWeight: "200",
                color: "black",
                textTransform: "capitalize",
              }}
            >
              Usage
            </Text>
            <Text
              style={{
                marginLeft: Platform.OS == "ios" ? -30 : -20,
                fontSize: 18,
                color: "black",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.utilisation}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 25,
            alignContent: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginHorizontal: 0,
            marginRight: Platform.OS == "ios" ? 25 : 20,
          }}
        >
          <Text
            style={{
              marginRight: Platform.OS == "ios" ? -25 : 20,
              fontSize: 15,
              fontWeight: "200",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            Montant
          </Text>
          <Text
            style={{
              marginRight: 40,
              fontSize: 18,
              color: "black",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {item.montant} FCFA
          </Text>
        </View>
      </View>
      {isVisible ? (
        <BlurView
          intensity={150}
          tint="dark"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            height: 130,
            maxWidth: 250,
            minWidth: 350,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              onPress={() => handlePress("Modify", item)}
              style={styles.btnBlur}
            >
              <FontAwesome name="edit" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item.id_puissance)}
              style={styles.btnBlur}
            >
              <MaterialCommunityIcons name="delete" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </BlurView>
      ) : null}
    </TouchableOpacity>
  );
};

export default Puissance;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  touch: {
    height: 50,
    width: 120,
    maxWidth: 140,
    backgroundColor: "#99D98c",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: "row",
  },
  touchAchat: {
    height: 50,
    width: width - 100,
    backgroundColor: "#99D98c",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  touchTxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  section: {
    flex: 1,
  },
  card: {
    margin: 5,
    height: 130,
    maxWidth: 350,
    minWidth: 450,
    // elevation: 5,
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
    flexDirection: "row",
    // alignItems: "center",
    paddingHorizontal: 10,
  },
  btnBlur: {
    height: 55,
    width: 55,
    backgroundColor: "#99D98c",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  container: {
    flex: 1,
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
  select: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontWeight: "bold",
  },
});
