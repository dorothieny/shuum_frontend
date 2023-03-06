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


const PopularNewScreen = ({ navigation }) => {
  const [state, setState] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchSoundCards = () => {
    axios
      .get("http://localhost:3000/api/v1/soundcards/")
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
          style={styles.app}
          data={state}
          renderItem={({ item, i }) => {
            return (
              <View>
                <TrackInList item={item} navigation={navigation} />
              </View>
            );
          }}
        />
      )}
    </>
  );
};
export default PopularNewScreen;
