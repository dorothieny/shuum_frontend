import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const styles = require("../../Styles");
import ScreenHeader from "../../components/Screen_Header";


const HomeStack = createNativeStackNavigator();

const signInFetch = () => {
    axios
      .post("http://localhost:3000/api/v1/users/sign_in", {
        user: { email: "daria@email.com", password: "mypassword" },
      })
      .then((r) => {
        console.log(r.headers.authorization);
        AsyncStorage.setItem("id_token", r.headers.authorization);
      });
  };

const A = ({ navigation }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Вход", { par: "ssfd" })}
      >
        <Text style={{ paddingTop: 500 }}>Вход</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Регистрация")}>
        <Text>Регистрация</Text>
      </TouchableOpacity>
    </>
  );
};

const B = ({ navigation }) => {
  return (
    <TouchableOpacity
    onPress={() => signInFetch()}
    >
      <Text>Вход</Text>
    </TouchableOpacity>
  );
};

const C = ({ navigation }) => {
  return <Text>Регистрация</Text>;
};
const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Ав"
          component={A}
          options={{
            title: "Авторизация",
            header: (props) => <></>,
          }}
        />
        <HomeStack.Screen
          name="Вход"
          component={B}
          options={{
            title: "Вход",
            header: (props) => <ScreenHeader {...props} />,
          }}
        />
        <HomeStack.Screen
          name="Регистрация"
          component={C}
          options={{
            title: "Регистрация",
            header: (props) => <ScreenHeader {...props} />,
          }}
        />
      </HomeStack.Navigator>
    </>
  );
};
export default LoginScreen;
