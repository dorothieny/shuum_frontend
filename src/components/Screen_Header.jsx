import { Text,View, TouchableOpacity } from "react-native";
import {navigation} from "@react-navigation/native"
import BackIcon from "../icons/A_BackIcon";
const styles = require("../Styles");



const ScreenHeader = (props) => {
    function handleBackButtonClick() {
        try {
          props.navigation?.goBack();
          return true;
        } catch {
          return;
        }
      }
  return (
    <View
      style={styles.topBar}
    >
      <TouchableOpacity
              accessibilityRole="button"
              onPress={handleBackButtonClick}
            >
              <BackIcon />
            </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          alert("Right");
        }}
      >
        <Text>Center</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          alert("Right");
        }}
      >
        <Text>Right</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScreenHeader;