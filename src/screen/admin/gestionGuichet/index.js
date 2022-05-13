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
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import Add from "../../../components/admin/guichet/Add";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import Guichet from "../../../components/shared/Guichet";
import { useGuichets, deleteGuichet } from "../../../services/query";
import Modify from "../../../components/admin/guichet/Modify";
import Affectation from "../../../components/admin/guichet/Affectation";
import { QueryClient, useQueryClient } from "react-query";
const { width, height } = Dimensions.get("screen");

const Index = ({ navigation }) => {
  const { status, data, error, isFetching } = useGuichets();
  const queryClient = useQueryClient();
  const [currentLoader, setCurrentLoader] = useState(null);
  const [elementsToDelete, setElementsToDelete] = useState([]);
  const [isDelete, setIsDelete] = useState(null);
  const [operationItem, setOperationItem] = useState(null);

  const handleMultipleDelete = () => {
    setIsDelete(!isDelete);
    if (elementsToDelete.length != 0) {
      elementsToDelete.forEach((element) => {
        handleDelete(element);
      });
    }
  };
  const handleDelete = (id) => {
    deleteGuichet(id)
      .then((res) => {
        if (res.data == "true") {
          queryClient.invalidateQueries('guichets'),
          Toast.show({
            type: "success",
            text1: "Supprime avec succes!",
          });
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
    setOperationItem(item);
  };
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
              GUICHET
            </Text>
            <Image
              source={require("../../../../assets/icon/guichet.png")}
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
              style={[styles.touch]}
            >
              <AntDesign name="addfolder" size={24} color="white" />
              <Text style={styles.touchTxt}>Ajouter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleMultipleDelete}
              style={[
                styles.touch,
                { backgroundColor: isDelete ? "red" : "#99D98c" },
              ]}
            >
              <AntDesign name="delete" size={24} color="white" />
              <Text style={styles.touchTxt}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {isFetching && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
        {data && data != "False" && (
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginVertical: 5, paddingHorizontal: 5 }}
            data={data}
            renderItem={({ item }) => (
              <Guichet
                key={item.id_guichet}
                handleDelete={handleDelete}
                handlePress={handlePress}
                elementsToDelete={elementsToDelete}
                setElementsToDelete={setElementsToDelete}
                item={item}
                isDelete={isDelete}
              />
            )}
            keyExtractor={(item) => item.id_guichet}
          />
        )}
      </SafeAreaView>
    );
  }
  if (currentLoader == "Ajouter") {
    return (
      <Add currentLoader={currentLoader} setCurrentLoader={setCurrentLoader} />
    );
  }
  if (currentLoader == "Modify") {
    return (
      <Modify
        item={operationItem}
        currentLoader={currentLoader}
        setCurrentLoader={setCurrentLoader}
      />
    );
  }
  if (currentLoader == "Affectation") {
    return (
      <Affectation
        item={operationItem}
        currentLoader={currentLoader}
        setCurrentLoader={setCurrentLoader}
      />
    );
  }
};

export default Index;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  touch: {
    height: 50,
    width: 110,
    maxWidth: 120,
    backgroundColor: "#99D98c",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 5,
    elevation: 0,
    flexDirection: "row",
    marginRight: 5,
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
    paddingHorizontal: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  touchTxt: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  vignette: {
    width: width - 90,
    padding: 10,

    marginBottom: 10,
  },
  section: {
    flex: 1,
  },
  Card: {
    margin: 5,
    padding: 5,
    height: 90,
    width: width - 15,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
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
  delete: {
    // flex: 2,
    height: 35,
    width: 35,
    backgroundColor: "red",
    borderRadius: 20,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 20,
  },
  CardDelete: {
    margin: 5,
    padding: 5,
    height: 90,
    width: width - 50,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
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
});
