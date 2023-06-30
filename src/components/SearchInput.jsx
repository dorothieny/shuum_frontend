import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
const styles = require("../Styles");
import SearchIcon from "../icons/A_SearchIcon";
import CloseIcon from "../icons/A_CloseIcon";

const SearchInput = ({
  search = true,
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  placeholder ="Search",
  isLight = true,
  isPassword = false,
}) => {
  const inputRef = useRef();
  const isLightTheme = isLight ? "lightTheme" : "darkTheme";

  return (
    <View style={styles.searchInput[isLightTheme].container}>
      <View
        style={
          clicked
            ? styles.searchInput[isLightTheme].searchInput__clicked
            : styles.searchInput[isLightTheme].searchInput__unclicked
        }
      >
        {/* search Icon */}
       {search &&  <SearchIcon
          color={isLight ? styles.mainColors.black : styles.mainColors.white}
        />}
        {/* Input field */}
        <TextInput
          placeholderTextColor={
            isLight ? "#A1B1AD" : "#4C6D65"
          }
          secureTextEntry={isPassword}
          ref={inputRef}
          style={{...styles.searchInput[isLightTheme].input, ...styles.searchInput[isLightTheme].placeholderStyle}}
          placeholder={placeholder}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            inputRef.current.focus();
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <CloseIcon
            color={isLight ? styles.mainColors.black : styles.mainColors.white}
            onPress={() => {
              setSearchPhrase("");
              setClicked(false);
              Keyboard.dismiss();
            }}
          />
        )}
      </View>
    </View>
  );
};
export default SearchInput;
