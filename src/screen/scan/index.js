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
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Modal,
  FAB,
  Portal,
  Title,
  Provider,
} from "react-native-paper";
import RenderHtml from "react-native-render-html";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const baseUrl = "http://197.155.143.74:1214";

const Index = ({ navigation }) => {
  const finderWidth = 280;
  const finderHeight = 630;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;

  const [IsLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [htmlSrc, setHtmlSrc] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const hideModal = () => setVisible(false);

  async function VerifyData(data) {
    console.log(data);
    try {
      setIsLoading(true);

      setScannedData({ uri: `${data}` });
      console.log(response.data);
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
    setVisible(true);
    VerifyData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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

      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.barcodeBox}
          >
            {IsLoading && (
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
            )}
            {scannedData && (
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <RenderHtml contentWidth={width} source={scannedData} />
              </ScrollView>
            )}
          </Modal>
        </Portal>
      </Provider>
      {scanned && (
        <Button
          title={"Appuyer pour Scanner"}
          onPress={() => {
            setScanned(false);
            setVisible(false);
            setError(null);
            setScannedData(null);
          }}
        />
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
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    backgroundColor: "white",
    overflow: "hidden",
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
