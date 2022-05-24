import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
const { width, height } = Dimensions.get("screen");
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

const Agent = ({
  item,
  agentToAffect,
  setagentToAffect,
  agentToUnaffect,
  setagentToUnaffect,
  affectedAgent,
}) => {
  const [isChecked, setChecked] = useState({
    check: affectedAgent.includes(item.id_user) ? true : false,
    init: affectedAgent.includes(item.id_user) ? true : false,
  });
  const [loading, setLoading] = useState(false);

  //console.log("agent:", item.id_user);

  useEffect(() => {
    setLoading(true);
    if (isChecked.check && !isChecked.init) {
      setagentToAffect([...agentToAffect, item.id_user]);
      //console.log("afected :", agentToAffect);
    } else if (!isChecked.check && !isChecked.init) {
      setagentToAffect(agentToAffect.filter((el) => el !== item.id_user));
      //console.log("afected on:", agentToAffect);
    } else if (!isChecked.check && isChecked.init) {
      setagentToUnaffect([...agentToUnaffect, item.id_user]);
      //console.log("Unaffected :", agentToUnaffect);
    } else if (!isChecked.check && isChecked.init) {
      setagentToUnaffect(agentToUnaffect.filter((el) => el !== item.id_user));
      // if (agentToUnaffect.includes(item.id_user)) {
      // }
      //console.log("Unaffected on:", agentToUnaffect);
    }
    setLoading(false);

    return () => {
      setagentToAffect([]);
      setagentToUnaffect([]);
    };
  }, [isChecked]);

  // useEffect(() => {
  //   setLoading(true)
  //   if (affectedAgent.includes(item.id_user)) {
  //     setChecked({ check: true, init: true });
  //   }
  //   setLoading(false)

  //   return () => {
  //     setChecked({})
  //     setLoading(false)
  //   };
  // }, []);

  const onChecked = () => {
    setChecked({ ...isChecked, check: !isChecked.check });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <SkypeIndicator color="#99D98c" size={40} />
      </View>
    );
  }
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
        value={isChecked.check}
        onValueChange={onChecked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  touch: {
    height: 50,
    width: 110,
    maxWidth: 120,
    backgroundColor: "#99D98c",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 5,
    elevation: 0,
    flexDirection: "row",
    marginRight: 5,
  },
  touchAchat: {
    height: 50,
    width: width - 100,
    backgroundColor: "#99D98c",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  touchTxt: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  vignette: {
    width: width - 90,
    padding: 10,

    marginBottom: 10,
  },
  section: {
    flex: 1,
  },
  Card: {
    margin: 5,
    padding: 5,
    height: 90,
    width: width - 15,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
  },
  btnBlur: {
    // flex: 2,
    height: 55,
    width: 55,
    backgroundColor: "#99D98c",
    borderRadius: 40,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  delete: {
    // flex: 2,
    height: 35,
    width: 35,
    backgroundColor: "red",
    borderRadius: 20,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 20,
  },
  CardDelete: {
    margin: 5,
    padding: 5,
    height: 90,
    width: width - 50,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  inputBox: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontWeight: "bold",

    width: 250,
  },
  buttonGroup: {
    flexDirection: "row",
    height: 60,
    marginTop: 40,
  },
  button: {
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  btnLabel: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 14,
  },
});

export default Agent;
