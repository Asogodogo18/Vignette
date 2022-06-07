import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Data from "../../../data/validation";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Transfer from "../../../screen/client/Transfer";

const Index = ({ navigation }) => {
  return (
    <View style={styles.contain}>
      <View
        style={{
          height: 80,
          backgroundColor: "#1a1818",
          flexDirection: "row",
          elevation: 5,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
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
          source={require("../../../../assets/icon/transfert.png")}
          style={{ height: 40, width: 40 }}
          resizeMode="cover"
        />
      </View>
      <Transfer navigation={navigation} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // justifyContent: "center",
    // alignContent: "center",
  },
});
