import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
const MoreIcon = () => {
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
          d="M5 12C5 12.825 5.675 13.5 6.5 13.5C7.325 13.5 8 12.825 8 12C8 11.175 7.325 10.5 6.5 10.5C5.675 10.5 5 11.175 5 12ZM16 12C16 12.825 16.675 13.5 17.5 13.5C18.325 13.5 19 12.825 19 12C19 11.175 18.325 10.5 17.5 10.5C16.675 10.5 16 11.175 16 12ZM10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5C11.175 10.5 10.5 11.175 10.5 12Z"
          fill="white"
        />
      </Svg>
    </View>
  );
};

export default MoreIcon;
