import { View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
const styles = require("../../../Styles");
import RecorderIcon from "../../../icons/A_RecorderIcon";

export const OnRecording = ({isRecording}) => {
    return (
    
      <View style={styles.recorder}>
        <View style={styles.recorder.thirdCircle}>
          <Image style={{position: 'absolute', width: '100%', height: '100%'}} source={require('../../../images/a_green2.png')} />    
              {!isRecording ? <RecorderIcon color={styles.mainColors.lightGreen}/> : <View style={{width: 16, height: 16, backgroundColor: styles.mainColors.lightGreen}}/>}
        </View>
      </View>
    
    )
}
