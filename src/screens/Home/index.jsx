import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';

const HomeScreen = ({ navigation }) => {
    const [state, setState] = useState();
    const [isLoading, setIsLoading]=useState(true);

   const fetchSoundCards = () => {
    axios.get('http://localhost:3000/api/v1/soundcards/').then((r) => {
      setState(r.data.data)
    }).finally(() => {
      setIsLoading(false)
    })
   }
  
   const sliceName = (name) => {
    if(name.length >= 50) {
      return name.substring(0, 50) + "..."
    } else {
      return name
    }
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
                <TouchableOpacity onPress={() => navigation.navigate("Player", {id: item.id})}>
                    <Text>{sliceName(item.name)}</Text>
                    <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
                </TouchableOpacity>
              )
            }} />
         )}
       </> 
    )
}
export default HomeScreen;