import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { SkypeIndicator } from "react-native-indicators";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, AntDesign, Ionicons } from "@expo/vector-icons";

import { loginUser, useAuthState, useAuthDispatch } from "../../../global";

const { width, height } = Dimensions.get("screen");

import { Feather, FontAwesome } from "@expo/vector-icons";

const Index = ({ navigation, route }) => {
  const { role } = route.params;

  const Navigation = useNavigation();
  const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook
  const { loading, errorMessage } = useAuthState(); //read the values of loading and errorMessage from context

  const [data, setData] = React.useState({
    username: "",
    password: "",
    role,
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = async () => {
    // fetch("http://mairie.demofamib.com/api", {
    //   method: "POST",
    //   body: JSON.stringify({ login: data.username, pass: data.password }),
    //   // headers: {
    //   //   "Content-type": "application/json; charset=UTF-8",
    //   // },
    // })
    //   .then((response) => response.json())
    //   .then((json) => //console.log(json))
    //   .catch((e) => //console.log(e));

    if (data.username.length == 0 || data.password.length == 0) {
      Toast.show({
        type: "error",
        text1: "Veuillez renseigner les champs obligatoires",
      });
      return;
    }

    try {
      let response = await loginUser(dispatch, data); //loginUser action makes the request and handles all the neccessary state changes
      if (!response) return;
    } catch (error) {
      //console.log(error);
    }
    console.log("connection", data);
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          backgroundColor: "#1a1818",
          alignItems: "center",
          height: 75,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 15, marginLeft: 20 }}
        >
          <Ionicons name="arrow-back" size={40} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "white",
            letterSpacing: 2,
            // marginLeft: 60,
            marginTop: 10,
            textAlign: "center",
            width: 120,
          }}
        >
          {role}
        </Text>
        <Image
          source={require("../../../../assets/icon/logobko1.png")}
          style={{ height: 40, width: 40, marginTop: 10 }}
          resizeMode="cover"
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 1 }}>
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
          <View style={{ padding: 10 }}>
            <Text style={styles.text_footer}>Nom d'utilisateur ou E-mail</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="gray" size={20} />
              <TextInput
                placeholder="Votre Nom d'utilisateur ou E-mail"
                placeholderTextColor="#666666"
                value={data.username}
                onChangeText={textInputChange}
                style={[styles.textInput]}
                autoCapitalize="none"
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.isValidUser ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Le nom d'utilisateur doit contenir au minimum 4 caracteres.
                </Text>
              </Animatable.View>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  color: "white",
                  marginTop: 35,
                },
              ]}
            >
              Mot de Passe
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="gray" size={20} />
              <TextInput
                placeholder="Votre Mot de Pass"
                placeholderTextColor="#666666"
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
            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Le Mot de Passe doit avoir au minimum 8 caracteres.
                </Text>
              </Animatable.View>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate("PassOublier")}
            >
              <Text style={{ color: "#fff", marginTop: 15 }}>
                Mot de pass oublier ?
              </Text>
            </TouchableOpacity>
            <View>
              <View style={{ marginTop: 10, alignItems: "center" }}>
                {loading ? (
                  <SkypeIndicator color="#99D98c" size={40} />
                ) : (
                  <LinearGradient
                    colors={["#1a1818", "#FFFF"]}
                    start={{ x: 0.1, y: 2.0 }}
                    end={{ x: 2.0, y: 0.1 }}
                    style={{
                      height: 48,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: 200,
                      elevation: 5,
                    }}
                  >
                    <TouchableOpacity
                      onPress={loginHandle}
                      style={[
                        styles.touch1,
                        { flexDirection: "row", alignItems: "center" },
                      ]}
                    >
                      <FontAwesome5
                        name="sign-in-alt"
                        size={24}
                        color="white"
                        style={{ marginLeft: 5 }}
                      />
                      <Text style={styles.text}> Se Connecter</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                )}
              </View>

              <View style={{ marginTop: 15 }}>
                <Text style={{ textAlign: "center", color: "white" }}>
                  Vous n'avez pas de compte ?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Navigation.navigate("Inscription");
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Cr??er Un compte d??s maintenant
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  header: {
    // flex: 1,
    height: 80,
    width: width,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 100,
    elevation: 2,
  },
  headerImg: {
    height: 120,
    width: "100%",
    // position: "absolute",
    // bottom: 20,
    marginTop: 20,
    margin: 10,
    alignSelf: "center",
  },
  footer: {
    backgroundColor: "#1a1818",
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 5,
    padding: 5,
    width: width - 15,
    alignSelf: "center",
    marginTop: 20,
    marginVertical: 0,
    borderRadius: 50,
    opacity: 0.5,
    // marginBottom: 80,
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
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    alignItems: "center",
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
    marginTop: 2,
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
});
