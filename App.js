import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import HomeScreen from './src/screens/Home';
import Navigation from './src/screens/Navigation';


export default function App() {
  return <Navigation />
}