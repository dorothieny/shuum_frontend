import { Text, View, TouchableOpacity } from "react-native";
import { navigation } from "@react-navigation/native";
import BackIcon from "../icons/A_BackIcon";
import LogoIcon from "../icons/A_Logo";
import { useEffect } from "react";
const styles = require("../Styles");

const ScreenHeader = (props) => {
  useEffect(() => {
    console.log(props.route);
  }, []);

  const getTitle = (label) => {
    switch (label) {
      case "Лента":
        return <LogoIcon />;
      case "Вход":
        return <Text></Text>;
      case "Регистрация":
        return <Text></Text>;
      default:
        return <Text style={styles.topBar.text}>{label}</Text>;
    }
  };

  function handleBackButtonClick() {
    try {
      props.navigation?.goBack();
      return true;
    } catch {
      return;
    }
  }
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={handleBackButtonClick}
      >
        {props.route.name !== "Лента" ? (
          <BackIcon />
        ) : (
          <Text style={{ width: 25 }} />
        )}
      </TouchableOpacity>

      <TouchableOpacity accessibilityRole="button" onPress={() => null}>
        {getTitle(props.route.name)}
        {/* <LogoIcon/> */}
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={{ width: 25 }} />
      </TouchableOpacity>
    </View>
  );
};

export default ScreenHeader;
