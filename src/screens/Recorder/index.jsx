import React, {useState} from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";


const  App =({uri}) =>{
    const [sound, setSound] = React.useState();
  
    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync({uri: uri});
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync();
    }
  
    React.useEffect(() => {
        console.log(sound)
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);
  
    return (
      <View>
        <Button title="Play Sound" onPress={playSound} />
      </View>
    );
  }

const RecorderScreen = ({ navigation }) => {
  const [recording, setRecording] = useState();
  const [uri, setUri] = useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    setUri(recording.getURI());
    console.log('Recording stopped and stored at', uri);
  }

  return (
    <View>
        <App uri={uri}/>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
};
export default RecorderScreen;
