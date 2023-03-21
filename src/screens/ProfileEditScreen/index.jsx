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

const ProfileEditScreen = () => {
  const { userId } = useSelector((state) => state.main);
  const [profile, setProfile] = useState([]);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    authToken();
  }, []);

  useEffect(() => {
    // set();
  }, [token]);

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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/${userId}`)
      .then((response) => {
        setProfile(response.data.user);
      })
      .catch((err) => {
        // alert(err);
      });
  }, []);

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
      <TextInput
        // style={styles.input}
        // onChangeText={onChangeText}
        value={profile?.name}
      />
      <TextInput
        // style={styles.input}
        // onChangeText={onChangeText}
        value={profile?.email}
      />
      <ImagePick onChoosing={(image) => createImageFIle(image)} />
      {image && token && profile?.name && (
        <Button title={"Update user"} onPress={() => updateUser()} />
      )}
    </View>
  );
};
export default ProfileEditScreen;
