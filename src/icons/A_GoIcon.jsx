import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
const GoIcon = () => {
  return (
    <View>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M4 20L20 4M20 4H4M20 4V20"
          stroke="#247C5D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default GoIcon;
