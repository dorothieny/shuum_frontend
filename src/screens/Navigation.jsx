import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import HomeScreen from "./Home";
import SearchScreen from "./Search"
import PlayerScreen from "./Player";
import styled from "styled-components/native";

const MainContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    `;

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{title: "Лента"}}/>
                <Stack.Screen name="Search" component={SearchScreen} options={{title: "Поиск"}}/>
                <Stack.Screen name="Player" component={PlayerScreen} options={{title: "Сейчас звучит"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;