import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { THEME, useSettings, useTheme } from "../common/context";
import CustomDropdown from "../components/Custom/CustomDropdown";
import CustomText from "../components/Custom/CustomText";
import NavigationBlock from "../components/NavigationBlock";
import CurrentLocationInfo from "../components/Settings/CurrentLocationInfo";

export default function SettingsScreen() {
  const { storage } = useSettings();
  const { theme } = useTheme();

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: theme.bg,
          paddingTop: StatusBar.currentHeight,
          paddingHorizontal: 15,
        }}
      >
        <CurrentLocationInfo />
        <View style={{ alignItems: "center" }}>
          <View style={{ width: "100%", gap: 20, marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomText style={{ fontSize: 18 }}>Temperature</CustomText>
              {/* <CustomText style={{ fontSize: 18 }}>Celsius</CustomText> */}
              <CustomDropdown
                data={[
                  { label: "Celsius", value: "celsius" },
                  { label: "Fahrenheit", value: "fahrenheit" },
                ]}
                title={"@storage_temp"}
                test={storage["@storage_temp"]}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomText style={{ fontSize: 18 }}>Wind Speed</CustomText>
              {/* <CustomText style={{ fontSize: 18 }}>km/h</CustomText> */}
              <CustomDropdown
                data={[
                  { label: "km/h", value: "kph" },
                  { label: "m/h", value: "mph" },
                ]}
                title={"@storage_wind"}
                test={storage["@storage_wind"]}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomText style={{ fontSize: 18 }}>Time Format</CustomText>
              {/* <CustomText style={{ fontSize: 18 }}>24h</CustomText> */}
              <CustomDropdown
                data={[
                  { label: "24H", value: "24h" },
                  { label: "12H", value: "12h" },
                ]}
                title={"@storage_time"}
                test={storage["@storage_time"]}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <NavigationBlock />
    </>
  );
}

const styles = StyleSheet.create({});
