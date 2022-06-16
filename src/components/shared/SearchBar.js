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
  ImageBackground,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";

import * as Animatable from "react-native-animatable";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Vignette from "./Vignette";
import { getVignetteByChassis, getVignetteById } from "../../services/query";
const AnimatedImg = Animatable.createAnimatableComponent(ImageBackground);
import { useAuthState } from "../../global";
const { height, width } = Dimensions.get("screen");
let validationId = /[0-9]/gi;
const validationNoChassi = /^[a-z0-9]+$/i;

const SearchBar = ({ navigation, searchReturn = null }) => {
  const { user } = useAuthState();
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

  const searchRedirect = (item = null) => {
    if (user.role == "Agent") {
      navigation.navigate("Appstack", {
        screen: "Payment",
        params: { item, id_user: user.id_user },
      });
    }
  };

  const handleSearch = () => {
    setloading(true);
    setIsSearching(true);
    if (query.isId) {
      //console.log("id requete");

      getVignetteById(query.valeur)
        .then((res) => {
          if (res.data && res.data != "False") {
            //console.log("requete bien passe", res);
            setSearchResult(res.data);
          } else {
            //console.log("requete no passe", res);
          }
        })
        .catch((e) => {
          //console.log(e);
        })
        .finally(() => {
          setloading(false);
          setquery({ ...query, isId: false, isNochassi: false });
        });
    } else if (query.isNochassi) {
      getVignetteByChassis(query.valeur)
        .then((res) => {
          if (res.data && res.data != "False") {
            //console.log("requete bien passe", res);
            setSearchResult(res.data);
            setloading(false);
          } else {
            //console.log("requete no passe", res);
            setloading(false);
          }
        })
        .catch((e) => {
          //console.log(e);
          setloading(false);
        })
        .finally(() => {
          setloading(false);
          setquery({ ...query, isId: false, isNochassi: false });
        });
    }
  };

  useEffect(() => {
    const backAction = () => {
      setIsSearching(false);
      setIsFocused(false);
      setSearchResult([]);
      setloading(false);

      return () => {};
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
    <TouchableOpacity style={styles.card} onPress={() => searchRedirect(item)}>
      <AnimatedImg
        resizeMode="cover"
        source={require("../../../assets/bg.png")}
        animation="fadeInRight"
        style={styles.vignette}
        // onPress={() => setVignette(item)}
        duration={1000}
        delay={parseInt(item.id) * 500}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text
            style={{
              // marginLeft: 15,
              fontSize: 20,
              fontWeight: "200",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            {" "}
            {item.prenom}{" "}
          </Text>
          <Text
            style={{
              // marginLeft: 10,
              fontSize: 20,
              color: "white",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            {" "}
            {item.nom}{" "}
          </Text>
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
              Marque
            </Text>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 15,
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
                fontSize: 15,
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
                fontSize: 15,
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
                fontSize: 15,
                color: "white",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.montant} FCFA
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 5,
            textAlign: "center",
            fontSize: 15,
            color: "white",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "200",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            No Chassis
          </Text>{" "}
          {item.num_chassis}
        </Text>
        <View style={{ position: "absolute", top: 10, right: 5 }}>
          {item.statut && item.statut == "vignette valide" ? (
            <AntDesign name="checkcircle" size={30} color="green" />
          ) : (
            <Ionicons name="md-close-circle-sharp" size={35} color="red" />
          )}
        </View>
      </AnimatedImg>
      {/* <Animatable.View
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
              N° Chassis
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
          {item.statut && item.statut == "vignette valide" ? (
            <AntDesign name="checkcircle" size={30} color="green" />
          ) : (
            <AntDesign name="checkcircle" size={30} color="red" />
          )}
        </View>
      </Animatable.View> */}
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
        />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {loading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : null}

        {/* {loadingText && <Text>Aucun resultat trouve </Text>} */}
        {searchResult && (
          <FlatList
            nestedScrollEnabled
            data={searchResult}
            renderItem={({ item }) => (
              // <Vignette item={item} />
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
  // card: {
  //   flex: 1,
  //   margin: 5,
  //   padding: 5,
  //   flexDirection: "row",
  //   maxHeight: 100,
  //   minHeight: 50,
  //   width: width - 30,
  //   alignSelf: "center",
  //   borderWidth: 0.5,

  //   borderRadius: 10,
  //   justifyContent: "space-around",
  //   alignItems: "center",
  //   marginVertical: 5,
  // },
  // vignette: {
  //   marginVertical: 5,
  //   padding: 5,
  //   flex: 8,
  // },
  vignette: {
    // height: 180,
    backgroundColor: "white",
    marginHorizontal: 8,
    marginVertical: 5,
    padding: 15,
    elevation: 10,
    width: 300,
    borderRadius: 5,
    overflow: "hidden",
    minHeight: 180,
    maxHeight: 380,
  },
});
