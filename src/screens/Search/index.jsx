import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Image } from "react-native"
import axios from "axios";
import SearchInput from "../../components/SearchInput";
import styled from 'styled-components/native';


const AvatarThumb = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 50%
  margin-right: 8px;
`
const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
`

const SearchScreen = () => {
    const [state, setState] = useState();
    const [isLoading, setIsLoading]=useState(true);
    const [clicked, setClicked] = useState(false);
    const [searchPhrase,setSearchPhrase] = useState('');
   
    const fetchSoundCards = (id) => {
    const url = id ? `http://localhost:3000/api/v1/users/?starts_with=${id.toLowerCase()}` : 'http://localhost:3000/api/v1/users/'
    axios.get(url).then((r) => {
      setState(r.data.data)
    }).finally(() => {
      setIsLoading(false)
    })
   }

    useEffect(() => {
      fetchSoundCards(searchPhrase)
      // alert(searchPhrase)
    }, [searchPhrase])



    return (
       <>
       {isLoading ? (
         <View>
          <ActivityIndicator size="large"/>
         </View>
         ) : (
        <>
        <SearchInput clicked={clicked} setClicked={setClicked} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase}/>
        <FlatList 
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
            }} />
        </>
         )}
       </>
    )
}
export default SearchScreen;