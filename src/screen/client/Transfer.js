import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import useTransfert from "../../global/transfertContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Data from "../../data/transfert";
import RenderTransfert from "../../components/transfert/renderTransfert";
const { width, height } = Dimensions.get("screen");
const Transfer = ({ navigation }) => {
  const {
    statut,
    etat,
    detail,
    initTransfert,
    confirmTranfert,
    rejectTranfert,
  } = useTransfert();

  return (
    <View style={styles.contain}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Initialisaton")}
        style={styles.btn}
      >
        <MaterialCommunityIcons
          name="transit-transfer"
          size={27}
          color="white"
        />
        <Text style={styles.txt}>Initié une Transfert</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <FlatList
          data={Data["transfert"]}
          renderItem={({ item }) => (
            <RenderTransfert item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{}}
        />
      </View>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  btn: {
    height: 50,
    width: 210,
    margin: 10,
    padding: 10,
    alignSelf: "flex-end",
    backgroundColor: "green",
    elevation: 5,
    borderRadius: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  txt: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginLeft: 5,
  },
});
