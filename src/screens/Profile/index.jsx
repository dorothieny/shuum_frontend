import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import axios from "axios";
import { useSelector } from "react-redux";
import MyTabBar from "./components/Tabs";
const styles = require("../../Styles");
import FavouritesList from "./components/FavouritesList";
import MySoundsList from "./components/MySoundsList";
import { SelectCountry } from "react-native-element-dropdown";
import DropdownComponent from "../../components/Dropdown";

const Tab = createMaterialTopTabNavigator();

const scrollHeight = new Animated.Value(300);

const scrollheightInt = scrollHeight.interpolate({
  inputRange: [0, 200],
  outputRange: [200, 0],
});

const scrollY = new Animated.Value(0);
const translateY = scrollY.interpolate({
  inputRange: [0, 200],
  outputRange: [0, -300],
});

const ProfileScreen = ({ navigation }) => {
  const { userId } = useSelector((state) => state.main);
  const [profile, setProfile] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/${userId}`)
      .then((response) => {
        setProfile(response.data.user);
        setCount(response.data.count);
      })
      .catch((err) => {
        // alert(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/${userId}/following`)
      .then((r) => {
        setFollowing(r.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/${userId}/followed`)
      .then((r) => {
        setFollowed(r.data);
      });
  }, []);

  return (
    <>
      <View style={{ overflow: "hidden" }}>
        <Animated.View
          style={{
            height: scrollheightInt,
            transform: [{ translateY: translateY }],
          }}
        >
          <View style={styles.profile.card}>
            <Image
              style={{
                ...styles.profile.avatar,
                backgroundColor: styles.mainColors.black,
              }}
              source={{ uri: `http://localhost:3000${profile?.avatar?.url}` }}
            />
            <Text>@{profile?.name}</Text>
            <Text>Шумов {count}</Text>
            <Text>Подписчики {followed?.length}</Text>
            <Text>Подписки {following?.length}</Text>
          </View>
        </Animated.View>
      </View>
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        initialRouteName={"My"}
        tabBarPosition={"top"}
      >
        <Tab.Screen
          name="My"
          initialParams={{scrollY: scrollY, scrollHeight: scrollHeight}}
          component={MySoundsList}
        />
        <Tab.Screen
          name="Fav"
          initialParams={{scrollY: scrollY, scrollHeight: scrollHeight}}
          component={FavouritesList}
        />
      </Tab.Navigator>
    </>
  );
};

export default ProfileScreen;
