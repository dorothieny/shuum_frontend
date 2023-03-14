import { FlatList, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import HomeScreen from './src/screens/Home';
import Navigation from './src/screens/Navigation';
import { initStore } from "./src/sevice/redux/store";
import { Provider } from "react-redux";

const store = initStore();

export default function App() {
  return <Provider store={store}><Navigation/></Provider> 
}