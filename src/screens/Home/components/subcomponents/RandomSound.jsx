import { useState, useEffect, useRef } from "react";
const styles = require("../../../../Styles");
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import useAudioPlayer from "../../../../hooks/useAudioPlayer";
import { useDispatch } from "react-redux";

const RandomSound = (props) => {
  const { soundcard, author, likes } = props.data;
  const dispatch = useDispatch();
  const {isPlaying, playAudio, pauseAudio, loading} = useAudioPlayer(`http://localhost:3000${soundcard?.audiofile?.url}`);

  useEffect(() => {
dispatch({
  type: "SET_MAIN_REDUCER",
  payload: {isPlaying: isPlaying},
})
  }, [isPlaying]);

  return (
    <View style={styles.roundSound}>
      <Image style={{position: "absolute", width: "100%", height: "100%", borderRadius: "500%"}} source={{ uri: `http://localhost:3000${soundcard?.image?.url}` }}/>
      <View style={{position: "absolute", width: "100%", height: "100%", borderRadius: "500%", backgroundColor: styles.mainColors.black, opacity: 0.5}}/>
      <Text style={styles.roundSound.text}>{soundcard.name}</Text>
      {!loading ?
                        (<View style={{marginBottom: 72, marginTop: 72}}>
                           {isPlaying ? 
                           <Ionicons name="pause" size={24} color={styles.mainColors.white} onPress={pauseAudio}/> 
                           : 
                           <Ionicons 
                           name="play" size={24} 
                           color={styles.mainColors.white} 
                           onPress={() => {
                            dispatch({
                              type: "SET_MAIN_REDUCER",
                              payload: { isShowPlayer: true, 
                                playerNowName: soundcard?.name, 
                                playAction: playAudio, 
                                pauseAction: pauseAudio},
                            });
                            playAudio();
                          }}/> 
                           }
                            </View>) : (
                                <>
                                <ActivityIndicator />
                                
                            </>
                            )
                            }
      <Text style={{...styles.fontP1, color: styles.mainColors.gray}}>{soundcard.location}</Text>
      <Text style={{...styles.fontP2, color: styles.mainColors.gray, opacity: 0.5}}>@{author}</Text>
    </View>
  );
};

export default RandomSound;
