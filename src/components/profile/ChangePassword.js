import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground,
    SafeAreaView,
    TextInput,
  } from "react-native";
  import React, { useState, useRef } from "react";
  import * as Animatable from "react-native-animatable";
  import Toast from "react-native-toast-message";
  import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
  import { useAuthState } from "../../global";
  import { updatePassword } from "../../services/query";
  const { width, height } = Dimensions.get("screen");
  
  function ChangePassword({ setCurrentLoader }) {
    const { user, isSignedIn } = useAuthState();
    const [actuel, setactuel] = useState("");
    const [newpass, setnewpass] = useState("");
    const [confirmpass, setconfirmpass] = useState("");
    const [isChanged, setIsChanged] = useState(false);
   
  
    const handleSave = () => {
      updatePassword({
        actuel,
        newpass,
        confirmpass,
        pass: actuel,
        id_user: user.id_user,
      })
        .then((res) => {
          console.log("change password:", res)
          if (res.data == "true") {
            Toast.show({
              type: "success",
              text1: "Vos Modifiactions ont ete enregistre!",
            });
            setCurrentLoader(null);
          } else {
            Toast.show({
              type: "error",
              text1: "Une erreur est survenue, \nVeuillez ressayer!",
            });
          }
        })
        .catch((e) =>
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue, Veuillez ressayer!",
            text2: e.toString(),
          })
        );
    };
  
    return (
      <SafeAreaView>
        <View
          style={{
            height: 80,
            backgroundColor: "#1a1818",
            flexDirection: "row",
            elevation: 5,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity onPress={() => setCurrentLoader(null)}>
            <Ionicons name="ios-arrow-undo" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
            Espace Superviseur
          </Text>
          <TouchableOpacity onPress={() => setCurrentLoader(null)}>
            <Entypo name="cross" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Animatable.View animation="fadeIn">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ padding: 5, margin: 10 }}>
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                Modification du Mot de Passe
              </Text>
            </View>
  
            <View style={{ padding: 10 }}>
              <Text style={styles.label}>
                Mot de Passe Actuel
                <TextInput
                  onChange={() => (isChanged ? null : setIsChanged(true))}
                  style={styles.txt}
                  value={actuel}
                  placeholder="*******"
                  secureTextEntry
                  onChangeText={setactuel}
                />
              </Text>
              <Text style={styles.label}>
                Nouveau Mot de Passe
                <TextInput
                  onChange={() => (isChanged ? null : setIsChanged(true))}
                  style={styles.txt}
                  placeholder="*******"
                  secureTextEntry
                  value={newpass}
                  onChangeText={setnewpass}
                />
              </Text>
              
              
              <Text style={styles.label}>
                Comfirmer le Mot de Passe
                <TextInput
                  onChange={() => (isChanged ? null : setIsChanged(true))}
                  style={styles.txt}
                  secureTextEntry
                  placeholder="*******"
                  value={confirmpass}
                  onChangeText={setconfirmpass}
                />
              </Text>
            </View>
            <View
              style={{
                padding: 2,
                margin: 2,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                disabled={!isChanged}
                onPress={handleSave}
                style={isChanged && styles.touch}
              >
                <MaterialCommunityIcons
                  name="file-document-edit-outline"
                  size={24}
                  color="white"
                />
                <Text style={styles.touchTxt}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    contain: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
    },
    touch: {
      height: 50,
      width: 150,
      maxWidth: 230,
      // backgroundColor: "#99D98c",
      backgroundColor: "#1a1818",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
      flexDirection: "row",
      margin: 5,
    },
  
    touchTxt: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    txt: {
      color: "gray",
      fontSize: 20,
      fontWeight: "bold",
      maxWidth: 250,
      minWidth: 50,
      marginLeft: 20,
      height: 40,
      padding: 10,
      marginVertical:5
    },
  
    Card: {
      flex: 1,
      margin: 10,
      padding: 15,
      backgroundColor: "white",
      maxHeight: 250,
      minHeight: 90,
      width: width - 20,
      alignSelf: "center",
      elevation: 5,
      borderRadius: 15,
      // marginVertical: 50,
    },
  
    text: {
      textAlign: "center",
      textTransform: "uppercase",
      alignContent: "center",
      color: "white",
      fontSize: 15,
    },
    label: {
      flex: 1,
      flexDirection: "row",
      color: "black",
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 15,
    },
  });
  export default ChangePassword;
  