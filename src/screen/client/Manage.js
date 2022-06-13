import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SkypeIndicator } from "react-native-indicators";
import React from "react";
import { useVignette, useVignetteAgent } from "../../services/query";
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
  } = user.role == "Agent"
    ? useVignetteAgent(user ? user.id_user : null)
    : useVignette(user ? user.id_user : null);

  console.log("vignettes : ", vignettes?.data);
  return (
    <View style={{ flex: 1 }}>
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
      {isFetched && vignettes?.data != "False" && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 50,
          }}
          data={vignettes?.data}
          renderItem={Vignette}
          keyExtractor={(item) => item.id_engin}
        />
      )}
      {vignettes?.data === "False" && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              letterSpacing: 1.3,
              textAlign: "center",
            }}
          >
            Aucune vignette enregistrée
          </Text>
        </View>
      )}
    </View>
  );
};

export default Manage;
