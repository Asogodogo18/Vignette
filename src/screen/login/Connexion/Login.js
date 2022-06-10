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
import { AntDesign, Feather } from "@expo/vector-icons";
import { loginUser, useAuthState, useAuthDispatch } from "../../../global";

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation, route }) => {
  const { role } = route.params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureTextEntry, setisSecureTextEntry] = useState(false);
  const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook
  const { loading, errorMessage } = useAuthState();

  const loginHandle = async () => {
    if (username.length == 0 || password.length == 0) {
      Toast.show({
        type: "error",
        text1: "Veuillez renseigner les champs obligatoires",
      });
      return;
    }

    try {
      let response = await loginUser(dispatch, {
        username,
        password,
        role,
      }); //loginUser action makes the request and handles all the neccessary state changes
      if (!response) return;
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView contentContainerStyle={styles.container}>
      <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
        <ImageBackground
          style={styles.imgContainer}
          source={require("../../../../assets/bg-login-3.png")}
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="left" size={28} color="black" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Image
              source={require("../../../../assets/logo.png")}
              style={styles.headerImg}
            />
          </View>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Identifiant"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Mot de Passe"
              keyboardType="default"
              secureTextEntry
            >
              {/* <TouchableOpacity
                onPress={() => {
                  setisSecureTextEntry(!isSecureTextEntry);
                }}
              >
                {isSecureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity> */}
            </TextInput>
            <TouchableOpacity onPress={loginHandle} style={styles.loginBtn}>
              <Text style={styles.loginTxt}>se connecter</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: height / 3.5,
              left: 0,
              right: 0,
              paddingHorizontal: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("PassOublier")}
            >
              <Text>Mot de Passe Oublié?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => loginUser(dispatch, { role: "Anonyme" })}
            >
              <Text>Continuer sans compte</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Image
              resizeMode="cover"
              style={{ width: 150, height: 150 }}
              source={require("../../../../assets/cirtic-logo.png")}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1 },
  imgContainer: { width, height },
  backBtn: {
    marginTop: 40,
    height: 50,
    width: width / 6,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    borderRadius: 8,
    marginLeft: 5,
  },
  headerImg: {
    height: 110,
    width: "100%",
    marginTop: 30,
    margin: 5,
    alignSelf: "center",
  },
  content: {
    flex: 2,
    // marginVertical: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    // paddingVertical: 20,
    alignItems: "center",

    // backgroundColor: "white",
  },
  footer: {
    flex: 1,
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
    marginTop: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    height: 50,
    width: width / 1.15,
    backgroundColor: "lightblue",
    borderRadius: 8,
  },
  loginTxt: {
    fontSize: 18,
    color: "black",
  },
});
