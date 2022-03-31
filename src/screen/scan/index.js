import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Index = ({ navigation }) => {
  return (
    <View style={styles.contain}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-undo-circle-sharp" size={40} color="white" />
        </TouchableOpacity>

        <Text style={styles.txt}>Scan</Text>
      </View>
      <Text>Index</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    backgroundColor: "#1a1818",
    // justifyContent: "space-evenly",
    flexDirection: "row",
    height: 70,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  txt: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    marginLeft: 120,
  },
});
export default Index;
