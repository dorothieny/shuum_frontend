import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity, Image, Button } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Audio } from 'expo-av';

const StyledImage = styled.Image`
  height: 100px;
  width: 100px;
`

const HomeScreen = ({ navigation }) => {
    const [state, setState] = useState();
    const [isLoading, setIsLoading]=useState(true);
    const [sound, setSound] = useState();

   const fetchSoundCards = () => {
    axios.get('http://localhost:3000/api/v1/soundcards/').then((r) => {
      setState(r.data.data)
    }).finally(() => {
      setIsLoading(false)
    })
   }
  
  const playSound = async(link) => {
    // alert.m](link);
    // alert(`http://localhost:3000${link}`)
    const sound = new Audio.Sound()
    await sound.loadAsync({
      uri: `http://localhost:3000${link}`
  })
  
  await sound.playAsync()
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

    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);
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
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Player", {id: item.id})}>
                      <StyledImage 
                      source={{uri: `http://localhost:3000${item?.image?.url}`}}
                      />
                        <Text>{sliceName(item.name)}</Text>
                        <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
                    </TouchableOpacity>
                  <Button title='Play' onPress={() => playSound(item?.audiofile?.url)} />
                </View>
              )
            }} />
         )}
       </> 
    )
}
export default HomeScreen;