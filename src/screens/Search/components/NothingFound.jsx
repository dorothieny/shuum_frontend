import {
    FlatList,
    View,
    Text,
  } from "react-native";
  import React from "react";
  const styles = require("../../../Styles");

export const NothingFound = () => {
    return (
        <View style={{ ...styles.app, backgroundColor: styles.mainColors.white, paddingHorizontal: 16, display:'flex', flexDirection: 'column', justifyContent: 'center'  }}>
        <Text style={{...styles.textes.h2, textAlign: "center"}}>Ничего не найдено</Text>
        </View>
    )
}