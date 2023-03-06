import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
const BackIcon = () => {
  return (
    <View>
      <Svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M24.3137 13.0007H1.68629M1.68629 13.0007L13 24.3145M1.68629 13.0007L13 1.68704"
          stroke="#F5F5F5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export default BackIcon;
