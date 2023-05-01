import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSettings } from "../../common/context";
import CustomText from "../Custom/CustomText";

export default function DailyForecast({ forecast }) {
  const [test2, setTest2] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  return (
    <View>
      {!!forecast &&
        forecast.map((item, index) => (
          <DayForecastItem key={index} item={item} />
        ))}
    </View>
  );
}

function DayForecastItem({ item }) {
  const { storage } = useSettings();
  const tempFormat = () => {
    const format = storage["@storage_temp"];
    if (format === "fahrenheit") {
      return item.day.avgtemp_f.toFixed(0);
    } else return item.day.avgtemp_c.toFixed(0);
  };

  return (
    <View style={styles.daily_item}>
      <CustomText style={styles.day}>{item.date.dateConvert()}</CustomText>
      <Image
        source={{
          uri: `https:${item.day.condition.icon}`,
        }}
        style={styles.image}
      />
      <View style={styles.temp_block}>
        <CustomText style={styles.temp_text}>{tempFormat()}°</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  daily_item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  day: {
    fontSize: 16,
    alignSelf: "center",
    minWidth: "20%",
  },
  image: {
    width: 50,
    height: 50,
  },
  temp_block: {
    alignItems: "flex-end",
    width: "20%",
  },
  temp_text: {
    fontSize: 22,
  },
});
