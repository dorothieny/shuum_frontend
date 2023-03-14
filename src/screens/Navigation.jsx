import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Home";
import SearchScreen from "./Search";
import PlayerScreen from "./Player";
import LoginScreen from "./Authorizarion";
import PopularNewScreen from "./PopularNewScreen";
import ProfileScreen from "./Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabBar from "../components/TabBar";
import ScreenHeader from "../components/Screen_Header";
import { StatusBar } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const styles = require("../Styles");

const theme = {
  colors: {
    background: styles.mainColors.green,
  },
};

const Tab = createBottomTabNavigator();



const Navigation = () => {
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    authToken();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [token]);

  const fetchUser = () => {
    axios
      .get("http://localhost:3000/api/v1/user/", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((r) => {
        // alert(JSON.stringify(r.data));
        dispatch({type: "SET_MAIN_REDUCER", payload: { userId: r.data.id}})
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  const authToken = () => {
    AsyncStorage.getItem("id_token", (err, result) => {
      // alert(result);
      setToken(result);
    });
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          screenOptions={{ headerShown: true }}
          initialRouteName={"Главная"}
          tabBar={(props) => <MyTabBar {...props} />}
          tabBarOptions={{
            activeTintColor: "white",
            style: {
              backgroundColor: "transparent",
            },
          }}
        >
          {token ? (
            <>
              <Tab.Screen
                name="Лента"
                component={HomeScreen}
                options={{
                  title: "Лента",
                  header: (props) => <ScreenHeader {...props} />,
                }}
              />
              <Tab.Screen
                name="Популярное"
                component={PopularNewScreen}
                options={{
                  title: "Популярное",
                  header: (props) => <ScreenHeader {...props} />,
                }}
              />
              <Tab.Screen
                name="Новое"
                component={PopularNewScreen}
                options={{
                  title: "Новое",
                  header: (props) => <ScreenHeader {...props} />,
                }}
              />
              <Tab.Screen
                name="Поиск"
                component={SearchScreen}
                options={{
                  title: "Поиск",
                  header: (props) => <ScreenHeader {...props} />,
                }}
              />
              <Tab.Screen
                name="Профиль"
                component={ProfileScreen}
                options={{
                  title: "Профиль",
                  header: (props) => <ScreenHeader {...props} />,
                }}
              />
            </>
          ) : (
            <>
              <Tab.Screen
                name="Авторизация"
                component={LoginScreen}
                options={{
                  title: "Авторизация",
                  header: (props) => <></>,
                }}
              />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
