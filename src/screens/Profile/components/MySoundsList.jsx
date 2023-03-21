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

const MySoundsList = ({ route }) => {
  const { scrollY, scrollHeight } = route.params;
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const cleanStorage =() => {

  }
  
  return (
    <FlatList
      style={{
        backgroundColor: styles.mainColors.green,
        height: "110%",
        borderRadius: 12,
      }}
      data={[1, 2, 3, 4, 5, 6]}
      renderItem={({ item, index }) => {
        return (
          <>
            <View
              style={{
                backgroundColor: "red",
                width: "100%",
                height: 200,
                marginBottom: 12,
                borderTopLeftRadius: index === 0 && 12,
                borderTopRightRadius: index === 0 && 12,
              }}
            >
              <Button
                title={"cleanStorage"}
                onPress={() => cleanStorage()}
              />
            </View>
          </>
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
