import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useLinkProps } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { API } from "../api/weather-api";
import { useTheme } from "../common/context";
import CustomInput from "../components/Custom/CustomInput";
import CustomText from "../components/Custom/CustomText";
import NavigationBlock from "../components/NavigationBlock";
import PopularLocationBlock from "../components/Search/PopularLocationBlock";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue.trim().transliterate();
}

export default function SearchScreen({ navigation }) {
  const { theme } = useTheme();
  const [searchResult, setSearchResult] = useState(null);
  const [text, onChangeText] = useState("");
  const debounceText = useDebounce(text, 750);

  useEffect(() => {
    if (!!debounceText) {
      API.getSearch(debounceText)
        .then((response) => {
          setSearchResult(response);
        })
        .catch((err) => console.log(err));
    }

    return () => {
      setSearchResult(null);
    };
  }, [debounceText]);

  return (
    <>
      <ScrollView
        style={{
          paddingTop: StatusBar.currentHeight,
          paddingHorizontal: 15,
          backgroundColor: theme.bg,
        }}
      >
        <CustomInput
          onChangeText={onChangeText}
          value={text}
          style={styles.input}
          placeholder="Search"
        />
        {!!searchResult && (
          <View style={{ paddingVertical: 20 }}>
            {searchResult.length !== 0 ? (
              searchResult.map((item, index) => (
                <SearchResponseItem
                  key={index}
                  item={item}
                  navigation={navigation}
                />
              ))
            ) : (
              <CustomText style={{ fontSize: 24, alignSelf: "center" }}>
                No results found
              </CustomText>
            )}
          </View>
        )}
        <PopularLocationBlock />
      </ScrollView>
      <NavigationBlock />
    </>
  );
}

function SearchResponseItem({ item }) {
  const { theme } = useTheme();

  return (
    <LinkButton
      to={{ screen: "HomeScreen", params: { city: item.url } }}
      style={[styles.searchItem, { backgroundColor: theme.lightBg }]}
    >
      <CustomText style={styles.searchItemText}>
        {item.name}, {item.region}, {item.country}
      </CustomText>
    </LinkButton>
  );
}

const LinkButton = ({ to, children, ...props }) => {
  const { onPress } = useLinkProps({ to });

  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    marginVertical: 12,
    fontSize: 18,
  },
  searchItem: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 50,
    flex: 1,
    verticalAlign: "middle",
    justifyContent: "center",
  },
  searchItemText: {
    fontSize: 20,
  },
});
