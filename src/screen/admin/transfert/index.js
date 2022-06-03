import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import Data from "../../../data/validation";
import Transfer from "../../../screen/client/Transfer";

const Index = ({ navigation }) => {
  return (
    <View style={styles.contain}>
      <Transfer navigation={navigation} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // justifyContent: "center",
    // alignContent: "center",
  },
});
