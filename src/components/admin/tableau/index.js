import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { useStatistiques } from "../../../services/query";
import { SkypeIndicator } from "react-native-indicators";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const Index = () => {
  const { data, error, isFetching } = useStatistiques();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const GuichetStats =
    data &&
    data?.STATS_GUICHET.map((guichet, index) => {
      return (
        <View style={styles.colapsecontainer} key={index}>
          <Text style={styles.textCollapse}>{guichet.guichet}</Text>
          <Text style={styles.textCollapse}>{guichet.ca}</Text>
          <Text style={styles.textCollapse}>{guichet.nbr}</Text>
        </View>
      );
    });

  // console.log("statitistq", data);
  // console.log("data STATS_GUICHET", data.STATS_GUICHET);
  return (
    <View>
      <Animatable.View
        animation="fadeIn"
        duration={300}
        delay={500}
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignSelf: "center",
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.touch}>
          <View style={styles.containerTxt}>
            <Text style={styles.title}>VIGNETTE EN CIRCULATION</Text>
          </View>
          <View style={styles.fond}>
            <Text style={styles.containerTitle}>
              {isFetching ? (
                <SkypeIndicator color="white" size={40} />
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
                <SkypeIndicator color="white" size={40} />
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
        style={{
          flexDirection: "row",
          marginLeft: 5,
          alignSelf: "center",
        }}
      >
        <View style={styles.touch}>
          <View style={styles.containerTxt}>
            <Text style={styles.title}>CHIFFRE D'AFFAIRE AUJOURD'HUI</Text>
          </View>
          <View style={styles.fond}>
            <Text style={styles.containerTitle}>
              {isFetching ? (
                <SkypeIndicator color="white" size={40} />
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
                <SkypeIndicator color="white" size={40} />
              ) : (
                data.TOTAL_VIGNETTE_PAYÉE_AUJOURDHUI
              )}
            </Text>
          </View>
        </View>
      </Animatable.View>
      <View
        style={{
          minHeight: 50,
          width: "95%",
          padding: 10,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          onPress={() => setIsCollapsed(!isCollapsed)}
        >
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            Voir les Chiffres par Guichet
          </Text>
          <AntDesign
            name={isCollapsed ? "arrowup" : "arrowdown"}
            size={24}
            color="black"
          />
        </TouchableOpacity>

        {isCollapsed && (
          <Animatable.View animation="fadeIn" duration={300} delay={200}>
            <View style={styles.headerCollapse}>
              <Text style={styles.textCollapseHeader}>Nom</Text>
              <Text style={styles.textCollapseHeader}>Chiffre d'affaire</Text>
              <Text style={styles.textCollapseHeader}>Nombre</Text>
            </View>
            {GuichetStats}
          </Animatable.View>
        )}
      </View>

      <Animatable.View
        animation="fadeIn"
        duration={300}
        delay={500}
        style={{
          flexDirection: "row",
          marginLeft: 5,
        }}
      ></Animatable.View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  fond: {
    marginTop: 10,
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
    minHeight: 150,
    maxHeight: 250,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    alignSelf: "center",
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "400",
    color: "gray",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  colapsecontainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 50,
    width: width,
    padding: 10,
    alignItems: "center",
  },
  textCollapse: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1.5,
    flex: 1,
    textAlign: "center",
  },
  headerCollapse: {
    height: 50,
    backgroundColor: "#99D98c",
    width: width - 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  textCollapseHeader: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
    flex: 1,
    textAlign: "center",
    color: "white",
    width: 50,
  },
});
