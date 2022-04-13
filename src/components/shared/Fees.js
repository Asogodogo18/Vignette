import {
    StyleSheet,
    Text,
    View,
    FlatList,
  } from "react-native";
  import Tarif from "./Tarif";
  import FeesData from "../../data/tarifs.json";

const Fees = () => {
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
          Nos Tarifs
        </Text>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 20,
            fontWeight: "200",
            color: "black",
            textTransform: "capitalize",
          }}
        >
          Particuliers
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginVertical: 10, paddingHorizontal: 5 }}
          data={FeesData["particulier"]}
          renderItem={Tarif}
          keyExtractor={(item) => item.id}
        />
        <Text
          style={{
            marginLeft: 20,
            fontSize: 20,
            fontWeight: "200",
            color: "black",
            textTransform: "capitalize",
          }}
        >
          Transports
        </Text>
  
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginVertical: 10, paddingHorizontal: 5 }}
          data={FeesData["transport"]}
          renderItem={Tarif}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  export default Fees
  