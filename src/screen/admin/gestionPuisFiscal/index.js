import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  UIManager,
  Keyboard,
  ActivityIndicator,
  LayoutAnimation,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";
import {
  FontAwesome,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import AddPuissance from "../../../components/admin/puissance/Add";
import { deletePuissance, usePuissances } from "../../../services/query";
import Modify from "../../../components/admin/puissance/Modify";
import Puissance from "./Puissance";

const { width, height } = Dimensions.get("screen");

const Index = ({ navigation }) => {
  const { data, error, isLoading } = usePuissances();
  const [puissanceList, setpuissanceList] = useState([]);
  const [operatingItem, setOperatingItem] = useState(null);

  useEffect(() => {
    setpuissanceList(data);

    return () => {
      setpuissanceList([]);
    };
  }, [isLoading]);

  const handleDelete = (id) => {
    deletePuissance(id)
      .then((res) => {
        console.log(res);
        if (res.data === "true") {
          let arr = data.filter(function (item) {
            return item.id_puissance !== id;
          });
          Toast.show({
            type: "success",
            text1: "Supprime avec success!",
          });
          setpuissanceList(arr);
          // after removing the item, we start animation
        } else {
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, \nVeuillez ressayer!",
          });
        }
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue, Veuillez ressayer!",
          text2: e.toString(),
        });
      });
  };
  const handlePress = (loader, item = null) => {
    setCurrentLoader(loader);
    setOperatingItem(item);
  };
  const [currentLoader, setCurrentLoader] = useState(null);

  if (!currentLoader) {
    return (
      <SafeAreaView>
        <Animatable.View
          animation="fadeIn"
          delay={500}
          duration={300}
          style={styles.contain}
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
              Puissance Fiscale
            </Text>
            <Image
              source={require("../../../../assets/icon/puissance.png")}
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
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: 2,
              margin: 2,

              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => handlePress("Ajouter")}
              style={styles.touch}
            >
              <AntDesign name="addfolder" size={24} color="white" />
              <Text style={styles.touchTxt}>Ajouter</Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
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
              contentContainerStyle={{}}
              data={puissanceList}
              renderItem={({ item }) => (
                <Puissance
                  item={item}
                  handleDelete={handleDelete}
                  handlePress={handlePress}
                />
              )}
              keyExtractor={(item) => item.id_puissance}
            />
          )}
        </Animatable.View>
      </SafeAreaView>
    );
  }
  if (currentLoader == "Ajouter") {
    return (
      <AddPuissance
        setCurrentLoader={setCurrentLoader}
        handlePress={handlePress}
      />
    );
  }
  if (currentLoader == "Modify") {
    return <Modify handlePress={handlePress} Item={operatingItem} />;
  }
};

export default Index;

const styles = StyleSheet.create({
  contain: {
    // flexGrow: 1,
    // justifyContent: "center",
    // alignItems: "center",
    height: height - 50,
  },
  touch: {
    height: 50,
    width: 120,
    maxWidth: 140,
    backgroundColor: "#99D98c",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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

  section: {
    flex: 1,
  },
  card: {
    margin: 5,
    height: 130,
    maxWidth: 350,
    minWidth: 450,
    // elevation: 5,
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
    flexDirection: "row",
    // alignItems: "center",
    paddingHorizontal: 10,
    // marginBottom: 10,
  },
  btnBlur: {
    height: 55,
    width: 55,
    backgroundColor: "#99D98c",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  container: {
    flex: 1,
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

    width: 250,
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
