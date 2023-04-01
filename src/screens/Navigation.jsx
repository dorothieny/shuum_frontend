import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Home";
import SearchScreen from "./Search";
import PlayerScreen from "./Player";
import LoginScreen from "./Authorizarion";
import PopularNewScreen from "./PopularNewScreen";
import ProfileScreen from "./Profile";
import ProfileEditScreen from "./ProfileEditScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabBar from "../components/TabBar";
import ScreenHeader from "../components/Screen_Header";
import { StatusBar } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const styles = require("../Styles");
import RecorderScreen from "./Recorder";


const theme = {
  colors: {
    background: styles.mainColors.green,
  },
};

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const { username, userId } = useSelector((state) => state.main);

  // useEffect(() => {
  //   alert(username);
  // }, [username])

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
        // alert(JSON.stringify(r.data.user));
        dispatch({
          type: "SET_MAIN_REDUCER",
          payload: { userId: r.data.user.id, username: r.data.user.name },
        });
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  const authToken = () => {
    AsyncStorage.getItem("id_token", (err, result) => {
      setToken(result);
      console.log(result);
    });
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          screenOptions={{ headerShown: true }}
          initialRouteName={"Лента"}
          tabBar={(props) => (userId ? <MyTabBar {...props} /> : <></>)}
          tabBarOptions={{
            activeTintColor: "white",
            style: {
              backgroundColor: "transparent",
            },
          }}
        >
          {userId ? (
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
                name="Рекордер"
                component={RecorderScreen}
                options={{
                  title: "Рекордер",
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
                name="Редактирование"
                component={ProfileEditScreen}
                options={{
                  title: "Редактирование",
                  header: (props) => (
                    <ScreenHeader
                      {...props}
                      dropdownItems={[
                        {
                          label: "Выйти",
                          value: "Exit",
                          onChange: (v) => alert(v),
                        },
                      ]}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Профиль"
                component={ProfileScreen}
                options={{
                  title: "Профиль",
                  header: (props) => (
                    <ScreenHeader
                      {...props}
                      named={username || "Профиль"}
                      dropdownItems={[
                        {
                          label: "Изменить",
                          value: "Edit",
                          onChange: () => props?.navigation?.navigate("Редактирование"),
                        },
                        {
                          label: "Поделиться профилем",
                          value: "Share",
                          onChange: () => null,
                        },
                        {
                          label: "Выйти",
                          value: "Exit",
                          onChange: () => {
                            AsyncStorage.removeItem("id_token");
                            setToken(null);
                               dispatch({
                              type: "SET_MAIN_REDUCER",
                              payload: { userId: null},
                            });

                            axios.delete("http://localhost:3000/api/v1/users/sign_out", {
                              headers: {
                                Authorization: `${token}`,
                              },
                            })
                            props.navigation.navigate({ name: "Лента"});
                          
                            // Promise.resolve()
                            // .then(() => {
                            //   AsyncStorage.removeItem("id_token");
                           
                            // })
                            // .then(() => {
                            //    
                            // })
                            
                           
                           
                          }
                        },
                      ]}
                    />
                  ),
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
