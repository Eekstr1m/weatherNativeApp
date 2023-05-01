import { faDroplet, faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { API } from "../../api/weather-api";
import { useSettings, useTheme } from "../../common/context";
import CustomText from "../Custom/CustomText";
import Loading from "../Loading";

export default function PopularLocationBlock() {
  const popularCities = [
    { name: "London" },
    { name: "Dubai" },
    { name: "Bangkok" },
    { name: "Tokyo" },
    { name: "Los-Angeles" },
    { name: "Rio de Janeiro" },
  ];

  return (
    <>
      <Text style={styles.popularTitle}>Popular locations</Text>
      <View style={styles.popularBlock}>
        {popularCities.map((item, index) => (
          <PopularLocationItem key={index} item={item} />
        ))}
      </View>
    </>
  );
}

function PopularLocationItem({ item }) {
  const { theme } = useTheme();
  const [cityInfo, setCityInfo] = useState(null);

  const { storage } = useSettings();
  const tempFormat = () => {
    const format = storage["@storage_temp"];
    if (format === "fahrenheit") {
      return cityInfo.current.temp_f.toFixed(0);
    } else return cityInfo.current.temp_c.toFixed(0);
  };
  const windFormat = () => {
    const format = storage["@storage_wind"];
    if (format === "mph") {
      return cityInfo.current.wind_mph + "m/h";
    } else return cityInfo.current.wind_kph + "km/h";
  };

  useEffect(() => {
    API.getPopularCityInfo(item.name)
      .then((response) => setCityInfo(response))
      .catch((err) => console.log(err));
  }, [item.name]);

  return (
    <>
      {!!cityInfo && (
        <Link
          to={{
            screen: "HomeScreen",
            params: {
              city: `${cityInfo.location.lat},${cityInfo.location.lon}`,
            },
          }}
        >
          <View
            style={[styles.popularItem, { backgroundColor: theme.lightBg }]}
          >
            <View>
              <View style={styles.popular_condition}>
                <CustomText style={styles.popular_temp}>
                  {tempFormat()}°
                </CustomText>
                <Image
                  source={{
                    uri: `https:${cityInfo.current.condition.icon}`,
                  }}
                  style={styles.popular_image}
                />
              </View>
              <View>
                <CustomText style={styles.popular_city}>
                  {cityInfo.location.name}
                </CustomText>
                <Text style={styles.popular_country}>
                  {cityInfo.location.country}
                </Text>
              </View>
            </View>

            <View>
              <View style={styles.popular_weather}>
                <View style={styles.popular_weather_item}>
                  <FontAwesomeIcon
                    icon={faDroplet}
                    style={{ color: "#6686b6" }}
                  />
                  <CustomText style={styles.popular_weather_text}>
                    {cityInfo.current.humidity}%
                  </CustomText>
                </View>
                <View style={styles.popular_weather_item}>
                  <FontAwesomeIcon icon={faWind} style={{ color: "#6686b6" }} />
                  <CustomText style={styles.popular_weather_text}>
                    {windFormat()}
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
        </Link>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  popularTitle: {
    fontSize: 20,
    alignSelf: "center",
    color: "#9bacb8",
  },
  popularBlock: {
    paddingVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  popularItem: {
    width: Dimensions.get("window").width * 0.45,
    height: Dimensions.get("window").width * 0.45,
    // backgroundColor: "#f2f2f2",
    borderRadius: 15,
    padding: 15,

    justifyContent: "space-between",
  },
  popular_condition: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popular_temp: {
    fontSize: 50,
  },
  popular_image: {
    width: 90,
    height: 90,
  },
  popular_city: {
    fontSize: 20,
  },
  popular_country: {
    fontSize: 20,
    color: "#9bacb8",
  },
  popular_weather: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popular_weather_item: {
    flexDirection: "row",
    alignItems: "center",
  },
  popular_weather_text: {
    fontSize: 18,
    marginLeft: 10,
  },
});
