import {
    FlatList,
    View,
    Text,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  const styles = require("../../../Styles");
import axios from "axios";
import { useSelector } from "react-redux";
import { TagLarge } from "../../../components/TagLarge";
import { NothingFound } from "./NothingFound";
import { useDispatch } from "react-redux";
import { processStringArray } from "../../../helpers/processStringArray";

export const TagList = ({ isSelect = false}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataTags, setDataTags] = useState([]);
  const { search, tags = [] } = useSelector((state) => state.main);
    const dispatch = useDispatch();

  useEffect(() => {
    fetchTags(search);
   }, [search])

  const fetchTags = (value) => {
    setIsLoading(true);
    if(value){ 
      axios
      .get(`http://localhost:3000/api/v1/tags/?starts_with=${value}`)
      .then((r) => {
        setDataTags(r.data);
        console.log(r.data)
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      axios
      .get("http://localhost:3000/api/v1/tags")
      .then((r) => {
        setDataTags(r.data);
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
      ) : dataTags.length ? (
        <FlatList
          style={{ ...styles.app, backgroundColor: styles.mainColors.white, paddingHorizontal: 16 }}
          data={dataTags}
          renderItem={({ item, index }) => {
            return (
              <View
                key={index+Math.random(0,dataTags.length)}
                style={
                  index == dataTags.length - 1
                    ? { paddingBottom: 150, paddingTop: 8 }
                    : index == 0
                    ? { marginTop: 16 }
                    : {paddingTop: 8}
                }
              >
                <TouchableOpacity
                    accessibilityRole="button"
                    onPress={() => {
                        if(isSelect){
                            dispatch({
                                type: "SET_MAIN_REDUCER",
                                payload: { tags: processStringArray(item.tagname, tags) },
                              });
                        }
                    }}
                >
                <TagLarge name={item.tagname} />
                </TouchableOpacity>
              </View>
            );
          }}
        /> ) : <NothingFound />
      }
    </>
  );
}