import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, Image, Button, TouchableOpacity, Dimensions, Animated } from "react-native";
import { Audio } from "expo-av";
import { ImagePick } from "./components/ImagePicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const styles = require("../../Styles");
import SearchInput from "../../components/SearchInput";
import Modal from 'react-native-modal';
import { Tag } from "../../components/Tag";
import { useSelector } from "react-redux";
import { App } from "./components/Record";
import Ionicons from '@expo/vector-icons/Ionicons';
import { OnRecording } from "./components/OnRecording";

const RecorderScreen = ({ navigation, route}) => {
  
  console.log(route?.params?.open);
  const [name, setName] = useState("Поезд");
  const [descr, setDescr] = useState("Записала в пути");
  const [location, setLocation] = useState("Москва, Казанский вокзал");
  const [audiofile, setAudiofile] = useState(null);
  const [image, setImage] = useState(null);
  const [recording, setRecording] = useState();
  const [uri, setUri] = useState();
  const [token, setToken] = useState(null);

  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const { tags } = useSelector((state) => state.main);

  useEffect(() =>{
    if(route?.params?.open) {
      setModalVisible(route.params.open);
    }
  }, [route?.params])

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    authToken();
  }, []);

  const authToken = () => {
    AsyncStorage.getItem("id_token", (err, result) => {
      setToken(result);
      // console.log(result);
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
    formdata.append("soundcard[tags]", tags);

    axios
      .post("http://localhost:3000/api/v1/soundcards", formdata, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((r) => {
        // console.log(r);
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
    setModalVisible(true); 
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
      <TouchableOpacity
        onPress={() => {
          recording ? stopRecording() : startRecording();
        }}
      >
        <OnRecording isRecording={recording}/>
      </TouchableOpacity>
      {/* {uri && image && token &&  location && name && tags && (
        <Button title={"Send shum"} onPress={() => postSound()} />
      )} */}
      <Modal
        isVisible={modalVisible}
        swipeDirection="down"
        onSwipeComplete={closeModal}
        backdropOpacity={0.5}
        style={styled.modal}
      >
        <View style={styled.modalContent}>
          <View>
          <Text style={{...styles.textes.h3, marginBottom: 24}}>
            Новая запись
            </Text>
            <Ionicons style={{position: 'absolute', right: 16}} name="chevron-down-outline" size={32} color={styles.mainColors.black} 
            onPress={closeModal}/>
          <View style={{marginBottom: 32}}>
          <App uri={uri} />
          </View>
          <View style={{marginBottom: 32}}>
          <SearchInput
              placeholder = {"Название"}
              search={false}
              isLight= {true}
              clicked={clicked}
              setClicked={setClicked}
              searchPhrase={name}
              setSearchPhrase={setName}
            />
         <SearchInput
              placeholder = {"Локация"}
              search={false}
              isLight= {true}
              clicked={clicked2}
              setClicked={setClicked2}
              searchPhrase={location}
              setSearchPhrase={setLocation}
            />
        </View>
          <TouchableOpacity 
          style={{marginBottom: 32}}
          onPress={() => {
            navigation.navigate({ name: "Теги"});
            closeModal();
            }}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
            <Text style={{...styles.textes.h2, textAlign: 'left'}} >Теги</Text>
            <Text style={{...styles.textes.h2, color: styles.mainColors.lightGreen, textAlign: 'left'}} >{`[ + ]`}</Text>
            </View>
              <View style={styles.tagsView}>
                {tags?.map((item, i) => {
                    return (
                        <TouchableOpacity 
                        accessibilityRole="button" 
                        onPress={() => {
                            dispatch({
                                type: "SET_MAIN_REDUCER",
                                payload: { tags: processStringArray(item, tags) },
                              });
                        }}>
                            <Tag key={i} name={item} />
                        </TouchableOpacity>
                    )
                })}
            </View>
        </TouchableOpacity>
      <ImagePick onChoosing={(image) => createImageFIle(image)} />
      </View>
      <TouchableOpacity 
          accessibilityRole="button" 
          onPress={() => postSound()}>
            <Text style={styles.textes.h2}>[ Опубликовать ]</Text>
      </TouchableOpacity>
        </View>
      </Modal>  
    </View>
  );
};

const styled = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    psddingTop: 20,
  },
  modalContent: {
    backgroundColor: styles.mainColors.white,
    paddingVertical: 60,
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
export default RecorderScreen;
