import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSettings } from "../../common/context";
import CustomText from "../Custom/CustomText";

export default function HourlyForecast({
  currentHourlyForecast,
  tomorrowHourlyForecast,
  timezone,
}) {
  // Converting hour forecast to searched timezone
  function hourEqual(localTime, time) {
    const currDate = new Date(localTime);
    const tempDate = new Date(time);

    const currYMD = `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()}`;
    const tempYMD = `${tempDate.getFullYear()}-${tempDate.getMonth()}-${tempDate.getDate()}`;

    if (currYMD === tempYMD && currDate.getHours() <= tempDate.getHours()) {
      return true;
    } else if (currYMD !== tempYMD) return true;
    else return false;
  }

  return (
    <View style={styles.hourly_forecast}>
      <Text style={styles.title}>Hourly forecast</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.forecast_block}>
          {!!currentHourlyForecast &&
            currentHourlyForecast.map(
              (item, index) =>
                hourEqual(timezone, item.time) && (
                  <HourForecastItem key={index} item={item} />
                )
            )}
        </View>
        <View
          style={{ transform: [{ rotate: "-90deg" }], alignSelf: "center" }}
        >
          <CustomText style={{ fontSize: 16 }}>Tomorrow</CustomText>
        </View>
        <View style={styles.forecast_block}>
          {!!tomorrowHourlyForecast &&
            tomorrowHourlyForecast.map((item, index) => (
              <HourForecastItem key={index} item={item} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

function HourForecastItem({ item }) {
  const { storage } = useSettings();
  const timeFormat = (time) => {
    const format = storage["@storage_time"];
    if (format === "24h") {
      return time.hourConvert();
    } else return time.hourConvert().to12HConvert();
  };
  const tempFormat = () => {
    const format = storage["@storage_temp"];
    if (format === "fahrenheit") {
      return item.temp_f.toFixed(0);
    } else return item.temp_c.toFixed(0);
  };

  return (
    <View style={styles.item}>
      <CustomText style={styles.item_hour}>{timeFormat(item.time)}</CustomText>
      <Image
        source={{
          uri: `https:${item.condition.icon}`,
        }}
        style={styles.item_image}
      />
      <CustomText style={styles.item_temp}>{tempFormat()}°</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    color: "#9bacb8",
    marginBottom: 30,
  },
  hourly_forecast: {
    marginVertical: 30,
  },
  forecast_block: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  item_hour: {
    fontSize: 16,
  },
  item_image: {
    width: 50,
    height: 50,
  },
  item_temp: {
    fontSize: 22,
  },
});
