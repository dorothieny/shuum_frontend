import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const RecorderIcon = () => {
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
          d="M22 12V13.2222C22 18.6223 17.5228 23 12 23C6.47715 23 2 18.6223 2 13.2222V12M12 18.1111C9.23858 18.1111 7 15.9223 7 13.2222V5.88889C7 3.18883 9.23858 1 12 1C14.7614 1 17 3.18883 17 5.88889V13.2222C17 15.9223 14.7614 18.1111 12 18.1111Z"
          stroke="#F5F5F5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};
export default RecorderIcon;
