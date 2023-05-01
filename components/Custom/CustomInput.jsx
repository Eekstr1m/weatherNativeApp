import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../../common/context";

export default function CustomInput(props) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={[
        props.style,
        styles.customInputBlock,
        isFocused && styles.customInputFocus,
      ]}
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={{ color: theme.textColor }}
      />
      <TextInput
        {...props}
        style={[
          props.style,
          styles.customInputText,
          { color: theme.textColor },
        ]}
        placeholderTextColor={theme.textColor}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  customInputFocus: {
    borderWidth: 1,
    borderColor: "#6686b6",
    borderRadius: 10,
  },
  customInputBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  customInputText: {
    paddingHorizontal: 20,
  },
});
