import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Tableau from "../../components/admin/tableau";

const VerifHome = () => {
  return (
    <View style={{ flex: 1, marginTop: 180, alignSelf: "center" }}>
      <View>
        <Text
          style={{
            marginTop: -50,
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            margin: 5,
            padding: 5,
            color: "gray",
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          Tableau de Bord
        </Text>
      </View>
      <Tableau />
    </View>
  );
};

export default VerifHome;

const styles = StyleSheet.create({});
