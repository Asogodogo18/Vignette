import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";

import * as Animatable from "react-native-animatable";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { getVignetteByChassis, getVignetteById } from "../../services/query";
const { height, width } = Dimensions.get("screen");
let validationId = /[0-9]/gi;
const validationNoChassi = /^[a-z0-9]+$/i;

const SearchBar = ({ navigation }) => {
  const [query, setquery] = useState({
    valeur: "",
    isId: false,
    isNochassi: false,
  });
  const [isFocused, setIsFocused] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [loadingText, setLoadingText] = useState(false);

  const containerRef = useRef();

  const handleSearch = () => {
    setloading(true);
    setIsSearching(true);
    setLoadingText(false);
    if (query.isId) {
      console.log("id requete");

      getVignetteById(query.valeur)
        .then((res) => {
          if (res.data && res.data != "False") {
            console.log("requete bien passe", res);
            setSearchResult(res.data);
          } else {
            console.log("requete no passe", res);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setloading(false);
          setquery({ ...query, isId: false, isNochassi: false });
          setLoadingText(true);
        });
    } else if (query.isNochassi) {
      getVignetteByChassis(query.valeur)
        .then((res) => {
          if (res.data && res.data != "False") {
            console.log("requete bien passe", res);
            setSearchResult(res.data);
          } else {
            console.log("requete no passe", res);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setloading(false);
          setquery({ ...query, isId: false, isNochassi: false });
          setLoadingText(true);
        });
    }
  };

  useEffect(() => {
    const backAction = () => {
      setIsSearching(false);
      setIsFocused(false);
      setSearchResult([]);
      console.log("back pressed");
      console.log(isSearching);
      // if (isFocused && isSearching)

      // Alert.alert("Hold on!", "Are you sure you want to go back?", [
      //   {
      //     text: "Cancel",
      //     onPress: () => null,
      //     style: "cancel",
      //   },
      //   { text: "YES", onPress: () => BackHandler.exitApp() },
      // ]);
      // return () => {};
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (isSearching) {
      containerRef.current.transitionTo({ height: 600 }, 1000);
    } else {
      containerRef.current.transitionTo({ height: 100 }, 500);
      if (searchResult) setSearchResult([]);
    }
    return () => {};
  }, [isSearching]);

  const handlerVerif = (val) => {
    if (validationId.test(val)) {
      setquery({
        ...query,
        valeur: val,
        isId: true,
      });
    } else {
      setquery({
        ...query,
        valeur: val,
        isNochassi: true,
      });
    }
  };

  const RenderResul = ({ item, navigation }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("AdminStack", {
          screen: "Payment",
          params: { item },
        })
      }
    >
      <Animatable.View
        duration={300}
        delay={300}
        animation="bounceInLeft"
        style={styles.vignette}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "300",
                color: "black",
                textTransform: "capitalize",
              }}
            >
              N° Chassi
            </Text>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 18,
                color: "black",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.num_chassis}
            </Text>
          </View>
          {item.statut == "vignette non pay" &&
          item.statut == "vignette valide" ? (
            <AntDesign name="checkcircle" size={30} color="green" />
          ) : (
            <AntDesign name="checkcircle" size={30} color="red" />
          )}
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );

  return (
    <Animatable.View
      animation="fadeInDown"
      ref={containerRef}
      useNativeDriver={false}
      style={styles.container}
    >
      <Text style={{ margin: 10, fontSize: 20, fontWeight: "100" }}>
        Recherche Rapide
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          onFocus={setIsFocused}
          onBlur={() => setIsFocused(false)}
          placeholder="N° Chassis ou Id"
          value={query.valeur}
          onChangeText={(val) => handlerVerif(val)}
          style={styles.input}
          onSubmitEditing={handleSearch}
          onB
        />
      </View>
      <View>
        {loading && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
        {!loadingText && <Text>Aucun resultat trouve </Text>}
        {searchResult && (
          <FlatList
            data={searchResult}
            renderItem={({ item }) => (
              <RenderResul item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id_engin}
          />
        )}
      </View>
    </Animatable.View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 100,
    elevation: 5,
    backgroundColor: "white",
    borderBottomRightRadius: 53,
    padding: 10,
    marginBottom: 15,
    marginTop: 45,
  },
  input: {
    height: 44,
    fontSize: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#99d98c",
    borderBottomRightRadius: 50,
    width: width - 15,
    flexDirection: "row",
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 5,
    flexDirection: "row",
    maxHeight: 100,
    minHeight: 50,
    width: width - 30,
    alignSelf: "center",
    borderWidth: 0.5,

    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 5,
  },
  vignette: {
    marginVertical: 5,
    padding: 5,
    flex: 8,
  },
});
