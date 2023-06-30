import {
    FlatList,
    View,
    Text,
    ActivityIndicator,
    RefreshControl,
    Image
  } from "react-native";
  import React, { useState, useEffect } from "react";
  const styles = require("../../../Styles");
  import TrackInList from "../../PopularNewScreen/components/TrackInList";
import axios from "axios";
import { useSelector } from "react-redux";
import { TagLarge } from "../../../components/TagLarge";
import { NothingFound } from "./NothingFound";

export const UsersList = ({ route = {} }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataUsers, setDataUsers] = useState([]);
  const { search } = useSelector((state) => state.main);
  useEffect(() => {
    fetchUsers(search);
   }, [search])

  const fetchUsers = (value) => {
    setIsLoading(true);
    if(value){ 
      axios
      .get(`http://localhost:3000/api/v1/users/?starts_with=${value}`)
      .then((r) => {
        setDataUsers(r.data);
        console.log(r.data)
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      axios
      .get("http://localhost:3000/api/v1/users")
      .then((r) => {
        setDataUsers(r.data);
        console.log(r.data)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  }

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
      ) : 
         dataUsers.length ?(
        <FlatList
          style={{ ...styles.app, backgroundColor: styles.mainColors.white, paddingHorizontal: 16 }}
          data={dataUsers}
          renderItem={({ item, index }) => {
            return (
              <View
                key={index+Math.random(0,dataUsers.length)}
                style={
                  index == dataUsers.length - 1
                    ? { paddingBottom: 150, paddingTop: 8, ...styles.usersList }
                    : index == 0
                    ? { marginTop: 16, ...styles.usersList }
                    : {paddingTop: 8, ...styles.usersList}
                }
              >
                <Image style={{width: 40, height: 40, marginRight: 8, backgroundColor: styles.mainColors.green}} source={{uri: `http://localhost:3000${item?.avatar?.url}`}}/>
                <Text style={{...styles.textes.h2, textAlign: 'left'}}>@{item.name}</Text>
              </View>
            );
          }}
        />) : 
        <NothingFound />
      }
    </>
  );
}