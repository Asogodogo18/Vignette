import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Feather, FontAwesome } from "@expo/vector-icons";

const Index = ({ navigation }) => {
  const Navigation = useNavigation();
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  // const { colors } = useTheme();

  // const { signIn } = React.useContext(AuthContext);

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

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter((item) => {
      return userName == item.username && password == item.password;
    });

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Username or password field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert("Invalid User!", "Username or password is incorrect.", [
        { text: "Okay" },
      ]);
      return;
    }
    signIn(foundUser);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.headerImg}
        />
        {/* <Text style={styles.text_header}>Connexion</Text> */}
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        duration={300}
        delay={200}
        style={[
          styles.footer,
          {
            backgroundColor: "#f5f5f5",
          },
        ]}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text
            style={[
              styles.text_footer,
              {
                color: "black",
              },
            ]}
          >
            Nom d'utilisateur ou E-mail
          </Text>
          <View style={styles.action}>
            {/* <FontAwesome name="user-o" color="gray" size={20} /> */}
            <TextInput
              // left={<TextInput.Icon name="login" />}
              // mode="outlined"
              placeholder="Votre Nom d'utilisateur ou E-mail"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: "black",
                },
              ]}
              autoCapitalize="none"
              // onChangeText={(val) => textInputChange(val)}
              // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
                Username must be 4 characters long.
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                color: "black",
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="gray" size={20} />
            <TextInput
              placeholder="Votre Mot de Pass"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: "black",
                },
              ]}
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
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}

          <TouchableOpacity>
            <Text style={{ color: "#009387", marginTop: 15 }}>
              Mot de pass oublier ?
            </Text>
          </TouchableOpacity>
          <View>
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <LinearGradient
                colors={["#34c747", "#00FFFF"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 2.0, y: 2.0 }}
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
                  onPress={() => {
                    navigation.replace("Accueil");
                  }}
                  style={styles.touch1}
                >
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome5
                      name="sign-in-alt"
                      size={24}
                      color="white"
                      style={{ marginLeft: 0, marginTop: 10 }}
                    />
                    <Text style={styles.text}>Connecté</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={{ textAlign: "center" }}>
                Vous n'avez pas de compte ?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate("Inscription");
                }}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
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
    backgroundColor: "black",
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

    marginBottom: 10,

    marginTop: 10,
    marginLeft: 50,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    paddingTop: 10,
    //marginLeft: 30,
    left: 30,
    textAlign: "center",
  },
});
