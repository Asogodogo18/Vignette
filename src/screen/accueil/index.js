import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import React from "react";
import { useAuthState } from "../../global";
import { useAuthDispatch, logout } from "../../global";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Button, Portal, Divider, Provider, Modal } from "react-native-paper";

import Header from "../../components/header";
import ClientHome from "../../components/client/ClientHome";
import VerifHome from "../../components/client/VerifHome";
import AgentHome from "../../components/client/AgentHome";
import OfficerHome from "../../components/client/OfficerHome";

const { height, width } = Dimensions.get("screen");

const Index = ({ navigation }) => {
  const { user } = useAuthState();
  // const dispatch = useAuthDispatch();
  // const [visible, setVisible] = React.useState(false);
  const condition =
    user.role === "Verificateur" ||
    user.role === "Maire" ||
    user.role === "Maire adjoint";
  const conditionClient = user.role === "Client" || user.role === "Anonyme";

  return (
    <SafeAreaView style={styles.contain}>
      <Header navigation={navigation} />

      <StatusBar hidden />
      {user.role === "Agent" && <AgentHome navigation={navigation} />}
      {user.role === "Police" && <OfficerHome navigation={navigation} />}
      {condition && <VerifHome />}
      {conditionClient && <ClientHome navigation={navigation} />}

      <Footer />
    </SafeAreaView>
  );
};

const Footer = () => {
  return (
    <Animatable.View
      animation="fadeIn"
      duration={300}
      delay={500}
      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
        height: 15,
        width: width,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        alignSelf: "center",
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        elevation: 5,
      }}
    >
      <Text
        style={{
          fontSize: 10,
          fontWeight: "bold",
          color: "gray",
          textTransform: "uppercase",
          textShadowColor: "black",
          textAlign: "center",
        }}
      >
        Cr??er par CIRTIC
      </Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    height: height / 5,
    justifyContent: "center",
    alignItems: "center",
    width: width - 100,
    alignSelf: "center",
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
export default Index;
