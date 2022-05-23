import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
  SafeAreaView,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import * as Animatable from "react-native-animatable";
import Checkbox from "expo-checkbox";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
const AnimatedImg = Animatable.createAnimatableComponent(ImageBackground);
const AnimatedPressable = Animatable.createAnimatableComponent(Pressable);

const { width, height } = Dimensions.get("screen");

const Index = ({ navigation, route }) => {
  console.log("payment");
  const { item } = route.params;
  const [isXaalisi, setIsXaalisi] = useState(false);
  const [isOrange, setIsOrange] = useState(false);
  const [isBank, setIsBank] = useState(false);
  const [fulName, setFulName] = useState(false);
  const [date, setDate] = useState(false);
  const [numero, setNumero] = useState(false);
  const [numeroOrg, setNumeroOrg] = useState(false);
  const [cv, setCv] = useState(false);

  const [scrollRef, setScrollRef] = useState(null);

  return (
    <SafeAreaView style={styles.contain}>
      <View
        style={{
          position: "absolute",
          zIndex: 5,
          top: 0,
          left: 0,
          right: 0,
          width: width,
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flex: 1 }}
          >
            <Ionicons name="arrow-undo-circle-sharp" size={40} color="white" />
          </TouchableOpacity>
          <Text style={styles.txtHeader}>Payment Vignette</Text>
          <Animatable.Image
            animation="fadeIn"
            duration={300}
            delay={500}
            source={require("../../../../assets/icon/logobko.png")}
            style={styles.img}
          />
        </View>
      </View>
      <ScrollView
        ref={(ref) => setScrollRef(ref)}
        scrollToOverflowEnabled="true"
        style={{ flexGrow: 1 }}
      >
        <AnimatedImg
          resizeMode="cover"
          source={require("../../../../assets/bg.png")}
          animation="fadeInRight"
          style={styles.vignette}
          duration={1000}
          delay={parseInt(item.id) * 500}
        >
          <Text
            style={{
              marginLeft: 15,
              fontSize: 25,
              fontWeight: "400",
              color: "white",
              textTransform: "capitalize",
              textAlign: "center",

              zIndex: 100,
            }}
          >
            {item.prenom}
            {"    "}
            <Text
              style={{
                fontSize: 25,
                color: "white",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              {item.nom}
              {"    "}
            </Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "200",
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                Marque
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 15,
                  color: "white",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.marque}
                {"    "}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "200",
                  color: "white",
                  textTransform: "capitalize",
                  marginLeft: 40,
                }}
              >
                utilisation
              </Text>
              <Text
                style={{
                  marginLeft: 50,
                  fontSize: 15,
                  color: "white",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.utilisation}
                {"    "}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "200",
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                Type
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 15,
                  color: "white",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.type}
                {"    "}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "200",
                  color: "white",
                  textTransform: "capitalize",
                  marginLeft: 40,
                }}
              >
                Montant
              </Text>
              <Text
                style={{
                  marginLeft: 50,
                  fontSize: 15,
                  color: "white",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.montant}
                {"    "}
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginTop: 20,
              textAlign: "center",
              fontSize: 15,
              color: "white",
              textTransform: "uppercase",
              fontWeight: "bold",
              zIndex: 100,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "200",
                color: "white",
                textTransform: "capitalize",
                marginTop: 20,
                zIndex: 100,
              }}
            >
              No Chassis :
            </Text>
            {"  "}
            {item.num_chassis}
          </Text>
        </AnimatedImg>
        <View style={styles.section}>
          <Text style={styles.txt}>Mode de Payment</Text>
        </View>
        {!isBank && !isOrange && !isOrange ? (
          <AnimatedPressable
            animation={isBank ? "fadeOutLeft" : null}
            duration={300}
            delay={300}
            style={{
              flexDirection: "row",
              marginLeft: 10,
              alignItems: "center",
              // justifyContent: "flex-start",
            }}
            onPress={() => setIsXaalisi(!isXaalisi)}
          >
            <Checkbox
              style={[styles.checkbox, { flex: 0 }]}
              value={isXaalisi}
              onValueChange={setIsXaalisi}
            />
            <View style={{ flex: 6 }}>
              <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "600" }}>
                Xaliisi
              </Text>
              <Text style={{ marginLeft: 15, fontSize: 14, fontWeight: "400" }}>
                Payé par votre compte Xaalisi de Cirtic
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 4,
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 10,
                margin: 5,
                padding: 5,
              }}
            >
              <Image
                source={require("../../../../assets/icon/xaalisi.png")}
                style={{ height: 80, width: 80 }}
                resizeMode="contain"
              />
            </View>
          </AnimatedPressable>
        ) : null}
        {isXaalisi && isXaalisi ? (
          <Animatable.View
            style={{ backgroundColor: "blue", height: 200, width }}
            animation="fadeInUp"
            duration={300}
            delay={300}
          ></Animatable.View>
        ) : null}

        {!isBank && !isXaalisi ? (
          <AnimatedPressable
            animation={isBank ? "fadeOutLeft" : null}
            duration={300}
            delay={300}
            style={{
              flexDirection: "row",
              marginLeft: 10,
              alignItems: "center",
              // justifyContent: "flex-start",
            }}
            onPress={() => setIsOrange(!isOrange)}
          >
            <Checkbox
              style={[styles.checkbox, { flex: 0 }]}
              value={isOrange}
              onValueChange={setIsOrange}
            />
            <View style={{ flex: 6 }}>
              <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "600" }}>
                OrangeMoney
              </Text>
              <Text style={{ marginLeft: 15, fontSize: 14, fontWeight: "400" }}>
                Payé par votre compte OrangeMoney
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 4,
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 10,
                margin: 5,
                padding: 5,
              }}
            >
              <Image
                source={require("../../../../assets/icon/orange.png")}
                style={{ height: 80, width: 80 }}
                resizeMode="contain"
              />
            </View>
          </AnimatedPressable>
        ) : null}
        {isOrange && isOrange ? (
          <Animatable.View
            style={{ height: 200, width }}
            animation="fadeInUp"
            duration={300}
            delay={300}
          >
            <View style={{ alignSelf: "center" }}>
              <TextInput
                style={styles.input}
                onChangeText={setNumeroOrg}
                value={numeroOrg}
                placeholder="Numero de Votre compte OrangeMoney"
                keyboardType="number-pad"
              />
            </View>
          </Animatable.View>
        ) : null}

        {!isXaalisi && !isOrange ? (
          <AnimatedPressable
            animation={isXaalisi ? "fadeOutLeft" : null}
            duration={300}
            delay={300}
            style={{
              flexDirection: "row",
              marginLeft: 10,
              alignItems: "center",
              // justifyContent: "flex-start",
            }}
            onPress={() => {
              setIsBank(!isBank);

              if (!isBank) {
                setTimeout(() => {
                  console.log("fired");
                  scrollRef.scrollToEnd({ animated: true });
                }, 10);
              }
            }}
          >
            <Checkbox
              style={[styles.checkbox, { flex: 0 }]}
              value={isBank}
              onValueChange={setIsBank}
            />
            <View style={{ flex: 6 }}>
              <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "600" }}>
                Carte Bancaire
              </Text>
              <Text style={{ marginLeft: 15, fontSize: 14, fontWeight: "400" }}>
                Payé par votre compte Compte Bancaire
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 4,
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 10,
                margin: 5,
                padding: 5,
              }}
            >
              <Image
                source={require("../../../../assets/icon/carte.png")}
                style={{ height: 80, width: 80 }}
                resizeMode="contain"
              />
            </View>
          </AnimatedPressable>
        ) : null}
        {isBank && isBank ? (
          <Animatable.View
            style={{ width }}
            animation="fadeInUp"
            duration={300}
            delay={300}
          >
            <View style={{ alignSelf: "center" }}>
              <TextInput
                style={styles.input}
                onChangeText={setFulName}
                value={fulName}
                placeholder="Nom Complete"
              />
              <TextInput
                style={styles.input}
                onChangeText={setNumero}
                value={numero}
                placeholder="Numero de Votre Carte"
                keyboardType="number-pad"
              />
              <TextInput
                style={styles.input}
                onChangeText={setDate}
                value={date}
                placeholder="Date D'expiration"
                keyboardType="decimal-pad"
              />
              <TextInput
                style={styles.input}
                onChangeText={setCv}
                value={cv}
                placeholder="C.V.V de votre Carte"
                secureTextEntry
              />
            </View>
          </Animatable.View>
        ) : null}

        {isXaalisi || isBank || isOrange ? (
          <TouchableOpacity style={styles.boutton}>
            <AntDesign name="checkcircle" size={30} color="#99D98c" />
            <Text style={styles.txtValider}>Valider</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  checkbox: { justifyContent: "center" },
  header: {
    backgroundColor: "#1a1818",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 80,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  img: {
    height: 70,
    width: 70,
    resizeMode: "contain",
    marginTop: 5,
  },
  txtHeader: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginRight: 20,
    flex: 2,
  },
  boutton: {
    width: width - 170,
    backgroundColor: "#1a1818",
    borderColor: "white",
    borderWidth: 0.5,
    //opacity: 0.8,
    height: 50,
    borderRadius: 5,

    elevation: 2,
    marginTop: 3,

    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  vignette: {
    // height: 180,
    backgroundColor: "white",
    marginHorizontal: 0,
    marginTop: 90,
    padding: 15,
    elevation: 10,
    minWidth: 280,
    maxWidth: 390,
    borderRadius: 5,
    overflow: "hidden",
    minHeight: 120,
    maxHeight: 200,
    flex: 1,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  txt: {
    fontSize: 18,
    fontWeight: "700",
  },
  txtValider: {
    fontSize: 18,
    fontWeight: "700",
    color: "#99D98c",
  },
  input: {
    height: 45,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 8,
    fontWeight: "bold",

    width: 290,
  },
});
