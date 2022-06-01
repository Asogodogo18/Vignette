import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
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
  console.log("data : ", Data);
  return (
    <View style={styles.contain}>
      {Data.length == 0 && (
        <ScrollView style={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={require("../../../assets/icon/transfert.png")}
            />
            <View style={{ padding: 5, alignItems: "center", marginTop: 20 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Vous n'avez pas encore de transfert en cours
              </Text>
            </View>

            <View style={{ padding: 10, margin: 5 }}>
              <Text>
                Lorsque vous effectuer une Vente vous devriez intitie un
                Transfert
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 15, alignSelf: "center" }}>
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
          </View>
        </ScrollView>
      )}

      {Data.length == 0 ? null : (
        <View style={{ flex: 1 }}>
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
          <FlatList
            data={Data}
            renderItem={({ item }) => (
              <RenderTransfert item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{}}
          />
        </View>
      )}
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
  image: {
    height: 250,

    marginTop: 100,
    width: 250,
    marginLeft: 0,
    alignSelf: "center",
  },
});
