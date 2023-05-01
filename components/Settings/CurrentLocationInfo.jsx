import {
  faArrowsUpDown,
  faDroplet,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { API } from "../../api/weather-api";
import { THEME, useSettings, useTheme } from "../../common/context";
import CustomText from "../Custom/CustomText";
import Loading from "../Loading";
import Sun from "../Sun";

export default function CurrentLocationInfo({ setIsDay }) {
  const { theme, setTheme } = useTheme();
  const { storage } = useSettings();
  const windFormat = () => {
    const format = storage["@storage_wind"];
    if (format === "mph") {
      return currentInfo.current.wind_mph + "m/h";
    } else return currentInfo.current.wind_kph + "km/h";
  };
  const tempFormat = () => {
    const format = storage["@storage_temp"];
    if (format === "fahrenheit") {
      return currentInfo.current.temp_f.toFixed(0);
    } else return currentInfo.current.temp_c.toFixed(0);
  };

  const [isFetching, setIsFetching] = useState(false);
  const [currentInfo, setCurrentInfo] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    API.getIPweather()
      .then((response) => {
        setCurrentInfo(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsFetching(false));
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <>
      {!!currentInfo && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: "#9bacb8" }}>
            Your Location Now
          </Text>
          <View
            style={{
              marginVertical: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24 }}>{currentInfo.location.name}</Text>
            <CustomText style={{ fontSize: 20 }}>
              {currentInfo.location.country}
            </CustomText>
          </View>

          <Sun
            style={{
              marginVertical: 30,
              borderRadius:
                Math.round(
                  Dimensions.get("window").width +
                    Dimensions.get("window").height
                ) / 2,
              width: Dimensions.get("window").width * 0.5,
              height: Dimensions.get("window").width * 0.5,
            }}
          />

          <View>
            <CustomText
              style={{
                fontSize: 18,
                alignSelf: "flex-start",
                backgroundColor: theme.lightBg,
                paddingHorizontal: 7,
                paddingVertical: 5,
                borderRadius: 15,
              }}
            >
              {currentInfo.current.condition.text}
            </CustomText>
          </View>

          <CustomText style={{ fontSize: 96, marginVertical: 20 }}>
            {tempFormat()}°C
          </CustomText>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
              marginBottom: 30,
            }}
          >
            <View style={styles.item_weather}>
              <FontAwesomeIcon icon={faDroplet} style={{ color: "#6686b6" }} />
              <CustomText style={styles.item_weather_text}>
                {currentInfo.current.humidity}%
              </CustomText>
            </View>
            <View style={styles.item_weather}>
              <FontAwesomeIcon
                icon={faArrowsUpDown}
                style={{ color: "#6686b6" }}
              />
              <CustomText style={styles.item_weather_text}>
                {currentInfo.current.pressure_mb}mBar
              </CustomText>
            </View>
            <View style={styles.item_weather}>
              <FontAwesomeIcon icon={faWind} style={{ color: "#6686b6" }} />
              <CustomText style={styles.item_weather_text}>
                {windFormat()}
              </CustomText>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  item_weather: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  item_weather_text: {
    fontSize: 16,
  },
});
