import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DropdownComponent from "./Dropdown";
import { BackHandler } from "react-native";
import BackIcon from "../icons/A_BackIcon";

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
            
        const isHidden = (label === "Популярное" || label === "Новое") ? true : false;
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
        if(isHidden) return 
        if (label == "button") {
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={handleBackButtonClick}
              key={index}
              style={{ flex: 1 }}
            >
              <BackIcon />
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={{ flex: 1 }}
          >
            <Text style={{...styles.tapBar.text, color: isFocused ? styles.tapBar.text.color : styles.tapBar.text.colorNonAtive }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
  );
};

export default MyTabBar;
