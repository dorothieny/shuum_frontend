import { useState, useEffect } from "react";
const styles = require("../../../../Styles");
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

const RandomSound = (props) => {
  const { soundcard, author, likes } = props.data;
  return (
    <View style={styles.roundSound}>
      <Image style={{position: "absolute", width: "100%", height: "100%", borderRadius: "500%"}} source={{ uri: `http://localhost:3000${soundcard?.image?.url}` }}/>
      <View style={{position: "absolute", width: "100%", height: "100%", borderRadius: "500%", backgroundColor: styles.mainColors.black, opacity: 0.5}}/>
      <Text style={styles.roundSound.text}>{soundcard.name}</Text>
      <Text style={{...styles.fontP1, color: styles.mainColors.gray}}>{soundcard.location}</Text>
      <Text style={{...styles.fontP2, color: styles.mainColors.gray, opacity: 0.5}}>@{author}</Text>
    </View>
  );
};

export default RandomSound;
