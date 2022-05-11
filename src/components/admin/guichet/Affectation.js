import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import {
  affectAgent,
  getAgentbyGuichet,
  useUsers,
  unaffectAgent,
} from "../../../services/query";
import Toast from "react-native-toast-message";

import Agent from "../../shared/Agent";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
const { width, height } = Dimensions.get("screen");

const Affectation = ({ item, setCurrentLoader, currentLoader }) => {
  const {
    data: userData,
    error: userError,
    isFetching: isFetchingUsers,
  } = useUsers();

  const [agentToAffect, setagentToAffect] = useState([]);
  const [agentToUnaffect, setagentToUnaffect] = useState([]);
  const [affectedAgent, setaffectedAgent] = useState([]);
  console.log("affected:", affectedAgent);

  useEffect(() => {
    getAgentbyGuichet(item.id_guichet)
      .then((res) => {
        console.log(res);
        if (res.data != "False") {
          // res.data.map((item) => {
          //   setaffectedAgent([...affectedAgent, item.id_user]);
          // });
        }
      })
      .catch((e) => {
        console.log("error affectation:", e);
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue, Veuillez ressayer!",
          text2: e.toString(),
        });
      });

    return () => {};
  }, []);

  const handleUnaffect = () => {
    if (agentToUnaffect.length > 0) {
      agentToUnaffect.forEach((el) => {
        unaffectAgent({ id: item.id_guichet, user_id: el })
          .then((res) => {
            if (res.data == "true") {
              Toast.show({
                type: "success",
                text1: "Affectation d'agent resilie avec success!",
              });
              setCurrentLoader(null);
            } else {
              Toast.show({
                type: "error",
                text1: "Une erreur est survenue, \nVeuillez ressayer!",
              });
            }
          })
          .catch((e) => {
            Toast.show({
              type: "error",
              text1: "Une erreur est survenue, Veuillez ressayer!",
              text2: e.toString(),
            });
          });
      });
    }
  };
  const handleAffect = () => {
    if (agentToAffect.length > 0) {
      agentToAffect.forEach((el) => {
        affectAgent({ id: item.id_guichet, user_id: el })
          .then((res) => {
            if (res.data == "true") {
              Toast.show({
                type: "success",
                text1: "Agent affecte avec success!",
              });
              setCurrentLoader(null);
            } else {
              Toast.show({
                type: "error",
                text1: "Une erreur est survenue, \nVeuillez ressayer!",
              });
            }
          })
          .catch((e) => {
            Toast.show({
              type: "error",
              text1: "Une erreur est survenue, Veuillez ressayer!",
              text2: e.toString(),
            });
          });
      });
    }
  };
  const handlePress = () => {
    handleAffect();
    handleUnaffect();
  };
  return (
    <SafeAreaView>
      <Animatable.View animation="fadeIn">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              height: 80,
              backgroundColor: "#1a1818",
              flexDirection: "row",
              elevation: 5,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 15,
            }}
          >
            <TouchableOpacity onPress={() => setCurrentLoader(null)}>
              <Ionicons name="ios-arrow-undo" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
              Affectation Du Guichet
            </Text>
            <TouchableOpacity onPress={() => setCurrentLoader(null)}>
              <Entypo name="cross" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ padding: 5, margin: 10, marginVertical: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Veuillez Affecter un Agent au Guichet
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "gray",
              height: 50,
              width: width - 10,
              alignSelf: "center",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>
              Agent
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>
              Action
            </Text>
          </View>
          {isFetchingUsers ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                paddingBottom: 50,
              }}
              data={userData.filter((user) => user.role === "Agent")}
              renderItem={({ item }) => (
                <Agent
                  affectedAgent={affectedAgent}
                  agentToAffect={agentToAffect}
                  setagentToAffect={setagentToAffect}
                  agentToUnaffect={agentToUnaffect}
                  setagentToUnaffect={setagentToUnaffect}
                  item={item}
                />
              )}
              keyExtractor={(item) => item.id_user}
            />
          )}

          <Divider
            style={{
              backgroundColor: "black",
              width: width - 110,
              alignSelf: "center",
              borderWidth: 0.2,
              marginTop: 25,
            }}
          />

          <View style={{ margin: 20, padding: 5, marginVertical: 50 }}>
            <TouchableOpacity onPress={handlePress} style={styles.touchAchat}>
              <MaterialCommunityIcons
                name="code-less-than-or-equal"
                size={24}
                color="white"
              />
              <Text style={styles.touchTxt}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default Affectation;

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
    elevation: 0,
    flexDirection: "row",
    marginRight: 5,
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
    color: "black",
    fontSize: 15,
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
