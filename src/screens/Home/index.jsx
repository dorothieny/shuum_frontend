import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DynamicFeed from "./components/DynamicFeed";
import {useSelector} from 'react-redux';
const styles = require("../../Styles");


const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const {userId} = useSelector(state => state.main)

  const fetchUser = () => {
    // alert(userId)

    axios
      .get("http://localhost:3000/api/v1/user/")
      .then((r) => {
        // alert(JSON.stringify(r));
      })
      .then(() => {
        setIsLoading(false);
      });
  };
useEffect(() => {
    fetchUser();
  }, []);

  const mock = [
    {
      type: "recorder",
      title: "Проигрыватель",
    },
    {
      type: "news",
      title: "Новое",
    },
    {
      type: "track_of_day",
      title: "Звук дня",
    },
    {
      type: "subscriptions",
      title: "Подписки",
    },
    {
      type: "popular",
      title: "Популярное",
    },
  ];

  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchUser} />
          }
          style={styles.app}
          data={mock}
          renderItem={({item, index}) => {
            return (
              <View style={ index !== 0 && {
                paddingBottom: styles.feedBlock.betweenGap, 
                backgroundColor: styles.mainColors.white,
                paddingTop: 16,
                paddingLeft: 16,
                paddingRight: 16,
                }}>
                <DynamicFeed item={item} key={index}/>
              </View>
            );
          }}
        /></>
      )}
    </>
  );
};
export default HomeScreen;
