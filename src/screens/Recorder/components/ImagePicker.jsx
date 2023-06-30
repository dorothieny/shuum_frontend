import * as ImagePicker from "expo-image-picker";
import { View, Button, Text, Image } from 'react-native';
import React, {useEffect, useState} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from '../../../Styles';
import { PickerImage } from "../../../icons/A_PickerImage";
export const ImagePick = ({ onChoosing, settedImage = null }) => {
    const [image, setImage] = useState(null);
  
    useEffect(() => {
      if (settedImage) {
        setImage(settedImage);
      }
    }, [settedImage]);
  
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
        <TouchableOpacity onPress={pickImage}>
        {image ? ( 
             <Image source={{ uri: image }} style={{width: '100%', height: 200 }} />
        ) : (
             <View style={{width: '100%', height: 200, borderColor: styles.mainColors.lightGreen, borderWidth: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}> 
         <PickerImage />
         </View>
        )}
        </TouchableOpacity>
      </View>
    );
  };