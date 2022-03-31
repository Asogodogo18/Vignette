import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Index = ({ navigation }) => {
  const Navigation = useNavigation();
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.headerImg}
        />
        <Text style={styles.text_header}>Inscription</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={300}
        delay={500}
        style={styles.footer}
      >
        <ScrollView>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Votre Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={styles.text_footer}>E-mail</Text>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="email-outline"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="votre e-mail"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={styles.text_footer}>Telephone</Text>
          <View style={styles.action}>
            <Feather name="smartphone" size={20} color="black" />

            <TextInput
              placeholder="votre numero telephone"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Mot de pass
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Votre mote de pass"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Confirm mot de pass
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm mot de pass"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              En vous inscrivant, vous acceptez notre
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Conditions d'utilisation
            </Text>
            <Text style={styles.color_textPrivate}> et</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Politique de confidentialité
            </Text>
          </View>
          <View>
            <View
              style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}
            >
              <LinearGradient
                colors={["#34c747", "#00FFFF"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 2.0, y: 2.0 }}
                style={{
                  height: 48,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 250,
                  elevation: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    Navigation.navigate("Connexion");
                  }}
                  style={styles.touch1}
                >
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome5
                      name="sign-in-alt"
                      size={24}
                      color="white"
                      style={{ marginLeft: 15, marginTop: 10 }}
                    />
                    <Text style={styles.text}>S'inscrier</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <View>
              <Text style={{ textAlign: "center" }}>
                Avez vous déja un compte ?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate("Connexion");
                }}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  connecté vous avec votre compte
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  headerImg: {
    height: 100,
    width: "100%",
  },
  footer: {
    flex: 1.5,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 30,
    elevation: 2,
    padding: 10,
  },
  text_header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    color: "black",
    backgroundColor: "red",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  touch1: {
    width: Dimensions.get("screen").width - 150,

    height: 50,

    marginTop: 10,
    marginLeft: 50,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    paddingTop: 10,
    //marginLeft: 30,
    left: 10,
    textAlign: "center",
  },
});
