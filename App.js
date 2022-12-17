import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';

const MainContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    `;

export default function App() {
  const [state, setState] = useState();
  const [isLoading, setIsLoading]=useState(true);

 const fetchSoundCards = () => {
  setIsLoading(true)
  axios.get('http://localhost:3000/api/v1/soundcards/').then((r) => {
    setState(r.data.data)
  }).finally(() => {
    setIsLoading(false)
  })
 }

  useEffect(() => {
    fetchSoundCards()
  }, [])

  return (
    <MainContainer>
      {/* <ActivityIndicator size="large"/> */}
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
      <StatusBar style="auto" />
    </MainContainer>
  );
}