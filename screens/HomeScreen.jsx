import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { API } from "../api/weather-api";
import { THEME, useTheme } from "../common/context";
import AstroInfo from "../components/Home/AstroInfo";
import DailyForecast from "../components/Home/DailyForecast";
import HourlyForecast from "../components/Home/HourlyForecast";
import LocationInfo from "../components/Home/LocationInfo";
import WeatherInfo from "../components/Home/WeatherInfo";
import Loading from "../components/Loading";
import NavigationBlock from "../components/NavigationBlock";
import Sun from "../components/Sun";

export default function HomeScreen({ navigation, route }) {
  const { theme, setTheme } = useTheme();
  const [isFetching, setIsFetching] = useState(false);

  const [location, setLocation] = useState(null);
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [astro, setAstro] = useState(null);
  const [currentHourlyForecast, setCurrentHourlyForecast] = useState(null);
  const [tomorrowHourlyForecast, setTomorrowHourlyForecast] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [city, setCity] = useState(null);
  const [isDay, setIsDay] = useState(false);

  useEffect(() => {
    if (!!route.params) {
      setCity(route.params.city);
    }
  }, [route.params]);

  const updateState = (response) => {
    setLocation(response.location);
    setCurrent(response.current);
    setForecast(response.forecast.forecastday);
    setAstro(response.forecast.forecastday[0].astro);
    setCurrentHourlyForecast(response.forecast.forecastday[0].hour);
    setTomorrowHourlyForecast(response.forecast.forecastday[1].hour);
    setTimezone(response.location.localtime);
    setIsDay(!!response.current.is_day);
  };

  useEffect(() => {
    isDay ? setTheme(THEME.light) : setTheme(THEME.dark);
  }, [isDay]);

  useEffect(() => {
    if (!!city) {
      setIsFetching(true);
      API.getWeatherInLocation(city)
        .then((response) => {
          updateState(response);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsFetching(false));
    } else {
      setIsFetching(true);
      API.getIPweather()
        .then((response) => {
          updateState(response);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsFetching(false));
    }
  }, [city]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: theme.bg,
        }}
      >
        {/* Sun */}
        <Sun
          style={{
            flex: 1,
            position: "absolute",
            right: -100,
            top: -20,
            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 0.65,
            height: Dimensions.get("window").width * 0.65,
          }}
        />
        {/* All view */}
        <View style={styles.container}>
          {/* Location info block */}
          <LocationInfo location={location} current={current} />

          {/* Weather info  */}
          <WeatherInfo current={current} />

          {/* Astro block  */}
          <AstroInfo astro={astro} />

          {/* Today hour forecast */}
          <HourlyForecast
            currentHourlyForecast={currentHourlyForecast}
            tomorrowHourlyForecast={tomorrowHourlyForecast}
            timezone={timezone}
          />

          {/* Daily forecast */}
          <DailyForecast forecast={forecast} />
        </View>
      </ScrollView>

      <StatusBar
        backgroundColor={"transparent"}
        barStyle={theme.statusBarStyle}
        translucent={true}
      />
      <NavigationBlock navigation={navigation} route={route} />
    </>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
});
