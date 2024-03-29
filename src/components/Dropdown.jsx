import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import MoreIcon from "../icons/A_MoreIcon";

// <DropdownComponent label={state.routes[state.index].name.toString()} data={[{label: 'Главная', value: "main"}, {label: 'Профиль', value: "profile"}]}/>

const DropdownComponent = ({ icon, label = "", data=[]}) => {
  const [value, setValue] = useState(" ");
  const [isFocus, setIsFocus] = useState(false);



  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        placeholder={ " "}
        value={value}
        visibleSelectedItem={false}
        renderRightIcon={() => (icon ? icon : <MoreIcon />)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          item.onChange(item.label);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    width: 150,
    position: "absolute",
    right: 0,
    bottom: -16,
  },
  dropdown: {
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
