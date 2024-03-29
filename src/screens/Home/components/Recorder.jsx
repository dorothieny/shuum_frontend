import { View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
const styles = require("../../../Styles");
import RecorderIcon from "../../../icons/A_RecorderIcon";

const Recorder = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Рекордер")}>
      <View style={styles.recorder}>
        <View style={styles.recorder.thirdCircle}>
          <Image style={{position: 'absolute', width: '100%', height: '100%'}} source={require('../../../images/a_green2.png')} />    
              <RecorderIcon color={styles.mainColors.lightGreen}/>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Recorder;
