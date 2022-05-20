import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "@expo/vector-icons";
import { getVignetteByChassis, getVignetteById } from "../../services/query";
const { height, width } = Dimensions.get("screen");
let validationId = /[0-9]/gi;
const validationNoChassi = /^[a-z0-9]+$/i;

const SearchBar = () => {
  const [query, setquery] = useState({
    valeur: "",
    isId: false,
    isNochassi: false,
  });
  const [isFocused, setIsFocused] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const containerRef = useRef();

  useEffect(() => {
    const handleSearch = () => {
      if (query.isId) {
        console.log("id requete");

        getVignetteById(query.valeur)
          .then((res) => {
            if (res.data) {
              console.log("requete bien passe", res);
              setSearchResult(res);
              setquery({ ...query, isId: false, isNochassi: false });
            } else {
              console.log("requete no passe", res);
              setquery({ ...query, isId: false, isNochassi: false });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (query.isNochassi) {
        getVignetteByChassis(query.valeur)
          .then((res) => {
            console.log("requete bien passe", res);
            setSearchResult(res);
            setquery({ ...query, isId: false, isNochassi: false });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    setTimeout(() => {
      handleSearch();
    }, 2000);

    return () => {
      setSearchResult([]);
    };
  }, [query]);

  useEffect(() => {
    if (isFocused) {
      containerRef.current.transitionTo({ height: 600 }, 1000);
    } else containerRef.current.transitionTo({ height: 100 }, 500);
  }, [isFocused]);

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

  return (
    <Animatable.View
      animation="fadeInDown"
      ref={containerRef}
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
        />
        {query ? (
          <TouchableOpacity
            style={{ marginLeft: -50, zIndex: 100, padding: 4 }}
          >
            <FontAwesome5 name="search" size={24} color="black" />
          </TouchableOpacity>
        ) : null}
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
});
