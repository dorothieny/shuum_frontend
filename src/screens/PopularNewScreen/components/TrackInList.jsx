import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity, Image, Button } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import useAudioPlayer from '../../../hooks/useAudioPlayer';
import { Tag } from '../../../components/Tag';
import styles from '../../../Styles';
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

export const TrackTitile = styled.Text`
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
`

const TrackLocation = styled.Text`
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    color: #A6A9B6;
`

const StyledImage = styled.Image`
    height: 100%;
    position:absolute
    width: 100%;
    border-radius: 50%;
`

const FlexColumn = styled.View`
    display: flex;
    flex-direction: column;
    align-items: "space-between";
    height: 100%;
`



const TrackInList = ({item, navigation}) => {
  const {isPlaying, playAudio, pauseAudio, loading} = useAudioPlayer(`http://localhost:3000${item?.audiofile?.url}`);
  const { userId } = useSelector((state) => state.main);
  const [liked, setLiked] = useState(false);
    const sliceName = (name) => {
        if(name.length >= 50) {
          return name.substring(0, 50) + "..."
        } else {
          return name
        }
       }
       useEffect(() => {
        const s = Boolean(item?.likes?.filter((item) => item?.user_id === userId).length);
        setLiked(s);
        }, [item]);

    return ( 
        <>
                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Player", {id: item.id})
                        }}>
                            <View style={styles.trackItemList}>
                              <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: 96, height: 96}}>
                                <StyledImage 
                                    source={{uri: `http://localhost:3000${item?.image?.url}`}}
                                />
                                {item?.image?.url && (
                                  <View
                                    style={{
                                      position: "absolute",
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "500%",
                                      backgroundColor: styles.mainColors.black,
                                      opacity: 0.2,
                                    }}
                                  />
                                )}
                                {!loading ?
                                  (<View>
                                    {isPlaying ? <Ionicons name="pause" size={24} color={styles.mainColors.white} onPress={pauseAudio}/> : 
                                    <Ionicons name="play" size={24}  color={styles.mainColors.white}  onPress={playAudio}/> }
                                      </View>) : (
                                          <>
                                          <ActivityIndicator />
                                          
                                      </>
                                      )
                                  }
                                </View>
                                <View style={styles.trackItemList.flexRow}>
                                    <FlexColumn>
                                        <Text style={{...styles.round.text, textAlign: "left"}}>{sliceName(item.name)}</Text>
                                        
                                    <View style={styles.tagsView}>
                                        {item.tags.map((item, i) => {
                                            return (
                                                <Tag key={i} name={item.tagname} />
                                            )
                                        })}
                                    </View> 
                                    <TrackLocation>{item.location}</TrackLocation>
                                </FlexColumn>
                                {liked && <Ionicons name="heart" size={24} color={styles.mainColors.lightGreen} />}
                                </View>
                                
                                
                            </View>
                            
                    </TouchableOpacity>
                </View>
      </>
    )
}
export default TrackInList