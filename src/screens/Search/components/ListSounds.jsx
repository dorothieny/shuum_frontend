import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
const styles = require("../../../Styles");
import TrackInList from "../../PopularNewScreen/components/TrackInList";

const ListSounds = ({ route = {} }) => {
  const { list, navigation, searchPhrase } = route?.params;
  const [isLoading, setIsLoading] = useState(true);
  const [localData, setLocalData] = useState([]);



  useEffect(() => {
    Promise.resolve()
      .then(() => {
        setIsLoading(true);
      })
      .then(() => {
        setLocalData(list);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [list]);

  return (
    <>
      {isLoading ? (
        <View
          style={{
            backgroundColor: styles.mainColors.white,
            height: "150%",
            borderRadius: 12,
            paddingTop: 24,
            paddingLeft: 16,
            paddingRigth: 16,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          style={{ ...styles.app, backgroundColor: styles.mainColors.white }}
          data={localData}
          renderItem={({ item, index }) => {
            return (
              <View
                key={index}
                style={
                  index == localData.length - 1
                    ? { paddingBottom: 150 }
                    : index == 0
                    ? { marginTop: 16 }
                    : {}
                }
              >
                <TrackInList item={item} navigation={navigation} />
              </View>
            );
          }}
        />
      
      )}
    </>
  );
};
export default ListSounds;
