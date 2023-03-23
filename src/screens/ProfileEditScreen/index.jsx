import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Button,
  Image,
  Animated,
} from "react-native";
import { useSelector } from "react-redux";
const styles = require("../../Styles");
import { ImagePick } from "../Recorder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileEditScreen = ({navigation}) => {
  const { userId } = useSelector((state) => state.main);
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);
  const [settedImage, setSettedImage] = useState(null);

  useEffect(() => {
    authToken();
  
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        setSettedImage(null)
        axios
        .get(`http://localhost:3000/api/v1/users/${userId}`)
        .then((response) => {
            console.log("updateImage")
          setProfile(response.data.user);
          setSettedImage(`http://localhost:3000/${response.data?.user?.avatar?.url}`);
        })
        .catch((err) => {
          // alert(err);
        });
    });

    return unsubscribe;
  }, [navigation, profile]);


  const authToken = () => {
    AsyncStorage.getItem("id_token", (err, result) => {
      setToken(result);
      // alert(result);
      console.log(result);
    });
  };

  const createImageFIle = (image) => {
    setImage(image);
  };

  const updateUser = () => {
    let formdata = new FormData();

    formdata.append("user[name]", profile?.name);
    formdata.append("user[avatar]", {
      uri: image.uri,
      name: `${image.fileName}`,
      type: `${image.type}`,
    });
    axios
      .put(`http://localhost:3000/api/v1/users/${userId}/edit`, formdata, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((r) => {
        console.log(r);
      });
  };

  return (
    <View>
      <View style={styles.profile.card}>
        {/* <Image
          style={{
            ...styles.profile.avatar,
            backgroundColor: styles.mainColors.black,
          }}
          source={{
            uri: `http://localhost:3000${profile?.avatar?.url}`,
          }}
        /> */}
        <TextInput
          style={{...styles.searchInput.input, color: styles.mainColors.white, borderBottomColor: styles.mainColors.white}}
          // onChangeText={onChangeText}
          value={profile?.name}
        />
      </View>

      {/* <TextInput
        // style={styles.input}
        // onChangeText={onChangeText}
        value={profile?.email}
      /> */}
      <ImagePick
        onChoosing={(image) => createImageFIle(image)}
        settedImage={settedImage}
      />
      {image && token && profile?.name && (
        <Button title={"Update user"} onPress={() => updateUser()} />
      )}
    </View>
  );
};
export default ProfileEditScreen;
