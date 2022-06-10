import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { useAuthState } from "../../global";
const { height, width } = Dimensions.get("screen");
const DetailTransfert = ({ route, navigation }) => {
  const { user } = useAuthState();
  const condition = user.role === "Superviseur" || user.role == "Compta public";
  const { item } = route.params;
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
      {condition && (
        <View
          style={{
            margin: 5,
            padding: 10,
            flexDirection: "row",
            height: 50,
            minWidth: width - 50,
            maxWidth: width,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            elevation: 5,
            borderRadius: 10,
          }}
        >
          <Text style={styles.text}>Numero Chassi :</Text>
          <Text style={styles.text}>{item.numero}</Text>
        </View>
      )}
      {condition ? (
        <ScrollView>
          <View activeOpacity={0.8} style={[styles.CardT]}>
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
              <Text style={styles.txt}>Ancien Proprietaire</Text>
              <View
                style={{
                  flexDirection: "row",
                  // marginTop: 5,
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
                  marginBottom: 5,
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
                    Numero carte d'identite
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
                    {item.numero}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View activeOpacity={0.8} style={[styles.CardT]}>
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
              <Text style={styles.txt}>Nouveau Proprietaire</Text>
              <View
                style={{
                  flexDirection: "row",
                  // marginTop: 5,
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
                  marginBottom: 5,
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
                    Numero carte d'identite
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
                    {item.numero}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
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
                  Numero carte d'identite
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
                  {item.numero}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => {}}
          style={[styles.button, { backgroundColor: "black" }]}
        >
          <Text style={styles.btnLabel}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={[styles.button, { backgroundColor: "green" }]}
        >
          <Text style={styles.btnLabel}>Valider</Text>
        </TouchableOpacity>
      </View>
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
    width: width - 210,
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
});
