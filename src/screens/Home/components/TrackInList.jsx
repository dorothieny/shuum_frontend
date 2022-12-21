import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity, Image, Button } from 'react-native';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/native';
import { Audio } from 'expo-av';

const StyledImage = styled.Image`
  height: 100px;
  width: 100px;
`

const TrackInList = ({item, navigation}) => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

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
                    <TouchableOpacity onPress={() => navigation.navigate("Player", {id: item.id})}>
                        <StyledImage 
                        source={{uri: `http://localhost:3000${item?.image?.url}`}}
                        />
                        <Text>{sliceName(item.name)}</Text>
                        <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {!loading ?
                        (<View>
                            <Button title="Play Song" onPress={PlayAudio} />
                            <Button title="Pause Song" onPress={PauseAudio} />
                        </View>) : (
                            <>
                            <ActivityIndicator />
                            <Text>Loading Song</Text>
                        </>
                        )
                    }
                </View>
      </>
    )
}
export default TrackInList