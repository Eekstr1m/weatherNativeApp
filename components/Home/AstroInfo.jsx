import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSettings, useTheme } from "../../common/context";
import CustomText from "../Custom/CustomText";

export default function AstroInfo({ astro }) {
  const { theme } = useTheme();
  const { storage } = useSettings();
  const timeFormat = (time) => {
    const format = storage["@storage_time"];
    if (format === "24h") {
      return time.timeConvert();
    } else return time;
  };

  return (
    <View style={{ height: 100 }}>
      {!!astro && (
        <>
          <View style={styles.sunrise}>
            <LinearGradient
              colors={["#FFBC7C", "#FF52A7"]}
              start={{ x: 0, y: 0.4 }}
              style={styles.astro_icon}
            />
            <CustomText style={styles.astro_time}>
              {timeFormat(astro.sunrise)}
            </CustomText>
          </View>
          <Svg width="120%" height="100" style={styles.astro_line}>
            <Path d="M0 15 Q 125 0, 250 50 T 500 85" stroke={theme.textColor} />
          </Svg>
          <View style={styles.sunset}>
            <CustomText style={styles.astro_time}>
              {timeFormat(astro.sunset)}
            </CustomText>
            <LinearGradient
              colors={["#21B2FE", "#C65AE9"]}
              start={{ x: 0, y: 0.4 }}
              style={styles.astro_icon}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  astro_line: {
    position: "absolute",
    left: -15,
  },
  astro_icon: {
    // flex: 1,
    width: 25,
    height: 25,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
  },
  sunrise: {
    position: "absolute",
    bottom: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  sunset: {
    position: "absolute",
    top: 40,
    right: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  astro_time: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});
