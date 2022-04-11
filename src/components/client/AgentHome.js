import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React from "react";

import Vignette from "../shared/Vignette";
import QuickSelect from "../shared/QuickSelect";
import Fees from "../shared/Fees";
import SearchBar from "../shared/SearchBar";

import VignetteData from "../../data/Vignette.json";

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
        Vignettes Recentes
      </Text>
      <FlatList
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginVertical: 10, paddingHorizontal: 5 }}
        data={VignetteData}
        renderItem={Vignette}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const AgentHome = ({navigation}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 0,
        paddingBottom: 40,
      }}
    >
      <SearchBar/>
      <MyVignette />
      <QuickSelect navigation={navigation} />
      <Fees />
    </ScrollView>
  );
};

export default AgentHome;

const styles = StyleSheet.create({});
