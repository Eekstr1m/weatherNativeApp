import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useSettings, useTheme } from "../../common/context";
import CustomText from "../Custom/CustomText";

export default function LocationInfo({ location, current }) {
  const { theme } = useTheme();
  const { storage } = useSettings();
  const tempFormat = () => {
    const format = storage["@storage_temp"];
    if (format === "fahrenheit") {
      return current.temp_f.toFixed(0);
    } else return current.temp_c.toFixed(0);
  };

  return (
    <View style={styles.sun_block}>
      {!!location && !!current && (
        <View
          style={{
            marginTop: StatusBar.currentHeight,
          }}
        >
          <CustomText style={styles.city}>{location.name}</CustomText>
          <Text style={styles.country}>{location.country}</Text>
          <CustomText style={styles.temp}>{tempFormat()}°</CustomText>
          <CustomText
            style={[styles.condition, { backgroundColor: theme.lightBg }]}
          >
            {current.condition.text}
          </CustomText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sun_block: {
    height: 310,
    // backgroundColor: "#777",
    justifyContent: "center",
  },
  city: {
    fontSize: 34,
    alignItems: "center",
  },
  country: {
    fontSize: 18,
    color: "#9bacb8",
  },
  temp: {
    fontSize: 90,
    paddingVertical: 10,
  },
  condition: {
    fontSize: 16,
    alignSelf: "flex-start",

    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 15,
  },
});
