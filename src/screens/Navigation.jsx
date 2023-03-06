import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Home";
import SearchScreen from "./Search";
import PlayerScreen from "./Player";
import PopularNewScreen from "./PopularNewScreen";
import ProfileScreen from "./Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabBar from "../components/TabBar";
import ScreenHeader from "../components/Screen_Header";

const styles = require("../Styles");

const theme = {
  colors: {
    background: styles.mainColors.green,
  },
};
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={{ headerShown: true }}
        initialRouteName="Главная"
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={{
          activeTintColor: "white",
          style: {
            backgroundColor: "transparent",
          },
        }}
      >
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
