import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Index = () => {
  return (
    <View style={styles.contain}>
      <Text>Gestion Puissance Fiscale</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
