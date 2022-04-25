import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
const { width, height } = Dimensions.get("screen");

const Agent = ({ item, agentToAffect, setagentToAffect }) => {
  const [isChecked, setChecked] = useState(false);

  const onChecked = () => {
    setChecked(!isChecked);

    if (isChecked) {
      setagentToAffect([...agentToAffect, item.id_user]);
    } else {
      setagentToAffect(agentToAffect.filter((item) => item !== item.id_user));
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 50,
        width: width,
        alignSelf: "center",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      <View
        style={{
          height: 50,
          width: 50,
          backgroundColor: "#99D98c",
          borderRadius: 40,
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/icon/agent3.png")}
          style={{
            height: 40,
            width: 40,
          }}
          resizeMode="contain"
        />
      </View>

      <View style={[{ width: 150 }]}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "center",
            marginLeft: -20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "200",
                color: "black",
                textTransform: "capitalize",
              }}
            >
              Agent
            </Text>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 18,
                color: "black",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {item.nom} {item.prenom}
            </Text>
          </View>
        </View>
      </View>

      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={onChecked}
      />
    </View>
  );
};

export default Agent;
