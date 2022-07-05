import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { AntDesign, Feather } from "@expo/vector-icons";
import { loginUser, useAuthState, useAuthDispatch } from "../../../global";
import { ScrollView } from "react-native-gesture-handler";
import { checkUser, signUp } from "../../../services/query";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");

const SignUp = ({ navigation, route }) => {
  //   const { role } = route.params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureTextEntry, setisSecureTextEntry] = useState(false);
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adress, setAdress] = useState("");
  const [isPolitique, setIsPolitique] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook
  const { loading, errorMessage } = useAuthState();

  const isDisabled =
    !username ||
    !password ||
    !email ||
    !nom ||
    !prenom ||
    !adress ||
    !isPolitique ||
    !telephone;

  const userExist = () => {
    if (message) setMessage("");
    checkUser({ tel: telephone, login: username })
      .then((res) => {
        console.log(res);
        if (res.data.hasOwnProperty("message")) setMessage(res.data.message);
      })
      .catch((e) =>
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue",
        })
      );
  };
  const signUpHandle = async () => {
    if (username.length == 0 || password.length == 0) {
      Toast.show({
        type: "error",
        text1: "Veuillez renseigner les champs obligatoires",
      });
      return;
    }

    try {
      let response = await signUp({
        nom,
        prenom,
        adress,
        telephone,
        username,
        password,
        role: "1",
      }); //loginUser action makes the request and handles all the neccessary state changes
      if (!response) return;
      if (response.data === "true") {
        Toast.show({
          type: "success",
          text1: "Inscription Réussie",
        });
      } else throw new Error("Nous rencontrons des difficultés en ce moment");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      //console.log(error);
    }
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <KeyboardAvoidingView contentContainerStyle={styles.container}>
        <ImageBackground
          style={styles.imgContainer}
          source={require("../../../../assets/bg-login-3.png")}
        >
          <ScrollView contentContainerStyle={styles.content}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" size={28} color="black" />
            </TouchableOpacity>
            <Image
              source={require("../../../../assets/logobanner.jpeg")}
              style={styles.headerImg}
            />
            <TextInput
              style={styles.input}
              onChangeText={setNom}
              value={nom}
              placeholder="Nom"
              keyboardType="default"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPrenom}
              value={prenom}
              placeholder="Prenom"
              keyboardType="default"
            />
            <TextInput
              style={styles.input}
              onChangeText={setTelephone}
              value={telephone}
              placeholder="Telephone"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Non d'utlisateur"
              onSubmitEditing={userExist}
              keyboardType="default"
            />
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              onChangeText={setAdress}
              value={adress}
              placeholder="Adresse"
              keyboardType="default"
            />

            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Mot de Passe"
              keyboardType="default"
              secureTextEntry
            />
            <View style={styles.textPrivate}>
              <Checkbox
                style={{ width: 25, height: 25 }}
                value={isPolitique}
                onValueChange={setIsPolitique}
                color={!isPolitique ? "gray" : "lightgreen"}
              />
              <Text
                style={{
                  color: "black",
                  fontSize: 13,
                  fontWeight: "400",
                  marginLeft: 10,
                }}
              >
                En vous inscrivant, vous acceptez nos Conditions d'utilisation
                et Politique de confidentialité
              </Text>
            </View>
            <TouchableOpacity
              disabled={isDisabled}
              onPress={signUpHandle}
              style={
                isDisabled
                  ? { ...styles.disabledBtn, ...styles.loginBtn }
                  : styles.loginBtn
              }
            >
              <Text
                style={
                  isDisabled
                    ? [{ color: "gray" }, styles.loginTxt]
                    : styles.loginTxt
                }
              >
                S'inscrire
              </Text>
            </TouchableOpacity>
            {message ? (
              <Text
                style={{
                  fontSize: 12,
                  color: "red",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {message}
              </Text>
            ) : null}

            <View style={styles.footer}>
              <Image
                resizeMode="cover"
                style={{ width: 150, height: 150 }}
                source={require("../../../../assets/cirtic-logo.png")}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1 },
  imgContainer: { width, height },
  backBtn: {
    marginTop: 10,
    height: 50,
    width: width / 6,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    elevation: 5,
    borderRadius: 8,
    marginLeft: 5,
  },
  headerImg: {
    minHeight: 110,
    maxHeight: 210,
    width: "100%",
    marginTop: 25,
    margin: 5,
    alignSelf: "center",
  },
  content: {
    flexGrow: 1,
    // marginVertical: 120,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    // paddingVertical: 20,
    alignItems: "center",

    // backgroundColor: "red",
  },
  footer: {
    // flex: 1,
    alignItems: "center",
  },
  input: {
    height: 48,
    padding: 10,
    width: width / 1.15,
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    backgroundColor: "white",

    elevation: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightblue",
  },
  loginBtn: {
    marginTop: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    height: 50,
    width: width / 1.15,
    backgroundColor: "lightblue",
    borderRadius: 8,
    alignSelf: "center",
  },
  loginTxt: {
    fontSize: 18,
    color: "black",
  },
  textPrivate: {
    flexDirection: "row",

    marginTop: 10,
    alignItems: "center",
  },
  disabledBtn: {
    opacity: 0.5,
  },
});
