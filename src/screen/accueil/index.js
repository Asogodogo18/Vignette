import {
  ScrollView,
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
import { Button, Portal, Divider, Provider, Modal } from "react-native-paper";

import Header from "../../components/header";
import ClientHome from "../../components/client/ClientHome";
import VerifHome from "../../components/client/VerifHome";
import AgentHome from "../../components/client/AgentHome";
import OfficerHome from "../../components/client/OfficerHome"


const { height, width } = Dimensions.get("screen");

const Index = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.containerStyle}
        >
          <TouchableOpacity
            style={styles.touch1}
            onPress={() => navigation.replace("Connexion")}
          >
            <FontAwesome name="sign-out" size={24} color="white" />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "white",
                marginRight: 15,
              }}
            >
              Déconnexion
            </Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
      <ScrollView contentContainerStyle={styles.contain}>
        <StatusBar hidden />
        <Header setVisible={setVisible} />
<<<<<<< HEAD
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
          <Animatable.View
            animation="fadeIn"
            duration={300}
            delay={500}
            style={{
              position: "absolute",
              bottom: 0,
              // backgroundColor: "#1a1818",
              backgroundColor: "white",
              height: 50,
              width: width,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              alignSelf: "center",
              borderTopLeftRadius: 70,
              borderTopRightRadius: 70,
              elevation: 5,
              marginBottom: Platform.OS === "ios" ? 5 : 0,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "gray",
                textTransform: "uppercase",
                textShadowColor: "black",
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              Créer par CIRTIC
            </Text>
          </Animatable.View>
        </Animatable.View>
      </View>
=======
        <ClientHome navigation={navigation} />
        {/* <OfficerHome navigation={navigation} /> */}
        {/* <AgentHome navigation={navigation} /> */}
       <Footer/>
      </ScrollView>
>>>>>>> client
    </Provider>
  );
};


const Footer = ()=>{
  return (
    <Animatable.View
    animation="fadeIn"
    duration={300}
    delay={500}
    style={{
      position: "absolute",
      bottom: 0,
      // backgroundColor: "#1a1818",
      height: 50,
      width: width - 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
    }}
  >
    <Text
      style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "gray",
        textTransform: "uppercase",
        textShadowColor: "black",
      }}
    >
      Créer par CIRTIC
    </Text>
  </Animatable.View>
  )
}

const styles = StyleSheet.create({
  contain: {
    flexGrow: 1,
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
