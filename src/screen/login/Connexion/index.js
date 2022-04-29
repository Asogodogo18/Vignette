import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

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
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.headerImg}
        />
        <View style={styles.imgBox}>
          {/* <Image
            // source={item}
            // source={{ uri: `${item}` }}
            style={{ height: 100, width: 100 }}
            resizeMode="contain"
          /> */}
        </View>
        {/* <Text style={styles.text_header}>Connexion</Text> */}
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        duration={300}
        delay={500}
        style={styles.footer}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 15 }}>
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

          <TouchableOpacity onPress={() => navigation.navigate("PassOublier")}>
            <Text style={{ color: "#fff", marginTop: 15 }}>
              Mot de pass oublier ?
            </Text>
          </TouchableOpacity>
          <View>
            <View style={{ marginTop: 10, alignItems: "center" }}>
              {loading ? (
                <ActivityIndicator size="large" />
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
                      style={{ marginLeft: 0, marginRight: 5 }}
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
                  Créer Un compte dès maintenant
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
    flex: 2,
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
    flex: 2,
    backgroundColor: "#1a1818",
    paddingHorizontal: 20,
    paddingVertical: 30,
    elevation: 10,
    padding: 5,
    width: width - 15,
    alignSelf: "center",
    marginTop: -150,
    marginVertical: 20,
    borderRadius: 50,
    opacity: 0.2,
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
    width: Dimensions.get("screen").width - 150,

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
