import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity, Image, Button } from 'react-native';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/native';
import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';

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
    height: 96px;
    width: 96px;
    border-radius: 16px;
`

const TrackItemList = styled.View`
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    margin-bottom: 8px;
`

const FlexColumn = styled.View`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const FlexRow = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    flex: 1;
    padding: 8px 16px;
    border-radius: 16px;
`

const TagsView = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const Tag = styled.View`
    background-color: #A6A9B6;
    border-radius: 4px;
    padding: 2px 8px;
    margin-right: 8px;
`


const TrackInList = ({item, navigation}) => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [played, setPlayed] = useState(false);

    const sound = useRef(new Audio.Sound());


   const loadAudio = async () => {
    setLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync({ uri: `http://localhost:3000${item?.audiofile?.url}`});
        if (result.isLoaded === false) {
          setLoading(false);
        } else {
          setLoading(false);
          setLoaded(true);
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
}
    useEffect(() => {
        loadAudio();
      }, []);
    

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          setPlayed(true);
        }
      }
    } catch (error) {}
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
          setPlayed(false);
        }
      }
    } catch (error) {}
  };

 
    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);

    const sliceName = (name) => {
        if(name.length >= 50) {
          return name.substring(0, 50) + "..."
        } else {
          return name
        }
       }


    return ( 
        <>
                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Player", {id: item.id})
                        }}>
                            <TrackItemList>
                                <StyledImage 
                                    source={{uri: `http://localhost:3000${item?.image?.url}`}}
                                />
                                <FlexRow>
                                    <FlexColumn>
                                        <TrackTitile>{sliceName(item.name)}</TrackTitile>
                                        <TrackLocation>{item.location}</TrackLocation>
                                    <TagsView>
                                        {item.tags.map((item, i) => {
                                            return (
                                                <Tag key={i}>
                                                    <Text>
                                                    {item.name}
                                                    </Text>
                                                </Tag>
                                            )
                                        })}
                                    </TagsView> 
                                    <TrackLocation>{new Date(item.created_at).toLocaleDateString()}</TrackLocation>
                                </FlexColumn>

                                {!loading ?
                        (<View>
                           {played ? <Ionicons name="pause" size={24}  onPress={PauseAudio}/> : <Ionicons name="play" size={24}  onPress={PlayAudio}/> }
                            </View>) : (
                                <>
                                <ActivityIndicator />
                                <Text>Loading Song</Text>
                            </>
                            )
                            }
                                </FlexRow>
                                
                                
                            </TrackItemList>
                            
                    </TouchableOpacity>
                </View>
      </>
    )
}
export default TrackInList