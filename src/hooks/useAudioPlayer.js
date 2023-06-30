import { useState, useEffect, useRef } from "react";
import { Audio } from 'expo-av';

const useAudioPlayer = (uri) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef(new Audio.Sound());
  const [loading, setLoading] = useState(false);

  const playAudio = async () => {
    try {
      const { isLoaded, didJustFinish } = await sound?.current?.getStatusAsync();
      if (isLoaded && !isPlaying) {
        await sound.current.playAsync();
        setIsPlaying(true);
      }
      if (didJustFinish) {
        sound.current.replayAsync();
      }
    } catch (error) {}
  };

  const pauseAudio = async () => {
    try {
      const { isLoaded, isPlaying } = await sound?.current?.getStatusAsync();
      if (isLoaded && isPlaying) {
        await sound.current.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {}
  };


  const loadAudio = async (uri) => {
    setLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync({ uri });
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
      if(uri) {
        loadAudio(uri);
      }
      }, [uri]);
    
  useEffect(() => {
    return sound
      ? () => {
        //   console.log('Unloading Sound');
          sound.current.unloadAsync();
        }
      : undefined;
  }, [sound]);


useEffect(() => {
    const onPlaybackStatusUpdate = (status) => {
      if (status.isLoaded && status.didJustFinish) {
        setIsPlaying(false);
      }
    };
  
    const subscription = sound.current?.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  
    return () => {
      if (subscription) {
        subscription.remove();
      }
  
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  return { isPlaying, playAudio, pauseAudio, loading };
};

export default useAudioPlayer;
