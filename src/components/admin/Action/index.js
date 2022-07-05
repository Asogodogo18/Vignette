import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Badge } from "react-native-paper";

const index = ({ navigation }) => {
  return (
    <View style={styles.contain}>
      {/* <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("Adminstack", { screen: "Transfert" })
        }
      >
        <View style={styles.touchTansfert}>
          <Badge size={28} style={{ position: "absolute", right: 15, top: 12 }}>
            9+
          </Badge>
          <View style={styles.coverIcon}>
            <Image
              source={require("../../../../assets/icon/transfert.png")}
              style={{ height: 43, width: 43 }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              width: 200,
              fontWeight: "bold",
              fontSize: 17,
              color: "gray",
            }}
          >
            Validation du Transfert
          </Text>
        </View>
      </TouchableOpacity> */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Adminstack", { screen: "Vignette" })
          }
        >
          <View style={styles.touchAction}>
            <View style={styles.coverIcon}>
              <Image
                source={require("../../../../assets/icon/vignette.png")}
                style={{ height: 50, width: 50 }}
                resizeMode="contain"
              />
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "gray",
              }}
            >
              VIGNETTE
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Adminstack", { screen: "Guichet" })
          }
        >
          <View style={styles.touchAction}>
            <View style={styles.coverIcon}>
              <Image
                source={require("../../../../assets/icon/guichet.png")}
                style={{ height: 45, width: 45 }}
                resizeMode="contain"
              />
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "gray",
              }}
            >
              GUICHET
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Adminstack", { screen: "PuisFiscale" })
          }
        >
          <View style={styles.touchAction}>
            <View style={styles.coverIcon}>
              <Image
                source={require("../../../../assets/icon/puissance.png")}
                style={{ height: 45, width: 45 }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                width: 100,
                fontWeight: "bold",
                fontSize: 17,
                color: "gray",
              }}
            >
              PUISSANCE FISCALE
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Adminstack", { screen: "Agent" })}
        >
          <View style={styles.touchAction}>
            <View style={styles.coverIcon}>
              <Image
                source={require("../../../../assets/icon/agent3.png")}
                style={{ height: 45, width: 45 }}
                resizeMode="contain"
              />
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "gray",
              }}
            >
              AGENT
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  touchAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: 95,
    maxWidth: 270,
    minWidth: 170,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 15,
  },
  coverIcon: {
    height: 65,
    width: 65,
    backgroundColor: "#99D98c",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    padding: 15,
  },
  touchTansfert: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: 95,
    maxWidth: 400,
    minWidth: 300,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 15,
  },
});
