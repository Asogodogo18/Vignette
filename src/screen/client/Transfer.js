import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import useTransfert from "../../global/transfertContext";

const Transfer = () => {
  const {
    statut,
    etat,
    detail,
    initTransfert,
    confirmTranfert,
    rejectTranfert,
  } = useTransfert();

  return <View style={styles.contain}></View>;
};

export default Transfer;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
});
