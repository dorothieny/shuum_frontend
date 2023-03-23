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
import MyAdditableTabBar from "../../components/Tabs";
const styles = require("../../Styles");
import FavouritesList from "./components/FavouritesList";
import MySoundsList from "./components/MySoundsList";

const Tab = createMaterialTopTabNavigator();

const scrollHeight = new Animated.Value(0);

const scrollheightInt = scrollHeight.interpolate({
  inputRange: [0, 250],
  outputRange: [250, 0],
});

const scrollY = new Animated.Value(0);
const translateY = scrollY.interpolate({
  inputRange: [0, 250],
  outputRange: [0, -300],
});

const ProfileScreen = ({ navigation }) => {
  const { userId } = useSelector((state) => state.main);
  const [profile, setProfile] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [count, setCount] = useState(0);
  const [created, setCreated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/${userId}`)
      .then((response) => {
        setProfile(response.data.user);
        setCount(response.data.count);
        setIsLoading(false);
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
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
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
                  source={{
                    uri: `http://localhost:3000${profile?.avatar?.url}`,
                  }}
                />
                {/* <Text style={{color: styles.mainColors.white}}>@{profile?.name}</Text> */}
                <Text style={{color: styles.mainColors.white, marginTop: 30}}>Шумов {count}</Text>
                <Text style={{color: styles.mainColors.white}}>Подписчики {followed?.length}</Text>
                <Text style={{color: styles.mainColors.white}}>Подписки {following?.length}</Text>
              </View>
            </Animated.View>
          </View>
          <Tab.Navigator
            tabBar={(props) => <MyAdditableTabBar {...props} />}
            initialRouteName={"My"}
            tabBarPosition={"top"}
          >
            <Tab.Screen
              name="Мои саундскейпы"
              initialParams={{
                scrollY: scrollY,
                scrollHeight: scrollHeight,
                navigation: navigation,
                userId: userId
              }}
              component={MySoundsList}
            />
            <Tab.Screen
              name="Избранное"
              initialParams={{ scrollY: scrollY, scrollHeight: scrollHeight, navigation: navigation,
                userId: userId }}
              component={FavouritesList}
            />
          </Tab.Navigator>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
