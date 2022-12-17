import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native"
import axios from "axios";

const SearchScreen = () => {
    const [state, setState] = useState();
    const [isLoading, setIsLoading]=useState(true);

   const fetchSoundCards = () => {
    axios.get('http://localhost:3000/api/v1/users/').then((r) => {
      setState(r.data.data)
    }).finally(() => {
      setIsLoading(false)
    })
   }
    useEffect(() => {
      fetchSoundCards()
    }, [])

    return (
       <>
       {isLoading ? (
         <View>
          <ActivityIndicator size="large"/>
         </View>
         ) : (
        <FlatList 
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchSoundCards}/>}
            style={{backgroundColor: 'lightgray'}} 
            data={state} 
            renderItem={({item, i}) => {
              return (
                <TouchableOpacity>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
              )
            }} />
         )}
       </>
    )
}
export default SearchScreen;