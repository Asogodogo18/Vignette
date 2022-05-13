import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from "react-native";
<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { VignetteContext } from "../../../global/vignetteContext";
=======
import React, { useState } from "react";

import Buy from "../..//client/Buy";
>>>>>>> parent of 6e9c0d3 (request to JSON)
import Modify from "../../../components/admin/vignette/Modify";
import Vignette from "../../../components/admin/vignette/Vignette";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import Fees from "../../../components/shared/Fees";
const { width, height } = Dimensions.get("screen");

const Index = ({ navigation }) => {
<<<<<<< HEAD
  const {vignetteList} = useContext(VignetteContext);
=======
  const { status, data, error, isFetching, isFetched } = useVignettes();
>>>>>>> parent of 6e9c0d3 (request to JSON)
  const [operatingItem, setOperatingItem] = useState(null);
  const [currentLoader, setCurrentLoader] = useState(null);

  const handleDelete = (id) => {
    
  };
  const handlePress = (loader, item = null) => {
    setCurrentLoader(loader);
    setOperatingItem(item);
  };

  if (!currentLoader) {
    return (
      <SafeAreaView>
        <ScrollView>
          <Animatable.View
            animation="fadeIn"
            delay={500}
            duration={300}
            stickyHeaderHiddenOnScroll={true}
            nestedScrollEnabled
            stickyHeaderIndices={[0]}
            contentContainerStyle={styles.contain}
          >
            <View
              style={{
                height: 80,
                backgroundColor: "#1a1818",
                flexDirection: "row",
                elevation: 5,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
                <Ionicons name="ios-arrow-undo" size={30} color="white" />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "white",
                  textAlign: "center",
                  marginLeft: 10,
                }}
              >
                Vignette
              </Text>
              <Image
                source={require("../../../../assets/icon/vignette.png")}
                style={{ height: 40, width: 40 }}
                resizeMode="cover"
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginHorizontal: 10,
                padding: 10,
              }}
            >
              Action Rapide
            </Text>
            <View
              style={{
                padding: 2,
                margin: 2,

                marginHorizontal: 220,

                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handlePress("Ajouter")}
                style={styles.touch}
              >
                <AntDesign name="addfolder" size={24} color="white" />
                <Text style={styles.touchTxt}>Acheter</Text>
              </TouchableOpacity>
            </View>
            <View style={{ margin: 5, padding: 5 }}>
<<<<<<< HEAD
              {!vignetteList ? (
=======
              {isFetching ? (
>>>>>>> parent of 6e9c0d3 (request to JSON)
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: "center",
                    paddingBottom: 50,
                  }}
                  data={vignetteList}
                  renderItem={({ item }) => (
                    <Vignette
                      item={item}
                      handleDelete={handleDelete}
                      handlePress={handlePress}
                    />
                  )}
                  keyExtractor={(item) => item.id_engin}
                />
              )}
            </View>
          </Animatable.View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentLoader == "Ajouter") {
    return (
      <View
        animation="fadeInRight"
        duration={300}
        delay={100}
        style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 8 }}
      >
        <Ionicons
          onPress={() => handlePress(null)}
          name="chevron-back-circle-outline"
          size={34}
          color="black"
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            letterSpacing: 1.2,
            margin: 10,
            marginBottom: 30,
          }}
        >
          Veuillez Choisir Une option:
        </Text>
        <Fees navigation={navigation} />
      </View>
    );
  }
  if (currentLoader == "Modify") {
    return <Modify handlePress={handlePress} item={operatingItem} />;
  }
};

export default Index;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touch: {
    height: 50,
    width: 110,
    maxWidth: 120,
    backgroundColor: "#99D98c",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
    flexDirection: "row",
  },
  touchAchat: {
    height: 50,
    width: width - 100,
    backgroundColor: "#99D98c",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  touchTxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  vignette: {
    maxHeight: 350,
    minHeight: 200,
    width: width - 20,
    backgroundColor: "white",
    marginVertical: 5,
    padding: 5,
    elevation: 10,
  },
  section: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  container: {
    flexGrow: 1,
  },
  inputBox: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontWeight: "bold",

    width: 200,
  },
  buttonGroup: {
    flexDirection: "row",
    height: 60,
    marginTop: 40,
  },
  button: {
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  btnLabel: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 14,
  },
  select: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontWeight: "bold",
  },
});
