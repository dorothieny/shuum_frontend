import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
const styles = require("../../../Styles");
import TrackInList from "../../PopularNewScreen/components/TrackInList";
import axios from "axios";
import { useSelector } from "react-redux";
import { NothingFound } from "./NothingFound";

const ListSounds = ({ route = {} }) => {
  const { navigation } = route?.params;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const { search } = useSelector((state) => state.main);

  useEffect(() => {
    fetchSoundCards(search);
   }, [search])
 
   const fetchSoundCards = (value) => {
     setIsLoading(true);
     if(value) { 
     axios
       .get(`http://localhost:3000/api/v1/soundcards/?starts_with=${value}`)
       .then((r) => {
         setData(r.data);
         console.log(r.data)
       })
       .finally(() => {
         setIsLoading(false);
       });
     } else {
       axios
       .get("http://localhost:3000/api/v1/soundcards")
       .then((r) => {
         setData(r.data);
         console.log(r.data)
       })
       .finally(() => {
         setIsLoading(false);
       });
     }
    
   };

  // useEffect(() => {
  //   Promise.resolve()
  //     .then(() => {
  //       setIsLoading(true);
  //     })
  //     .then(() => {
  //       setLocalData(list);
  //     })
  //     .then(() => {
  //       setIsLoading(false);
  //     });
  // }, [list]);

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
      ) : data ? (
        <FlatList
          style={{ ...styles.app, backgroundColor: styles.mainColors.white }}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View
                key={index+Math.random(0,data.length)}
                style={
                  index == data.length - 1
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
        /> ) : <NothingFound />
      
      }
    </>
  );
};
export default ListSounds;
