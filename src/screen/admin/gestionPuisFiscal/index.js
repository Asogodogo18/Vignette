import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Input from "../../../components/TextInput";
import * as Animatable from "react-native-animatable";
import AddPuissance from "../../../components/admin/puissance/Add";
import {
  FontAwesome,
  Ionicons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { Picker } from "@react-native-picker/picker";
import { deletePuissance, usePuissances } from "../../../services/query";

const { width, height } = Dimensions.get("screen");

import Checkbox from "expo-checkbox";
import { BlurView } from "expo-blur";
import Modify from "../../../components/admin/puissance/Modify";

const Puissance = ({ item, handlePress,handleDelete }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setIsVisible(!isVisible)}
      style={styles.card}
    >
      <View
        style={{
          // flex: 2,
          height: 60,
          width: 60,
          backgroundColor: "#99D98c",
          borderRadius: 40,
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../../assets/icon/puissance.png")}
          style={{
            height: 40,
            width: 40,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 7 }}>
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
                color: "black",
                textTransform: "capitalize",
              }}
            >
              Puissance
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                color: "black",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.puissance.substring(0, 25).concat("...")}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "200",
                color: "black",
                textTransform: "capitalize",
              }}
            >
              Usage
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 18,
                color: "black",
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
            flex: 1,
            marginTop: 15,
            alignContent: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginHorizontal: 0,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "200",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            Montant
          </Text>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 18,
              color: "black",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {item.montant} FCFA
          </Text>
        </View>
      </View>
      {isVisible ? (
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            height: 100,
            maxWidth: 450,
            minWidth: 350,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
           
            <TouchableOpacity
              onPress={() => handlePress("Modify", item)}
              style={styles.btnBlur}
            >
              <FontAwesome name="edit" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item.id_puissance)}
              style={styles.btnBlur}
            >
              <MaterialCommunityIcons name="delete" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </BlurView>
      ) : null}
    </TouchableOpacity>
  );
};

const Index = ({ navigation }) => {
  const { data, error, isFetching } = usePuissances();
  const [operatingItem, setOperatingItem] = useState(null);

  const handleDelete = (id) => {
    deletePuissance(id).then(res=>console.log(res))
      .catch(e=>console.log(e))
  };
  const handlePress = (loader, item = null) => {
    setCurrentLoader(loader);
    setOperatingItem(item);
  };
  Keyboard.dismiss();

  const [currentLoader, setCurrentLoader] = useState(null);

  if (!currentLoader) {
    return (
      <SafeAreaView>
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
              justifyContent: "space-around",
              padding: 2,
              margin: 2,
              // position: "relative",
              // marginHorizontal: 240,

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
            <TouchableOpacity
              onPress={() => handlePress("Modify")}
              style={styles.touch}
            >
              <MaterialCommunityIcons
                name="file-document-edit-outline"
                size={24}
                color="white"
              />
              <Text style={styles.touchTxt}>Modifier</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.touch}>
                <AntDesign name="delete" size={24} color="white" />
                <Text style={styles.touchTxt}>Supprimer</Text>
              </TouchableOpacity> */}
          </View>
          {isFetching ? (
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
              data={data}
              renderItem={({ item }) => (
                <Puissance item={item} handleDelete={handleDelete} handlePress={handlePress} />
              )}
              keyExtractor={(item) => item.id_puissance}
            />
          )}
        </Animatable.View>
      </SafeAreaView>
    );
  }
  if (currentLoader == "Ajouter") {
    return <AddPuissance handlePress={handlePress} />;
  }
  if (currentLoader == "Modify") {
    return <Modify handlePress={handlePress} Item={operatingItem} />;
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
  card: {
    flex: 1,
    margin: 5,
    // padding: 5,
    height: 100,
    maxWidth: 450,
    minWidth: 345,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
    flexDirection: "row",
  },
  btnBlur: {
    // flex: 2,
    height: 55,
    width: 55,
    backgroundColor: "#99D98c",
    borderRadius: 40,
    // marginTop: 20,
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
