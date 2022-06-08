import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Tarif from "./Tarif";
import { usePuissances } from "../../services/query";
import { SkypeIndicator } from "react-native-indicators";

const Fees = ({ navigation }) => {
  const { status, data, error, isFetching } = usePuissances();

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
      {isFetching && (
        <View
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <SkypeIndicator color="#99D98c" size={40} />
        </View>
      )}
      {data && (
        <FlatList
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginVertical: 10, paddingHorizontal: 5 }}
          data={data.filter((item) => item.utilisation === "Personnel")}
          renderItem={({ item }) => (
            <Tarif navigation={navigation} item={item} />
          )}
          keyExtractor={(item) => item.id_puissance}
        />
      )}
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
      {isFetching && (
        <View
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <SkypeIndicator color="#99D98c" size={40} />
        </View>
      )}
      {data && (
        <FlatList
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginVertical: 10, paddingHorizontal: 5 }}
          data={data.filter((item) => item.utilisation === "Transport")}
          renderItem={({ item }) => (
            <Tarif navigation={navigation} item={item} />
          )}
          keyExtractor={(item) => item.id_puissance}
        />
      )}
    </View>
  );
};

export default Fees;
