import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Header from "../../components/header";
const { height, width } = Dimensions.get("screen");
const Index = ({ navigation }) => {
  return (
    <View style={styles.contain}>
      <Header />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate("Scan")}
        >
          <Text style={styles.txt}>Veuillez Scanner la le Code Q&R</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 2,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 4,
  },
  touch: {
    height: 50,
    width: width - 50,
    backgroundColor: "#1a1818",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  txt: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },
});
export default Index;
