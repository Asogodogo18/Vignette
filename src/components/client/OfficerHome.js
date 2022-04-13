import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
  } from "react-native";
  import React from "react";
  
  import { FontAwesome, AntDesign } from "@expo/vector-icons";
  import * as Animatable from "react-native-animatable";
  const { height, width } = Dimensions.get("screen");
  
  
  const OfficerHome = ({navigation}) => {
    return (
      <Animatable.View
        animation="fadeIn"
        duration={300}
        delay={500}
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate("Scan")}
        >
          <AntDesign name="qrcode" size={30} color="white" />
          <Text style={styles.txt}>Veuillez Scanner la Code QR</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  };
  
  export default OfficerHome;
  
  const styles = StyleSheet.create({
      container: {
          justifyContent: "center",
          alignItems: "center",
          flex: 4,
        },
        touch: {
          height: 50,
          width: width - 50,
          backgroundColor: "#1a1818",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: 5,
          flexDirection: "row",
          paddingHorizontal: 25,
        },
      
        touch1: {
          height: 50,
          width: width - 150,
          backgroundColor: "red",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: 10,
          elevation: 5,
          flexDirection: "row",
        },
        txt: {
          color: "white",
          fontSize: 16,
          fontWeight: "800",
        },
  });
  