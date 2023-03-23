import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import TrackInList from "./components/TrackInList";
const styles = require("../../Styles");


const PopularNewScreen = ({ navigation, route }) => {
  const [state, setState] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getRouteParam = (name) => {
    switch (name) {
        case "Новое":
          return "newest";
        case "Популярное":
          return "popular";
        default:
          return "soundcards";
      }
  }

  const fetchSoundCards = () => {
    axios
      .get(`http://localhost:3000/api/v1/${getRouteParam(route.name)}/`)
      .then((r) => {
        setState(r.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchUser = () => {
    axios.get("http://localhost:3000/api/v1/user/").then((r) => {
      // alert(JSON.stringify(r))
    });
  };


  useEffect(() => {
    fetchSoundCards();
    fetchUser();
  }, []);


  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchSoundCards}
            />
          }
          style={{...styles.app, backgroundColor: styles.mainColors.white}}
          data={state}
          renderItem={({ item, index }) => {
            return (
              <View>
                <TrackInList key={index+Math.random(0, state.lenght)} item={item} navigation={navigation} />
              </View>
            );
          }}
        />
      )}
    </>
  );
};
export default PopularNewScreen;
