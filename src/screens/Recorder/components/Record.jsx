import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import styles from '../../../Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
const ProgressBar = ({ progress }) => {
    return (
      <View style={styled.progressBar}>
        <View style={[styled.progressBarFill, { width: `${progress}%` }]} />
      </View>
    );
  };
export const App = ({ uri }) => {
      const [sound, setSound] = React.useState();
      const [isPlaying, setIsPlaying] = useState(false);
      const [duration, setDuration] = useState(0);
      const [position, setPosition] = useState(0);

      async function playSound() {
        console.log("Loading Sound");
        const { sound } = await Audio.Sound.createAsync({ uri: uri });
        setSound(sound);
    
        console.log("Playing Sound");
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await sound.playAsync();
      setIsPlaying(true);
      }
      const onPlaybackStatusUpdate = (status) => {
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);
      };
    
      useEffect(() => {
        return () => {
          if (sound) {
            console.log('Unloading Sound');
            sound.unloadAsync();
            setSound(null);
            setIsPlaying(false);
            setPosition(0);
            setDuration(0);
          }
        };
      }, [sound]);


      React.useEffect(() => {
        return sound
          ? () => {
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);
    
      
      const progressPercentage = (position / duration) * 100;

      return (
        <View style={styled.container}>
           <Ionicons 
                           name="play" size={24} 
                           color={styles.mainColors.lightGreen} 
                           onPress={playSound}/> 
          <ProgressBar progress={progressPercentage} />
        </View>
      );
    };

    const styled = StyleSheet.create({
        container: {
          justifyContent: 'center',
          display: 'flex',
            flexDirection: 'row',
          alignItems: 'center',
        },
        progressBar: {
          flex: 1,
          height: 4,
          backgroundColor: '#ddd',
          borderRadius: 10,
          overflow: 'hidden',
          
        },
        progressBarFill: {
          height: '100%',
          backgroundColor: styles.mainColors.lightGreen,
        },
      });
      