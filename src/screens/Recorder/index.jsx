import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, Image, Button } from "react-native";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = ({ uri }) => {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: uri });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    // console.log(sound)
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
};

export const ImagePick = ({ onChoosing }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let source = {};
      let fileName = result.fileName || `newFile.${result.uri.split(".")[1]}`;
      if (
        Platform.OS === "ios" &&
        (fileName.endsWith(".heic") || fileName.endsWith(".HEIC"))
      ) {
        fileName = `${fileName.split(".")[0]}.JPG`;
      }
      source = {
        uri: result.uri.split("//")[1],
        fileName,
        type: `${result.uri.split(".")[1]}`,
      };
      setImage(result.uri);
      onChoosing(source);
    }
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};
const RecorderScreen = ({ navigation }) => {
  const [name, setName] = useState("Шумик");
  const [descr, setDescr] = useState("Записала в ночи");
  const [location, setLocation] = useState("Москва, Зеленодольская, 28А");
  const [audiofile, setAudiofile] = useState(null);
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("город, шорох");
  const [recording, setRecording] = useState();
  const [uri, setUri] = useState();
  const [token, setToken] = useState(null);

  useEffect(() => {
    authToken();
  }, []);

  const authToken = () => {
    AsyncStorage.getItem("id_token", (err, result) => {
      setToken(result);
      // alert(result);
      console.log(result);
    });
  };

  const postSound = () => {
    let formdata = new FormData();

    formdata.append("soundcard[name]", name);
    formdata.append("soundcard[location]", location);
    formdata.append("soundcard[description]", descr);
    formdata.append("soundcard[image]", {
      uri: image.uri,
      name: `${image.fileName}`,
      type: `${image.type}`,
    });
    formdata.append("soundcard[audiofile]", {
      uri: audiofile.uri,
      name: `${audiofile.fileName}`,
      type: `${audiofile.type}`,
    });
    formdata.append("soundcard[tags]", tags)

    axios
      .post("http://localhost:3000/api/v1/soundcards", formdata, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((r) => {
        console.log(r);
      });
  };

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);

    const { durationMillis } = await recording.getStatusAsync();

    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    setUri(recording.getURI());

    const source = {
      uri: recording.getURI(),
      type: "audio/m4a",
      fileName: `newShum${recording.getURI().split("/AV/")[1]}`,
    };
    setAudiofile(source);
    console.log("Recording stopped and stored at", recording.getURI());
  }

  const createImageFIle = (image) => {
    setImage(image);
  };

  return (
    <View>
      <TextInput
        // style={styles.input}
        // onChangeText={onChangeText}
        value={name}
      />
      <TextInput
        // style={styles.input}
        // onChangeText={onChangeText}
        value={descr}
      />
      <TextInput
        // style={styles.input}
        // onChangeText={onChangeText}
        value={location}
      />
      <App uri={uri} />

      <ImagePick onChoosing={(image) => createImageFIle(image)} />

      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {uri && image && token && (
        <Button title={"Send shum"} onPress={() => postSound()} />
      )}
    </View>
  );
};
export default RecorderScreen;