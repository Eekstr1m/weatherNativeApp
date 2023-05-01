import {
  faBars,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { useTheme } from "../common/context";

export default function NavigationBlock({ style }) {
  const { theme } = useTheme();
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      {!keyboardStatus && (
        <View style={[styles.nav, { backgroundColor: theme.bg }, style]}>
          <Link to={{ screen: "HomeScreen" }} style={styles.link}>
            <FontAwesomeIcon icon={faHouse} size={25} color={theme.textColor} />
          </Link>
          <Link to={{ screen: "SearchScreen" }} style={styles.link}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size={25}
              color={theme.textColor}
            />
          </Link>
          <Link to={{ screen: "SettingsScreen" }} style={styles.link}>
            <FontAwesomeIcon icon={faBars} size={25} color={theme.textColor} />
          </Link>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    // backgroundColor: "#fff",
    width: "100%",
    height: 55,
    paddingHorizontal: "10%",

    // borderTopColor: "#e4e2e4",
    // borderTopWidth: 2,
  },
  link: {
    width: "30%",
    height: "100%",
    textAlign: "center",
    verticalAlign: "middle",
  },
});
