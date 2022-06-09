import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");
const Index = ({ navigation }) => {
  const [isPolitique, setIsPolitique] = useState(false);
  const Navigation = useNavigation();
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    nom: "",
    prenom: "",
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.headerImg}
        />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={300}
        delay={500}
        style={styles.footer}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.text_footer}>Nom d'utilisateur</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="gray" size={20} />
            <TextInput
              placeholder="Votre Nom d'utilisateur"
              placeholderTextColor="gray"
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
          <Text style={styles.text_footer}>Nom</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="gray" size={20} />
            <TextInput
              placeholder="Votre Nom"
              placeholderTextColor="gray"
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
          <Text style={styles.text_footer}>Prenom</Text>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="email-outline"
              color="gray"
              size={20}
            />
            <TextInput
              placeholder="votre Prenom"
              placeholderTextColor="gray"
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
            <Feather name="smartphone" size={20} color="gray" />

            <TextInput
              placeholder="votre numero telephone"
              placeholderTextColor="gray"
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
                marginTop: 5,
              },
            ]}
          >
            Mot de pass
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="gray" size={20} />
            <TextInput
              placeholder="Votre mote de pass"
              placeholderTextColor="gray"
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
                marginTop: 5,
              },
            ]}
          >
            Confirm mot de pass
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="gray" size={20} />
            <TextInput
              placeholder="Confirm mot de pass"
              placeholderTextColor="gray"
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
            <Checkbox
              style={{ width: 25, height: 25 }}
              value={isPolitique}
              onValueChange={setIsPolitique}
              color={isPolitique ? "gray" : undefined}
            />
            <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
              En vous inscrivant, vous acceptez notre Conditions d'utilisation
              et Politique de confidentialité
            </Text>
          </View>

          <View
            style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}
          >
            <LinearGradient
              colors={["#1a1818", "#FFFF"]}
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
            <Text style={{ textAlign: "center", color: "white" }}>
              Avez vous déja un compte ?
            </Text>
            <TouchableOpacity
              onPress={() => {
                Navigation.navigate("Connexion");
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                connecté vous avec votre compte
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerImg: {
    height: 120,
    width: "100%",
    // position: "absolute",
    // bottom: 20,
    marginTop: 50,
  },
  footer: {
    backgroundColor: "#1a1818",
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 5,
    padding: 10,
    width: width - 15,
    alignSelf: "center",
    // marginTop: -150,
    // marginVertical: 10,
    borderRadius: 50,
    opacity: 0.5,
  },
  text_header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "white",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
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

    paddingLeft: 10,
    color: "white",
    padding: 10,
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
    color: "white",
    backgroundColor: "red",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  touch1: {
    minWidth: 250,
    maxWidth: 350,
    paddingVertical: 10,
    height: 50,

    marginBottom: 10,

    marginTop: 10,
    marginLeft: 50,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",

    //marginLeft: 30,
    left: 30,
    textAlign: "center",
  },
  textPrivate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
  },
});
