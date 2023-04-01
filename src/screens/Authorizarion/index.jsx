import {
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Button
} from "react-native";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const styles = require("../../Styles");
import ScreenHeader from "../../components/Screen_Header";
import SearchInput from "../../components/SearchInput";


const HomeStack = createNativeStackNavigator();
// "daria@email.com"
// "mypassword"
const signInFetch = (email, password) => {
    axios
      .post("http://localhost:3000/api/v1/users/sign_in", {
        user: { email: email.toLowerCase(), password: password.toLowerCase() },
      })
      .then((r) => {
        AsyncStorage.setItem("id_token", r.headers.authorization);
      });
  };

const A = ({ navigation }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Вход", { par: "ssfd" })}
      >
        <Text style={{...styles.button, paddingTop: 500 }}>Вход</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Регистрация")}>
        <Text style={{...styles.button, paddingTop: 8 }}>Регистрация</Text>
      </TouchableOpacity>
    </>
  );
};

const B = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked2, setClicked2] = useState(false);
  const [searchPhrase2, setSearchPhrase2] = useState();
  
  return (
    <TouchableOpacity>
      <Text style={styles.button}>Вход</Text>
      
  <SearchInput
              placeholder = {"Почта"}
              search={false}
              isLight= {false}
              clicked={clicked}
              setClicked={setClicked}
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
            />
            <SearchInput
              isPassword = {true}
              placeholder = {"Пароль"}
              search={false}
              isLight= {false}
              clicked={clicked2}
              setClicked={setClicked2}
              searchPhrase={searchPhrase2}
              setSearchPhrase={setSearchPhrase2}
            />
             <Button title={"Войти"} disabled={!searchPhrase && !searchPhrase2} onPress={() => {
              navigation.navigate({name: "Лента"})
              signInFetch(searchPhrase, searchPhrase2)}} />
    </TouchableOpacity>
  );
};

const C = ({ navigation }) => {
  return <Text style={styles.button}>Регистрация</Text>;
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
