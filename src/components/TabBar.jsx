import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DropdownComponent from "./Dropdown";
import { BackHandler } from "react-native";
import BackIcon from "../icons/A_BackIcon";
import HomeIcon from "../icons/A_HomeIcon";
import SearchIcon from "../icons/A_SearchIcon";
import ProfileIcon from "../icons/A_ProfileIcon";

const styles = require("../Styles");

const MyTabBar = ({ state, descriptors, navigation }) => {
  function handleBackButtonClick() {
    try {
      navigation?.goBack();
      return true;
    } catch {
      return;
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  const getIcon = (label) => {
    switch (label) {
      case 'Лента':
        return <HomeIcon />;
      case 'Поиск':
        return <SearchIcon/>;
      case 'Профиль':
        return <ProfileIcon/>;
      default:
        return <Text>*</Text>;
    }
  }

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tapBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isHidden =
            label === "Популярное" || label === "Новое" || label === "Авторизация" ? true : false;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          if (isHidden) return;
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
              style={{ display: "flex", justifyContentL: "center", paddingRight: index == state.routes.length-1 ? 0: 32, opacity: isFocused ? 1 : 0.3 }}
            >
              {getIcon(label)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MyTabBar;
