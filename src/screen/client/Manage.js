import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar } from "@rneui/themed";
import { SkypeIndicator } from "react-native-indicators";
import { useVignette, useVignetteAgent } from "../../services/query";
import { useAuthState } from "../../global";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Vignette from "../../components/shared/Vignette";
const { width, height } = Dimensions.get("screen");

const Manage = ({ navigation }) => {
  // const { status, data, error, isLoading, vignettes} = useVignettes();
  const { user } = useAuthState();
  const isAgent = user.role === "Agent";

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const {
    status,
    data: vignettes,
    error,
    isLoading,
  } = isAgent
    ? useVignetteAgent(user ? user.id_user : null)
    : useVignette(user ? user.id_user : null);
  // console.log("result", searchResult);

  const handleSearch = () => {
    const result = vignettes.data.filter(
      (vignette) => vignette.num_chassis == searchQuery
    );
    setSearchResult(result);
    console.log("le result : ", result);
  };

  const resultEmpty = () => {
    setSearchResult([]);
    setSearchQuery("");
  };

  // console.log("vignettes : ", vignettes?.data);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 0, margin: 5 }}>
        <Text style={{ fontSize: 18, textAlign: "center", fontWeight: "700" }}>
          Recherche Rapide
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Votre numero Chassis"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{
              backgroundColor: "white",
              borderWidth: 0,
              borderColor: "white",
              height: 50,
              width: width - 60,
              alignSelf: "center",
              padding: 10,
              elevation: 5,
              borderRadius: 8,
            }}
          />
          <TouchableOpacity
            onPress={searchResult.length == 0 ? handleSearch : resultEmpty}
            style={{
              backgroundColor: "white",
              borderWidth: 0,
              borderColor: "white",
              height: 50,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
              elevation: 5,
              borderRadius: 8,
            }}
          >
            {searchResult.length != 0 ? (
              <Ionicons name="close-outline" size={24} color="black" />
            ) : (
              <Ionicons name="search-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          marginLeft: 15,
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
          textTransform: "capitalize",
        }}
      >
        {" "}
        Mes Vignettes
      </Text>

      {isLoading && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <SkypeIndicator color="#99D98c" size={40} />
        </View>
      )}
      {vignettes && vignettes?.data != "False" && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 50,
          }}
          data={searchQuery ? searchResult : vignettes?.data}
          renderItem={({ item }) => (
            <Vignette item={item} modify={isAgent ? true : false} />
          )}
          keyExtractor={(item) => item.id_engin}
        />
      )}
      {vignettes?.data === "False" && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              letterSpacing: 1.3,
              textAlign: "center",
            }}
          >
            Aucune vignette enregistrée
          </Text>
        </View>
      )}
    </View>
  );
};

export default Manage;
