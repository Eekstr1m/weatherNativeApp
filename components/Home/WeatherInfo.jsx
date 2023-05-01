import {
  faArrowsUpDown,
  faDroplet,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSettings } from "../../common/context";
import CustomText from "../Custom/CustomText";

export default function WeatherInfo({ current }) {
  const { storage } = useSettings();
  const windFormat = () => {
    const format = storage["@storage_wind"];
    if (format === "mph") {
      return current.wind_mph + "m/h";
    } else return current.wind_kph + "km/h";
  };

  return (
    <View style={styles.weather}>
      {!!current && (
        <>
          <View style={styles.weather_item}>
            <FontAwesomeIcon icon={faDroplet} style={{ color: "#6686b6" }} />
            <CustomText style={styles.weather_text}>
              {current.humidity}%
            </CustomText>
          </View>
          <View style={styles.weather_item}>
            <FontAwesomeIcon
              icon={faArrowsUpDown}
              style={{ color: "#6686b6" }}
            />
            <CustomText style={styles.weather_text}>
              {current.pressure_mb}mBar
            </CustomText>
          </View>
          <View style={styles.weather_item}>
            <FontAwesomeIcon icon={faWind} style={{ color: "#6686b6" }} />
            <CustomText style={styles.weather_text}>{windFormat()}</CustomText>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  weather: {
    flex: 1,
    flexDirection: "row",
    gap: 110,
    marginVertical: 30,
    justifyContent: "center",
  },
  weather_item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  weather_text: {
    fontSize: 16,
  },
});
