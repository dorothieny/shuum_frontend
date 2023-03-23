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


const Tab = createMaterialTopTabNavigator();

const SearchScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
   fetchSoundCards();
  }, [])

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

  useEffect(() => {
    fetchSoundCards(searchPhrase);
    // console.log(searchPhrase)
    // alert(searchPhrase)
  }, [searchPhrase]);

  {
    /* <FlatList 
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchSoundCards}/>}
            style={{backgroundColor: 'lightgray'}} 
            data={state} 
            renderItem={({item, i}) => {
              return (
                <TouchableOpacity>
                  <FlexRow>
                    <AvatarThumb source={{uri: `http://localhost:3000${item?.avatar?.thumb?.url}`}}/>
                    <Text>{item.name}</Text>
                  </FlexRow>
                </TouchableOpacity>
              )
            }} /> */
  }

  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <SearchInput
            clicked={clicked}
            setClicked={setClicked}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            isLight={false}
          />
          <Tab.Navigator
            tabBar={(props) => <MyAdditableTabBar {...props} />}
            initialRouteName={"My"}
            tabBarPosition={"top"}
          >
            <Tab.Screen
              name="Звуки"
              initialParams={{
                list: data,
                navigation: navigation,
                searchPhrase: searchPhrase,
              }}
              component={ListSounds}
            />
            <Tab.Screen name="Теги" 
            initialParams={{
              list: data,
              navigation: navigation,
              searchPhrase: searchPhrase,
            }}
            component={ListSounds} />
            <Tab.Screen
              name="Люди"
              initialParams={{
                list: data,
                navigation: navigation,
                searchPhrase: searchPhrase,
              }}
              component={ListSounds}
            />
            <Tab.Screen
              name="Места"
              initialParams={{
                list: data,
                navigation: navigation,
                searchPhrase: searchPhrase,
              }}
              component={ListSounds}
            />
          </Tab.Navigator>
        </>
      )}
    </>
  );
};
export default SearchScreen;
