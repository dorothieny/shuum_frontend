import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
    Animated,
    StyleSheet,
  } from "react-native";
  import SearchInput from "../../../components/SearchInput";
const styles = require("../../../Styles");
import axios from "axios";
import TrackInList from "../../PopularNewScreen/components/TrackInList";

const FavoritesList = ({route}) => {
  const { scrollY, scrollHeight, navigation, userId } = route?.params;
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data,  setData] = useState([]);

  useEffect(() => {
    if(userId) {
      axios
      .get(`http://localhost:3000/api/v1/users/${userId}/liked`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {});
    }
  }, [userId]);

//   useEffect(() => {
//     setIsLoading(true);
//     searchForShums(searchPhrase);
//   }, [searchPhrase])

// const searchForShums = (searchPhrase) => {
//   if(userId) {
//      axios.get(`http://localhost:3000/api/v1/soundcards/?multiple=${searchPhrase}&user=${userId}`)
//   .then((r) => {
//     setIsLoading(false);
//     setData(r.data)
//   })
//   }
 
// }
    return (
      <>
      {isLoading ? (
          <View style={{
            backgroundColor: styles.mainColors.white,
            height: "150%",
            borderRadius: 12,
            paddingTop: 24,
            paddingLeft: 16,
            paddingRigth: 16,
          }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
          style={{
            backgroundColor: styles.mainColors.white,
            height: "150%",
            borderRadius: 12,
            paddingLeft: 16,
            paddingRigth: 16,
          }}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={index == (data.length - 1) ? {paddingBottom: 150} : ((index == 0) ? {marginTop: 16} : {})}> 
                <TrackInList item={item} navigation={navigation} />
              </View>
            );
          }}
          onScroll={(e) => {
            scrollY.setValue(1.5*e.nativeEvent.contentOffset.y);
            scrollHeight.setValue(
              e.nativeEvent.contentOffset.y > 250
                ? 250
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
        /> )}
      </>
    )
}

export default FavoritesList;