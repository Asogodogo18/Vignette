import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Rive from "rive-react-native";
import * as Animatable from "react-native-animatable";
const Banner = ({ count }) => {
  return (
    <Rive
      url="https://cdn.rive.app/animations/vehicles.riv"
      style={{ width: 400, height: 400 }}
    />
  );
};

export default Banner;

const styles = StyleSheet.create({});
