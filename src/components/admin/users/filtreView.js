import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import React from "react";
const { width, height } = Dimensions.get("screen");
import * as Animatable from "react-native-animatable";
import { BlurView } from "expo-blur";
const filtreView = ({ data }) => {
  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data.length == 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 36,
                fontWeight: "700",
                textAlign: "center",
                textTransform: "capitalize",
                justifyContent: "center",
              }}
            >
              {" "}
              Aucun résultat pour cette Utilisateur
            </Text>
          </View>
        )}
        {data.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setIsVisible(!isVisible)}
              style={styles.Card}
            >
              <Animatable.View
                duration={300}
                delay={300}
                animation="bounceInLeft"
                style={{
                  // flex: 1,
                  height: 50,
                  width: 50,
                  backgroundColor: "#99D98c",
                  borderRadius: 80,
                  marginTop: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../assets/icon/agent3.png")}
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
                style={styles.vignette}
              >
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
                        fontWeight: "200",
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
                        fontWeight: "200",
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
                    flexDirection: "row",
                    marginTop: 5,
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
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "200",
                        color: "black",
                        textTransform: "capitalize",
                      }}
                    >
                      Role
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
                      {item.role}
                    </Text>
                  </View>
                </View>
              </Animatable.View>
              {isVisible ? (
                <BlurView
                  intensity={50}
                  tint="dark"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 130,
                    width: width - 15,
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
                      onPress={() => handlePress("Modify", item)}
                      style={styles.btnBlur}
                    >
                      <FontAwesome name="edit" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(item.id_user)}
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
          );
        })}
      </View>
    </View>
  );
};

export default filtreView;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  touch: {
    height: 50,
    width: 110,
    maxWidth: 130,
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
  vignette: {
    marginVertical: 5,
    padding: 5,
    flex: 8,
  },
  section: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  Card: {
    flex: 1,
    margin: 5,
    padding: 5,
    flexDirection: "row",
    backgroundColor: "white",
    maxHeight: 250,
    minHeight: 100,
    width: width - 15,
    alignSelf: "center",
    elevation: 5,
    borderRadius: 10,
    justifyContent: "space-around",
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

    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 80,
  },
  CardDelete: {
    margin: 5,
    padding: 5,
    height: 120,
    width: width - 50,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
  },
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
  select: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontWeight: "bold",
  },
  chip: {
    flexDirection: "row",
    padding: 2,
    flexGrow: 1,
    height: 40,
    justifyContent: "center",
    margin: 10,
  },
  chipItem: {
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "black",
    marginHorizontal: 10,
    padding: 0,
    overflow: "hidden",
    minWidth: 100,
    maxWidth: 150,
    borderRadius: Platform.OS == "ios" ? 20 : 50,
    backgroundColor: "white",
  },
  checkbox: {
    // margin: 8,
    marginTop: 10,
    backgroundColor: "red",
  },
});
