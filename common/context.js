import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator, View } from "react-native";

const SettingsContext = createContext(false);
const ThemeContext = createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
};

export const THEME = {
  light: {
    first: "#FFBC7C",
    second: "#FF52A7",
    avg: "#ff8792",
    bg: "#fff",
    lightBg: "#f2f2f2",
    textColor: "#081b25",
    statusBarStyle: "dark-content",
  },
  dark: {
    first: "#21B2FE",
    second: "#C65AE9",
    avg: "#7287f4",
    bg: "#081b25",
    lightBg: "#353361",
    textColor: "#fff",
    statusBarStyle: "light-content",
  },
};

export default function ContextProvider({ children }) {
  const [theme, setTheme] = useState(THEME.light);

  const [isInitialized, setIsInitialized] = useState(false);
  const [storage, setStorage] = useState(null);
  const [isChanged, setIsChanged] = useToggle();

  const storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
      setIsChanged();
    } catch (err) {
      // saving error
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const values = await AsyncStorage.multiGet([
        "@storage_temp",
        "@storage_wind",
        "@storage_time",
      ]);
      const obj = Object.fromEntries(values);
      setStorage(obj);
    } catch (err) {
      // saving error
      console.log(err);
    }
  };

  const initialData = async () => {
    Promise.all([
      (temp = await AsyncStorage.getItem("@storage_temp")),
      (wind = await AsyncStorage.getItem("@storage_wind")),
      (time = await AsyncStorage.getItem("@storage_time")),
    ]).catch((err) => console.log(err));
    temp ? null : storeData("@storage_temp", "celsius");
    wind ? null : storeData("@storage_wind", "kph");
    time ? null : storeData("@storage_time", "24h");
  };

  useEffect(() => {
    setIsInitialized(false);
    initialData();
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      getData();
    }
  }, [isInitialized, isChanged]);

  if (!isInitialized) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={60} color={"#ff8792"} />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <SettingsContext.Provider value={{ storage, storeData }}>
        {children}
      </SettingsContext.Provider>
    </ThemeContext.Provider>
  );
}
