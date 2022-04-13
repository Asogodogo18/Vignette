import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import COLORS from "../../Utils/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("screen");
const Input = ({ label, iconName, error, onFocus = () => {}, ...props }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ margin: 10 }}>
      {/* <Text style={style.label}>{label}</Text> */}
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
            alignItems: "center",
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ color: COLORS.darkBlue, fontSize: 22, marginRight: 10 }}
        />
        <TextInput
          autoCorrect={false}
          //   onFocus={() => {
          //     onFocus();
          //     setIsFocused(true);
          //   }}
          onBlur={() => setIsFocused(false)}
          style={{ color: COLORS.darkBlue, flex: 1 }}
          {...props}
        />
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
    padding: 5,
  },
  inputContainer: {
    height: 60,
    backgroundColor: COLORS.light,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    elevation: 5,
    width: width - 30,
    alignSelf: "center",
    borderRadius: 10,
  },
});

export default Input;
