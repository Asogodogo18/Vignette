import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
  Platform,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useUsers, deleteUser } from "../../../services/query";
import { Chip } from "react-native-paper";

import RenderAgent from "../../../components/admin/users/renderAgent";
import Ajouter from "../../../components/admin/users/Ajouter";
import Modify from "../../../components/admin/users/Modify";
import FiltreView from "../../../components/admin/users/filtreView";
import { FiltreUser } from "../../../Utils/FilterUser";
const { width, height } = Dimensions.get("screen");
const Data = [
  {
    id: "0001",
    name: "Tout",
  },
  {
    id: "1",
    name: "Agent",
  },
  {
    id: "2",
    name: "Superviseur",
  },
  {
    id: "3",
    name: "Policier",
  },
  {
    id: "4",
    name: "Verificateur",
  },
  {
    id: "5",
    name: "Client",
  },
  {
    id: "6",
    name: "Compta public",
  },
  {
    id: "7",
    name: "Maire",
  },
  {
    id: "5",
    name: "Maire adjoint",
  },
];

const Index = ({ navigation }) => {
  const {
    data: userData,
    error: userError,
    isFetching: isFetchingUsers,
  } = useUsers();

  Keyboard.dismiss();

  const [currentLoader, setCurrentLoader] = useState(null);

  const [IsActive, setIsActive] = useState(0);
  const [isDelete, setIsDelete] = useState(false);

  const [elementsToDelete, setElementsToDelete] = useState([]);

  const [operationItem, setOperationItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("Tout");
  console.log("filtre :", filter);

  // useEffect(() => {
  //   console.log("filtre :", filter);

  //   setLoading(true);
  //   setfilteredData(true);
  //   setfilteredData(FiltreUser(useUsers, filter));
  //   setLoading(false);
  //   return () => {
  //     setfilteredData(true);
  //   };
  // }, [filter]);

  useEffect(() => {
    console.log("user del:", elementsToDelete);
  }, [elementsToDelete]);

  const handleMultipleDelete = () => {
    setIsDelete(!isDelete);
    if (elementsToDelete.length != 0) {
      elementsToDelete.forEach((element) => {
        handleDelete(element);
      });
    }
  };
  const handleDelete = (id) => {
    console.log("id", id);
    deleteUser(id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
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
              Agent
            </Text>
            <Image
              source={require("../../../../assets/icon/agent3.png")}
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

            <TouchableOpacity
              onPress={handleMultipleDelete}
              style={styles.touch}
            >
              <AntDesign name="delete" size={24} color="white" />
              <Text style={styles.touchTxt}>Supprimer</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chip}
          >
            {Data &&
              Data.map((item, index) => {
                return (
                  <Chip
                    key={item.id}
                    selectedColor="black"
                    selected={IsActive == index ? true : false}
                    style={styles.chipItem}
                    avatar={
                      <Ionicons
                        name="person"
                        size={24}
                        color="white"
                        style={{
                          backgroundColor: "#99D98c",
                        }}
                      />
                    }
                    onPress={() => {
                      setIsActive(index);

                      item.name.toLowerCase() === filter.toLowerCase()
                        ? null
                        : setFilter(item.name);
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontWeight: Platform.OS === "ios" ? "500" : "800",
                        fontSize: 15,
                        letterSpacing: 1,
                      }}
                    >
                      {item.name}
                    </Text>
                  </Chip>
                );
              })}
          </ScrollView>
          {isFetchingUsers ? (
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
                padding: 5,
              }}
              data={
                filter === "Tout"
                  ? userData
                  : userData.filter((user) => user.role === filter)
              }
              renderItem={({ item }) => (
                <RenderAgent
                  item={item}
                  handlePress={handlePress}
                  isDelete={isDelete}
                  handleDelete={handleDelete}
                  elementsToDelete={elementsToDelete}
                  setElementsToDelete={setElementsToDelete}
                />
              )}
              keyExtractor={(item) => item.id_user}
            />
          )}

          {/* <View style={{ flex: 1, justifyContent: "center" }}>
            filter ? (
            <View>
              <FiltreView data={filteredData} />
            </View>
            ) : null
          </View> */}
        </Animatable.View>
      </SafeAreaView>
    );
  }
  if (currentLoader == "Ajouter") {
    return (
      <Ajouter
        currentLoader={currentLoader}
        setCurrentLoader={setCurrentLoader}
      />
    );
  }
  if (currentLoader == "Modify") {
    return (
      <Modify
        item={operationItem}
        setCurrentLoader={setCurrentLoader}
        currentLoader={currentLoader}
      />
    );
  }
};

export default Index;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  touch: {
    height: 50,
    minWidth: 120,
    maxWidth: 150,
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
    margin: 5,
  },

  touchTxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  vignette: {
    marginVertical: 5,
    padding: 5,
    flex: 8,
  },
  section: {
    flex: 1,
  },
  Card: {
    flex: 1,
    margin: 5,
    padding: 5,
    flexDirection: "row",
    backgroundColor: "white",
    maxHeight: 250,
    minHeight: 100,
    width: width - 15,
    alignSelf: "center",
    elevation: 5,
    borderRadius: 10,
  },

  container: {
    flexGrow: 1,
  },

  chip: {
    flexDirection: "row",
    padding: 2,
    flexGrow: 1,
    height: 40,
    justifyContent: "center",
    margin: 2,
  },
  chipItem: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
    padding: 0,
    overflow: "hidden",
    minWidth: 130,
    maxWidth: 250,
    borderRadius: Platform.OS == "ios" ? 20 : 50,
    backgroundColor: "white",
  },
});
