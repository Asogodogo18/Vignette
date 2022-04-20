import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const baseUrl = "http://192.168.1.44/vignettes/detail";
const AnimatedTouch = Animatable.createAnimatableComponent(TouchableOpacity);
const AnimatedImg = Animatable.createAnimatableComponent(ImageBackground);
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Index = ({ navigation }) => {
  const finderWidth = 280;
  const finderHeight = 630;

  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;

  const [IsLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [scanned, setScanned] = useState(false);

  async function VerifyData(data) {
    console.log(data);
    try {
      setIsLoading(true);
      axios
        .post(baseUrl,{id_user:data})
        .then((res) => {
          console.log(res.data);
          setScannedData(res.data);
          setScanned(true);
        })
        .catch((error) => setError(error.toString()));
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data, bounds: { origin } = {} }) => {
    setScanned(true);
    VerifyData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const renderItem = ({ item }) => {
    return (
      <AnimatedImg
        resizeMode="cover"
        source={require("../../../assets/bg.png")}
        animation="slideInRight"
        style={styles.vignette}
        // onPress={() => setVignette(item)}
        duration={1000}
        delay={parseInt(item.id) * 500}
      >
        <Text
          style={{
            marginLeft: 15,
            fontSize: 25,
            fontWeight: "200",
            color: "white",
            textTransform: "capitalize",
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
          </Text>
        </Text>
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
              Marque
            </Text>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 18,
                color: "white",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.marque}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "200",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              utilisation
            </Text>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 18,
                color: "white",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.utilisation}
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
                fontSize: 18,
                color: "white",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.type}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "200",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              Montant
            </Text>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 18,
                color: "white",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.montant}
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 5,
            textAlign: "center",
            fontSize: 18,
            color: "white",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {item.num_chassis}
        </Text>
      </AnimatedImg>
    );
  };

  return (
    <View style={styles.contain}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-undo-circle-sharp" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.txt}>Scan</Text>
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <BarcodeMask edgeColor="#62B1F6" showAnimatedLine />
      </BarCodeScanner>
      {IsLoading && (
        <BlurView intensity={50} style={styles.barcodeBox}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              En cours de vérification..
            </Text>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        </BlurView>
      )}
      {scannedData && (
        <BlurView tint="dark" intensity={10} style={styles.barcodeBox}>
          <FlatList
            contentContainerStyle={{
              backgroundColor: "transparent",
              paddingTop: height / 3,
            }}
            data={scannedData.map((item, index) => {
              item.id = index + 1;
              return item;
            })}
            renderItem={renderItem}
            keyExtractor={(item) => item.id_engin}
          />
        </BlurView>
      )}

      {scanned && (
        <TouchableOpacity
          title={"Appuyer pour Scanner"}
          onPress={() => {
            setScanned(false);
            setError(null);
            setScannedData(null);
          }}
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: 5,
            width: "60%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: "black",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Appuyer pour Scanner
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  barcodeBox: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    alignSelf: "center",
    width,
    height: height - 100,
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
  vignette: {
    maxHeight: 350,
    minHeight: 200,
    width: width - 50,
    backgroundColor: "white",
    marginVertical: 20,
    padding: 15,
    elevation: 10,
  },
});
export default Index;
