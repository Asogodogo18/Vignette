import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { useVignette } from "../../services/query";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";
import { useAuthState } from "../../global";

import Vignette from "./Vignette";

const VignetteList = () => {
  const { user } = useAuthState();
  const {
    status,
    data: vignettes,
    error,
    isFetching,
  } = useVignette(user.id_user);
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
          data={vignettes.data}
          renderItem={Vignette}
          keyExtractor={(item) => item.id_engin}
        />
      )}
    </View>
  );
};

export default VignetteList;
