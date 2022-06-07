import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
const { height, width } = Dimensions.get("screen");
const Index = ({ navigation }) => {
  return (
    <View style={styles.contain}>
      <View style={styles.section1}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.img}
          resizeMode="contain"
        />
      </View>
      <View style={styles.section2}>
        <TouchableOpacity style={styles.touch}>
          <Text style={styles.txt}>Sé connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch}>
          <Text style={styles.txt}>Accueil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "white",
  },
  section1: {
    flex: 2,
    height: 150,
    width: width,
  },
  section2: {
    flex: 3,
    backgroundColor: "red",
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 150,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  img: {
    height: 270,
    width: "100%",
    alignSelf: "center",
  },
});
