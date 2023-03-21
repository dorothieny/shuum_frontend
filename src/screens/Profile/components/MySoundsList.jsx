import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";

import SearchInput from "../../../components/SearchInput";
const styles = require("../../../Styles");
import TrackInList from "../../PopularNewScreen/components/TrackInList";

const MySoundsList = ({ route }) => {
  const { scrollY, scrollHeight, data, navigation } = route.params;
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  console.log(data);
  const cleanStorage = () => {};

  return (
    <FlatList
      style={{
        backgroundColor: styles.mainColors.green,
        height: "110%",
        borderRadius: 12,
      }}
      data={data}
      renderItem={({ item, index }) => {
        return (
          <View>
            <TrackInList item={item} navigation={navigation} />
          </View>
        );
      }}
      onScroll={(e) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y);
        scrollHeight.setValue(
          e.nativeEvent.contentOffset.y > 200
            ? 200
            : e.nativeEvent.contentOffset.y
        );
      }}
      ListHeaderComponent={
        <SearchInput
          clicked={clicked}
          setClicked={setClicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
      }
      stickyHeaderIndices={[0]}
    />
  );
};

export default MySoundsList;
