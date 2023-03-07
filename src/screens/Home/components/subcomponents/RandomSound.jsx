import { useState, useEffect } from "react";
const styles = require("../../../../Styles");
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
  } from "react-native";

const RandomSound = (props) => {
    const {soundcard, author, likes} = props.data;
    return (
        <View style={styles.roundSound}>
            <Text style={styles.roundSound.text}>{soundcard.name}</Text>
        </View>
    )
}

export default RandomSound;