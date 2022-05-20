import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { BlurView } from "expo-blur";
const { width, height } = Dimensions.get("screen");

const Guichet = ({
  item,
  isDelete,
  handlePress,
  handleDelete,
  elementsToDelete,
  setElementsToDelete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const onChecked = (value) => {
    setChecked(value);
    if (value) {
      setElementsToDelete([...elementsToDelete, item.id_guichet]);
    } else if (!value) {
      setElementsToDelete(
        elementsToDelete.filter((id) => id != item.id_guichet)
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {isDelete ? (
        <View style={{ marginTop: 25 }}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={(value) => onChecked(value)}
          />
        </View>
      ) : null}

      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        style={styles.Card}
        activeOpacity={0.8}
      >
        <View
          style={{
            height: 70,
            width: 70,
            backgroundColor: "#99D98c",
            borderRadius: 80,
            // marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/icon/guichet.png")}
            style={{
              height: 40,
              width: 40,
            }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.vignette}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 5 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "200",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Numero du guichet
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 18,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.num_guichet}
              </Text>
            </View>
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
              height: 90,
              width: width - 19,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={() => handlePress("Affectation", item)}
                style={styles.btnBlur}
              >
                <MaterialCommunityIcons
                  name="code-less-than-or-equal"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress("Modify", item)}
                style={styles.btnBlur}
              >
                <FontAwesome name="edit" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.id_guichet)}
                style={styles.btnBlur}
              >
                <MaterialCommunityIcons name="delete" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </BlurView>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default Guichet;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  touch: {
    height: 50,
    width: 110,
    maxWidth: 120,
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
    paddingHorizontal: 60,
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
  vignette: {
    width: width - 90,
    padding: 10,

    marginBottom: 10,
  },
  section: {
    flex: 1,
  },
  Card: {
    margin: 5,
    padding: 5,
    height: 90,
    width: width - 19,
    elevation: 2,
    flexDirection: "row",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnBlur: {
    // flex: 2,
    height: 55,
    width: 55,
    backgroundColor: "#99D98c",
    borderRadius: 40,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  delete: {
    // flex: 2,
    height: 35,
    width: 35,
    backgroundColor: "red",
    borderRadius: 20,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 20,
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
});
