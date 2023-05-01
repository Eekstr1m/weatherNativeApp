import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
  headers: {
    key: "709606ee335b432cb5a104900231004",
  },
});

export const API = {
  async getWeatherInLocation(city) {
    const response = await instance.get(
      `/forecast.json?&q=${city}&days=7&aqi=yes`
    );

    return response.data;
  },
  async getIPweather() {
    const searchData = await instance.get(
      `/search.json?&q=auto:ip&days=7&aqi=yes`
    );

    const request = `${searchData.data[0].lat},${searchData.data[0].lon}`;

    const response = await instance.get(
      `/forecast.json?&q=${request}&days=7&aqi=yes`
    );
    // const searchResponse = await instance.get(`/search.json?&q=${request}`);

    return response.data;
    // return { ...response.data, url: searchResponse.data[0].url };
  },
  async getPopularCityInfo(city) {
    const response = await instance.get(`/current.json?&q=${city}`);
    return response.data;
  },
  async getSearch(city) {
    const response = await instance.get(`/search.json?&q=${city}`);

    return response.data;
  },
  async getSelectedDayForecast(city, date) {
    const response = await instance.get(
      `/forecast.json?&q=${city}&days=7&aqi=yes`
    );

    let query = response.data.forecast.forecastday;

    let res = query.filter((item) => item.date === date);

    return res[0];
  },
  async getTimezone(city) {
    const response = await instance.get(`/timezone.json?&q=${city}`);
    return response.data.location;
  },
};
