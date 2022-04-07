import { View, Text, StyleSheet } from "react-native";
import React from "react";

const splach = () => {
  return (
    <View style={styles.contain}>
      <Text>splach</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default splach;
