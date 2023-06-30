import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import SearchInput from "../../components/SearchInput";
const styles = require("../../Styles");
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListSounds from "./components/ListSounds";
import MyAdditableTabBar from "../../components/Tabs";
import TrackInList from "../PopularNewScreen/components/TrackInList";
import { TagList } from "./components/TagsLits";
import { useSelector } from "react-redux";
const Tab = createMaterialTopTabNavigator();
import { useDispatch } from "react-redux";
import { UsersList } from "./components/UsersList";

const SearchScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataTags, setDataTags] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch({
        type: "SET_MAIN_REDUCER",
        payload: { search: searchPhrase },
        })
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchPhrase])

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_MAIN_REDUCER",
        payload: { search: "" },
        })
    }
  }, [])

  return (
        <>
          <SearchInput
            clicked={clicked}
            setClicked={setClicked}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            isLight={false}
          />
          {
        <>
          <Tab.Navigator
            tabBar={(props) => <MyAdditableTabBar {...props} />}
            initialRouteName={"Звуки"}
            tabBarPosition={"top"}
          >
            <Tab.Screen
              name="Звуки"
              initialParams={{
                navigation: navigation,
                searchPhrase: searchPhrase,
              }}
              component={ListSounds}
            />
            <Tab.Screen name="Теги" 
            initialParams={{
              navigation: navigation,
              searchPhrase: searchPhrase,
            }}
            component={TagList} />
            <Tab.Screen
              name="Люди"
              initialParams={{
                navigation: navigation,
                searchPhrase: searchPhrase,
              }}
              component={UsersList}
            />
            <Tab.Screen
              name="Места"
              initialParams={{
                navigation: navigation,
                searchPhrase: searchPhrase,
              }}
              component={ListSounds}
            />
          </Tab.Navigator>
        </>
      }
    </>
  );
};
export default SearchScreen;
