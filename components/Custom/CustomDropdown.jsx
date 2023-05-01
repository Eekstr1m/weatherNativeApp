import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useSettings, useTheme } from "../../common/context";

export default function CustomDropdown(props) {
  const { storeData } = useSettings();
  const { theme } = useTheme();

  const [value, setValue] = useState(props.test);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View
    // style={{ backgroundColor: theme.bg }}
    >
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={[
          styles.selectedTextStyle,
          { color: theme.textColor },
        ]}
        data={props.data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          storeData(props.title, item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: 110,
    textAlign: "center",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: "right",
    paddingRight: 10,
  },
});
