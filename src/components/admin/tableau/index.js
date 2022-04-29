import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { useStatistiques } from "../../../services/query";

const Index = () => {
  const { data, error, isFetching } = useStatistiques();

  return (
    <View>
      <Animatable.View
        animation="fadeIn"
        duration={300}
        delay={500}
        style={{
          flexDirection: "row",
          marginVertical: -10,
          alignSelf: "center",
          padding: 5,
        }}
      >
        <View style={styles.touch}>
          <View style={styles.containerTxt}>
            <Text style={styles.title}>VIGNETTE EN CIRCULATION</Text>
          </View>
          <View style={styles.fond}>
            <Text style={styles.containerTitle}>
              {isFetching ? (
                <ActivityIndicator size="small" color="white" animating />
              ) : (
                data.Total_vignette_en_circulation
              )}
            </Text>
          </View>
        </View>
        <View style={styles.touch}>
          <View style={styles.containerTxt}>
            <Text style={styles.title}>VIGNETTE AUJOURD'HUI</Text>
          </View>
          <View style={styles.fond}>
            <Text style={styles.containerTitle}>
              {isFetching ? (
                <ActivityIndicator size="small" color="white" animating />
              ) : (
                data.TOTAL_VIGNETTE_AUJOURDHUI
              )}
            </Text>
          </View>
        </View>
      </Animatable.View>
      <Animatable.View
        animation="fadeIn"
        duration={300}
        delay={500}
        style={{ flexDirection: "row" }}
      >
        <View style={styles.touch}>
          <View style={styles.containerTxt}>
            <Text style={styles.title}>CHIFFRE D'AFFAIRE AUJOURD'HUI</Text>
          </View>
          <View style={styles.fond}>
            <Text style={styles.containerTitle}>
              {isFetching ? (
                <ActivityIndicator size="small" color="white" animating />
              ) : (
                data.CHIFFRE_AFFAIRE_AUJOURDHUI
              )}
            </Text>
          </View>
        </View>
        <View style={styles.touch}>
          <View style={styles.containerTxt}>
            <Text style={styles.title}>VIGNETTE PAYÉE AUJOURD'HUI</Text>
          </View>
          <View style={styles.fond}>
            <Text style={styles.containerTitle}>
              {isFetching ? (
                <ActivityIndicator size="small" color="white" animating />
              ) : (
                data.TOTAL_VIGNETTE_PAYÉE_AUJOURDHUI
              )}
            </Text>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  fond: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#99D98c",
    height: 50,
    maxWidth: 210,
    minWidth: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  containerTxt: {
    marginTop: 5,
    // backgroundColor: "#1a1818",
    minWidth: 150,
    maxWidth: 250,
    height: 45,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  containerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "white",
  },
  touch: {
    width: 160,
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: "200",
    color: "black",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
