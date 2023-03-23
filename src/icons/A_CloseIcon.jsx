import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
const CloseIcon = ({ color = "#F5F5F5", ...restProps }) => {

  return (
    <TouchableOpacity onPress={restProps?.onPress}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M18.75 5.25L5.25 18.75M5.25 5.25L18.75 18.75"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default CloseIcon;
