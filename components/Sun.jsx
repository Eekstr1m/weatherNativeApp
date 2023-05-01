import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../common/context";

export default function Sun(props) {
  const { theme } = useTheme();
  return (
    <LinearGradient
      {...props}
      // colors={["#FFBC7C", "#FF52A7"]}
      colors={[theme.first, theme.second]}
      start={{ x: 0, y: 0.4 }}
      style={[props.style, styles.sun, { shadowColor: theme.avg }]}
    />
  );
}

const styles = StyleSheet.create({
  sun: {
    // shadowColor: "#ff52a7",
    // shadowColor: theme.avg,
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.78,
    elevation: 15,
  },
});
