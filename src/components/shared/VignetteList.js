import { Text, View, FlatList } from "react-native";
import { useVignette, useVignetteAgent } from "../../services/query";
import { SkypeIndicator } from "react-native-indicators";
import { useAuthState } from "../../global";

import Vignette from "./Vignette";

const VignetteList = () => {
  const { user } = useAuthState();
  const isAgent = user.role === "Agent";
  const {
    status,
    data: vignettes,
    error,
    isLoading,
  } = isAgent
    ? useVignetteAgent(user ? user.id_user : null)
    : useVignette(user ? user.id_user : null);
  // console.log("vignettes: ", vignettes.data);
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
      {isLoading ? (
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
      ) : (
        <FlatList
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginVertical: 10, paddingHorizontal: 5 }}
          data={vignettes?.data !== "False" ? vignettes?.data : null}
          renderItem={({ item }) => (
            <Vignette item={item} modify={isAgent ? true : false} />
          )}
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
            Aucune vignette enregistr??e
          </Text>
        </View>
      )}
    </View>
  );
};

export default VignetteList;
