import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import useAudioPlayer from "../hooks/useAudioPlayer";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';
const styles = require("../Styles");

const PlayerBar = () => {
    const { isShowPlayer,
        playAction,
        pauseAction,
        isPlaying,
        playerNowName } = useSelector((state) => state.main);
        if (!isShowPlayer) return null;
        const dispatch = useDispatch();

  return (
    <View style={styles.playerBar.container}>
        <View style={styles.playerBar.row}>
        <View style={styles.playerBar.playIcon}>
                           {isPlaying ? 
                           <Ionicons name="pause" size={16} color={styles.mainColors.green} onPress={pauseAction}/> 
                           : 
                           <Ionicons 
                           name="play" size={16} 
                           color={styles.mainColors.green} 
                           onPress={playAction}/> 
                           }
                            </View>
      <Text style={{...styles.round.text, marginLeft: 16}}>{playerNowName}</Text> 
      </View>
      <Ionicons name="chevron-down-outline" size={32} color={styles.mainColors.black} 
      onPress={() => {
        pauseAction();
        dispatch({
            type: "SET_MAIN_REDUCER",
            payload: { isShowPlayer: false },
            })}
        }/>
    </View>
  );
};

export default PlayerBar;
