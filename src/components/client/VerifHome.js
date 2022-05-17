import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Tableau from "../../components/admin/tableau";

const VerifHome = () => {
  return (
    <View style={{ flex: 1, paddingTop: 80, backgroundColor: "red" }}>
      <Tableau />
    </View>
  );
};

export default VerifHome;

const styles = StyleSheet.create({});
