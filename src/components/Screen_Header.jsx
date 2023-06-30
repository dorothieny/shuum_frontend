import { Text, View, TouchableOpacity } from "react-native";
import { navigation } from "@react-navigation/native";
import BackIcon from "../icons/A_BackIcon";
import LogoIcon from "../icons/A_Logo";
import { useEffect } from "react";
const styles = require("../Styles");
import MoreIcon from "../icons/A_MoreIcon";
import DropdownComponent from "./Dropdown";

const ScreenHeader = (props) => {
  const getTitle = (label) => {
    switch (label) {
      case "Лента":
        return <LogoIcon />;
      case "Вход":
        return <Text></Text>;
      case "Регистрация":
        return <Text></Text>;
      case "Профиль":
        return <Text style={styles.topBar.text}>@{props.named}</Text>;
      default:
        return <Text style={styles.topBar.text}>{label}</Text>;
    }
  };

  function handleBackButtonClick() {
    try {
      if(props.route.name === "Редактирование") {
        props.navigation?.navigate("Профиль");
      } else if(props.route.name === "Теги"){
        props.navigation?.navigate("Рекордер", { open: true });
      } else {
        props.navigation?.goBack();
      }
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
        {props.route.name !== "Лента" &&
        props.route.name !== "Профиль" &&
        props.route.name !== "Поиск" ? (
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
        <View style={{ position: "relative", height: "auto", width: 25 }}>
          {props.route.name === "Профиль" || props.route.name === "Редактирование" ? (
            <DropdownComponent
              data={props.dropdownItems}
              label=""
              icon={<MoreIcon />}
            />
          ) : (
            <Text style={{ width: 25 }} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ScreenHeader;
