import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import Vignette from "../../components/shared/Vignette";
import VignetteData from "../../data/Vignette.json";

const Manage = ({}) => {
  return <MyVignette />;
};

const MyVignette = () => {
  return (
    <View>
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
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 50,
        }}
        data={VignetteData}
        renderItem={Vignette}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Manage;

const styles = StyleSheet.create({});
