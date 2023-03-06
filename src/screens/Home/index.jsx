import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
const styles = require("../../Styles");
import deviceStorage from "../../sevice/deviceStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DynamicFeed from "./components/DynamicFeed";
import HorizontalNewsPopular from "./components/HorizontalNewsPopular";

const HomeScreen = ({ navigation }) => {
  const [state, setState] = useState([1, 2, 3]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = () => {
    axios
      .get("http://localhost:3000/api/v1/user/")
      .then((r) => {
        // alert(JSON.stringify(r))
      })
      .then(() => {
        setIsLoading(false);
      });
  };

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

  const authToken = () => {
    AsyncStorage.getItem("id_token", (err, result) => {
      console.log(result);
    });
  };

  const sliceName = (name) => {
    if (name.length >= 50) {
      return name.substring(0, 50) + "...";
    } else {
      return name;
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const mock = [
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
        <FlatList
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isLoading}
          //     onRefresh={fetchUser}
          //   />
          // }
          style={styles.app}
          data={mock}
          renderItem={({item, i}) => {
            return <DynamicFeed item={item} key={i} />;
          }}
        />
      )}
    </>
  );
};
export default HomeScreen;
