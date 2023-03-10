import { View, Text } from "react-native";
import { useEffect, useState } from "react";
const styles = require("../../../Styles");
import RecorderIcon from "../../../icons/A_RecorderIcon";

const Recorder = () => {
  return (
    <>
      <View style={styles.recorder}>
        <View style={styles.recorder.thirdCircle}>
          <View style={styles.recorder.secondCircle}>
            <View style={styles.recorder.circle}>
              <RecorderIcon />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
export default Recorder;
