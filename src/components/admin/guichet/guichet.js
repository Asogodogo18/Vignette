import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import GuichetData from "../../../data/guichet.json";

import RenderGuichet from "./renderGuichet";

const Guichet = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isDelete, setIsDelete] = useState(null);
  const renderGuichet = ({ item }) => {
    console.log("item :", item);
    <RenderGuichet
      item={item}
      // Visible={isVisible}
      // Checked={isChecked}
      // Delete={isDelete}
    />;
  };
  return (
    <FlatList
      data={GuichetData["Guichet"]}
      renderItem={renderGuichet}
      keyExtractor={(item) => item.id}
      style={styles.FlatList}
      Visible={isVisible}
      Checked={isChecked}
      Delete={isDelete}
    />
  );
};

export default Guichet;

const styles = StyleSheet.create({
  FlatList: {
    flex: 1,
    backgroundColor: "red",
  },
});
