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
  Keyboard,
  FlatList,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import Input from "../../../components/TextInput";
import * as Animatable from "react-native-animatable";
import {
  Ionicons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import Guichet from "../../../components/shared/Guichet";
import { useGuichets, useUsers } from "../../../services/query";
import Checkbox from "expo-checkbox";
import { BlurView } from "expo-blur";
const { width, height } = Dimensions.get("screen");

const Index = ({ navigation }) => {
  Keyboard.dismiss();
  const { data:userData, error:userError, isFetching:isFetchingUsers } = useUsers();
  const { status, data, error, isFetching } = useGuichets();
  const [currentLoader, setCurrentLoader] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [isDelete, setIsDelete] = useState(null);
  const [numero, setNumero] = useState(null);
  const [operationItem, setOperationItem] = useState(null)

  console.log("guichet:",data)

  const renderAgent =({item})=>{
    return(
      <View
              style={{
                flexDirection: "row",
                height: 50,
                width: width,
                alignSelf: "center",
                justifyContent: "space-around",
                alignItems: "center",
                marginVertical:8
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
                  source={require("../../../../assets/icon/agent3.png")}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                  resizeMode="contain"
                />
              </View>

              <View style={[styles.vignette, { width: 150 }]}>
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
                onValueChange={setChecked}
              />
            </View>
    )
  }
  const handlePress = (loader,item) => {
    setCurrentLoader(loader);
    setOperationItem(item)
  };
  if (!currentLoader) {
    return (
      <SafeAreaView>
          <Animatable.View
            animation="fadeIn"
            delay={500}
            duration={300}
            stickyHeaderHiddenOnScroll={true}
            nestedScrollEnabled
            stickyHeaderIndices={[0]}
            contentContainerStyle={styles.contain}
          >
            <View
              style={{
                height: 80,
                backgroundColor: "#1a1818",
                flexDirection: "row",
                elevation: 5,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
                <Ionicons name="ios-arrow-undo" size={30} color="white" />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "white",
                  textAlign: "center",
                  marginLeft: 10,
                }}
              >
                GUICHET
              </Text>
              <Image
                source={require("../../../../assets/icon/guichet.png")}
                style={{ height: 40, width: 40 }}
                resizeMode="cover"
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginHorizontal: 10,
                padding: 10,
              }}
            >
              Action Rapide
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 2,
                margin: 2,
                // position: "relative",
                // marginHorizontal: 240,

                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handlePress("Ajouter")}
                style={styles.touch}
              >
                <AntDesign name="addfolder" size={24} color="white" />
                <Text style={styles.touchTxt}>Ajouter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress("Modify")}
                style={styles.touch}
              >
                <MaterialCommunityIcons
                  name="file-document-edit-outline"
                  size={24}
                  color="white"
                />
                <Text style={styles.touchTxt}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsDelete(!isDelete)}
                style={styles.touch}
              >
                <AntDesign name="delete" size={24} color="white" />
                <Text style={styles.touchTxt}>Supprimer</Text>
              </TouchableOpacity>
            </View>

           
          </Animatable.View>

          {isFetching ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginVertical: 5, paddingHorizontal: 5 }}
            data={data}
            renderItem={({item})=> <Guichet handlePress={handlePress} item={item} isDelete={isDelete} />}
            keyExtractor={(item) => item.id_guichet}
          />
        )}

      </SafeAreaView>
    );
  }
  if (currentLoader == "Ajouter") {
    return (
      <SafeAreaView>
        <Animatable.View animation="fadeIn">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
              <TouchableOpacity onPress={() => navigation.push("Guichet")}>
                <Ionicons name="ios-arrow-undo" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
                {currentLoader == "Ajouter" ? "Ajout du Guichet" : null}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
                <Entypo name="cross" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 5, margin: 10 }}>
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                Veuillez Ajouter un Guichet
              </Text>
            </View>
            <View style={styles.container}>
              <ImageBackground
                source={require("../../../../assets/icon/bg-buy.png")}
                resizeMode="cover"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: height - 200,
                }}
              >
                <BlurView intensity={20} style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setNumero}
                    value={numero}
                    placeholder="N° du Guichet"
                  />

                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={[styles.button, { backgroundColor: "black" }]}
                    >
                      <Text style={styles.btnLabel}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: "green" }]}
                    >
                      <Text style={styles.btnLabel}>Ajouter</Text>
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </ImageBackground>
            </View>
          </ScrollView>
        </Animatable.View>
      </SafeAreaView>
    );
  }
  if (currentLoader == "Modify") {
    return (
      <SafeAreaView>
        <Animatable.View animation="fadeIn">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
              <TouchableOpacity onPress={() => navigation.push("Guichet")}>
                <Ionicons name="ios-arrow-undo" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
                {currentLoader == "Modify" ? "Modification" : null}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
                <Entypo name="cross" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 5, margin: 10, marginVertical: 20 }}>
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                Veuillez Modifier le Guichet
              </Text>
            </View>
            <View style={styles.container}>
              <ImageBackground
                source={require("../../../../assets/icon/bg-buy.png")}
                resizeMode="cover"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: height - 200,
                }}
              >
                <BlurView intensity={20} style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setNumero}
                    value={numero}
                    placeholder="N° du Guichet"
                  />

                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={[styles.button, { backgroundColor: "black" }]}
                    >
                      <Text style={styles.btnLabel}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: "green" }]}
                    >
                      <Text style={styles.btnLabel}>Modifier</Text>
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </ImageBackground>
            </View>
          </ScrollView>
        </Animatable.View>
      </SafeAreaView>
    );
  }
  if (currentLoader == "Affectation") {

    return (
      <SafeAreaView>
        <Animatable.View animation="fadeIn">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                {currentLoader == "Affectation"
                  ? "Affectation Du Guichet"
                  : null}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
                <Entypo name="cross" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 5, margin: 10, marginVertical: 20 }}>
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                Veuillez Affecter un Agent au Guichet
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                backgroundColor: "gray",
                height: 50,
                width: width - 10,
                alignSelf: "center",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>
                Agent
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>
                Action
              </Text>
            </View>
            {
              isFetchingUsers?(<View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="large" />
              </View>):
              (
                <FlatList
                showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: "center",
                    paddingBottom: 50,
                  }}
                  data={userData.filter(user=> user.role==="Agent")}
                  renderItem={renderAgent}
                  keyExtractor={(item) => item.id_user}
                />
              )
            }
            
            <Divider
              style={{
                backgroundColor: "black",
                width: width - 110,
                alignSelf: "center",
                borderWidth: 0.2,
                marginTop: 25,
              }}
            />

            <View style={{ margin: 20, padding: 5, marginVertical: 50 }}>
              <TouchableOpacity style={styles.touchAchat}>
                <MaterialCommunityIcons
                  name="code-less-than-or-equal"
                  size={24}
                  color="white"
                />
                <Text style={styles.touchTxt}>Affecter</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </SafeAreaView>
    );
  }
};

export default Index;

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: "row",
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
    color: "white",
    fontSize: 18,
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
