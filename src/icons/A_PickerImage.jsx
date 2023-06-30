import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
export const PickerImage = () => {
    return (
        <View>
           <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15 5.49707L21.9946 5.49707" stroke="#247C5D" strokeWidth="2"/>
            <Path d="M18.4973 1.99979L18.4973 8.99435" stroke="#247C5D" strokeWidth="2"/>
            <Path d="M12 5H3V21H19V12" stroke="#247C5D" strokeWidth="2"/>
            <Circle cx="11" cy="13" r="3" stroke="#247C5D" strokeWidth="2"/>
            </Svg>

        </View>
    )
}