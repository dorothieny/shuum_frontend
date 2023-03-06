import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native"
import axios from "axios";

const PlayerScreen = ({ route }) => {
    const [state, setState] = useState();
    const [isLoading, setIsLoading]=useState(true);
    const {id} = route.params;

   const fetchSoundCards = () => {
    axios.get('http://localhost:3000/api/v1/soundcards/').then((r) => {
      setState(r.data.filter(item => item.id === id)[0])
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
        <View>
            <Text>{state.name}</Text>
        </View>
         )}
       </>
    )
}
export default PlayerScreen;