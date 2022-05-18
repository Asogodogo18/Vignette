import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { useVignette } from "../../services/query";

import { useAuthState } from "../../global";

import Vignette from "./Vignette";

const VignetteList = () => {
  const { user } = useAuthState();
  const { status, data, error, isFetching } = useVignette(user.id_user);
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
      {isFetching ? (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" animating />
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginVertical: 10, paddingHorizontal: 5 }}
          data={data}
          renderItem={Vignette}
          keyExtractor={(item) => item.id_engin}
        />
      )}
    </View>
  );
};

export default VignetteList;
