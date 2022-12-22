import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import HomeScreen from "./Home";
import SearchScreen from "./Search"
import PlayerScreen from "./Player";
import styled from "styled-components/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from "./Profile";

const MainContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    `;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Navigation = () => {
    return (
        <>
        {/* <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{title: "Лента"}}/>
                <Stack.Screen name="Search" component={SearchScreen} options={{title: "Поиск"}}/>
                <Stack.Screen name="Player" component={PlayerScreen} options={{title: "Сейчас звучит"}}/>
            </Stack.Navigator>
        </NavigationContainer> */}
        <NavigationContainer>
        <Tab.Navigator>
                <Tab.Screen name="Лента" component={HomeScreen} options={{title: "Лента"}}/>
                <Tab.Screen name="Поиск" component={SearchScreen} options={{title: "Поиск"}}/>
                <Tab.Screen name="Профиль" component={ProfileScreen} options={{title: "Профиль"}}/>
            </Tab.Navigator>
        </NavigationContainer>
        </>
        
    )
}

export default Navigation;