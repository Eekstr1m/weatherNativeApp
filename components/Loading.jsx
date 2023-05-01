import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../common/context";

export default function Loading() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.bg,
      }}
    >
      <ActivityIndicator size={60} color={theme.avg} />
    </View>
  );
}
