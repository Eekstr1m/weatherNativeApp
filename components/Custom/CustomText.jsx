import React from "react";
import { Text } from "react-native";
import { useTheme } from "../../common/context";

export default function CustomText({ children, style }) {
  const { theme } = useTheme();
  return <Text style={[{ color: theme.textColor }, style]}>{children}</Text>;
}
