import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";

const { height, width } = Dimensions.get("screen");
const SearchBar = () => {
  const [query, setquery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef();

  useEffect(() => {
    if (isFocused) {
      containerRef.current.transitionTo({ height: 600 }, 1000);
    } else containerRef.current.transitionTo({ height: 100 }, 500);
  }, [isFocused]);

  return (
    <Animatable.View
      animation="fadeInDown"
      ref={containerRef}
      style={styles.container}
    >
      <Text style={{ margin: 10, fontSize: 20, fontWeight: "100" }}>
        Recherche Rapide
      </Text>
      <TextInput
        onFocus={setIsFocused}
        onBlur={() => setIsFocused(false)}
        placeholder="N° Chassis ou Id"
        value={query}
        onChangeText={setquery}
        style={styles.input}
      />
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
  },
  input: {
    height: 44,
    fontSize: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#99d98c",
    borderBottomRightRadius: 50,
    width: width - 15,
  },
});
