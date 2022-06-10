import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SkypeIndicator } from "react-native-indicators";
import React from "react";
import { useVignette } from "../../services/query";
import { useAuthState } from "../../global";
import Vignette from "../../components/shared/Vignette";

const Manage = ({ navigation }) => {
  // const { status, data, error, isFetching, isFetched} = useVignettes();
  const { user } = useAuthState();
  const {
    status,
    data: vignettes,
    error,
    isFetching,
    isFetched,
  } = useVignette(user ? user.id_user : null);
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
      {isFetching && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <SkypeIndicator color="#99D98c" size={40} />
        </View>
      )}
      {isFetched && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 50,
          }}
          data={vignettes.data}
          renderItem={Vignette}
          keyExtractor={(item) => item.id_engin}
        />
      )}
    </View>
  );
};

export default Manage;
