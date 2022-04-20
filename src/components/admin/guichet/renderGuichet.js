import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  Ionicons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import Checkbox from "expo-checkbox";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("screen");
const renderGuichet = ({ Visible, Checked, Delete }) => {
  const handlePress = (loader) => {
    setCurrentLoader(loader);
  };
  return (
    <View style={styles.contain}>
      {Delete ? (
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginTop: 25 }}>
            <Checkbox
              style={styles.checkbox}
              value={Checked}
              onValueChange={setChecked}
            />
          </View>

          <Animatable.View
            delay={200}
            duration={250}
            animation="bounceInLeft"
            style={styles.CardDelete}
          >
            <View
              style={{
                // flex: 2,
                height: 50,
                width: 50,
                backgroundColor: "#99D98c",
                borderRadius: 80,
                // marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../assets/icon/guichet.png")}
                style={{
                  height: 35,
                  width: 35,
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
                <View style={{ flex: 1 }}>
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
                    {item.numero}
                  </Text>
                </View>
                {Delete ? (
                  <TouchableOpacity style={styles.delete}>
                    <AntDesign name="delete" size={24} color="white" />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </Animatable.View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setIsVisible(!Visible)}
          style={styles.Card}
        >
          <View
            style={{
              flex: 2,
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
              source={require("../../../../assets/icon/guichet.png")}
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
              <View style={{ flex: 1 }}>
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
                  {item.numero}
                </Text>
              </View>
              {Delete ? (
                <TouchableOpacity style={styles.delete}>
                  <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          {Visible ? (
            <BlurView
              intensity={50}
              tint="dark"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                height: 90,
                width: width - 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  onPress={() => handlePress("Affectation")}
                  style={styles.btnBlur}
                >
                  <MaterialCommunityIcons
                    name="code-less-than-or-equal"
                    size={30}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePress("Modify")}
                  style={styles.btnBlur}
                >
                  <FontAwesome name="edit" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsDelete(!isDelete)}
                  style={styles.btnBlur}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={30}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </BlurView>
          ) : null}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default renderGuichet;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
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
    width: width - 15,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
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
  CardDelete: {
    margin: 5,
    padding: 5,
    height: 90,
    width: width - 50,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
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
