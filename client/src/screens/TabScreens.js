import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "./Feed";
import Search from "./Search";
import Profile from "./Profile";
import Splash from "./Splash";
import Welcome from "./Welcome";
import { black, gray, icon_unselected, primary } from "../../assets/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Log from "./Log";
import Entry from "./Entry";
import Register from "./Register";
import Login from "./Login";
import Restaurant from "./Restaurant";
import Friends from "./Friends";
import Setting from "./Setting";
import BackButton from "../components/BackButton";
import IconButton from "../components/IconButton";
import AcceptFriends from "./AcceptFriends";
import Chat from "./Chat";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BackComponent = ({ navigation }) => {
    return <BackButton navigation={navigation} />;
};

const CustomComponent = ({ navigation }) => {
    return (
        <>
            <IconButton
                icon_name="user-friends"
                screen="Friends"
                navigation={navigation}
            />
            <IconButton
                icon_name="comment"
                screen="Chat"
                navigation={navigation}
            />
            <IconButton
                icon_name="cog"
                screen="Setting"
                navigation={navigation}
            />
        </>
    );
};

const backOption = ({ navigation }) => ({
    title: "Chomped Up",
    headerStyle: {
        backgroundColor: "black",
        color: "white",
    },
    headerLeft: () => <BackComponent navigation={navigation} />,
    headerRight: () => <CustomComponent navigation={navigation} />,
});

const customOption = ({ navigation }) => ({
    title: "Chomped Up",
    headerStyle: {
        backgroundColor: "black",
        color: "white",
    },
    headerTitleStyle: {
        fontFamily: "Lora_600SemiBold",
        color: "white",
    },
    headerRight: () => <CustomComponent navigation={navigation} />,
});

const TabScreen = () => {
    // Stack Screens
    const HomeStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Feed"
                    component={Feed}
                    options={customOption}
                />
                <Stack.Screen
                    name="Restaurant"
                    component={Restaurant}
                    options={backOption}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={backOption}
                />
            </Stack.Navigator>
        );
    };

    const ExploreStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Search"
                    component={Search}
                    options={customOption}
                />
                <Stack.Screen
                    name="Restaurant"
                    component={Restaurant}
                    options={backOption}
                />
            </Stack.Navigator>
        );
    };

    const UserStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={customOption}
                />
                <Stack.Screen
                    name="Restaurant"
                    component={Restaurant}
                    options={backOption}
                />
            </Stack.Navigator>
        );
    };

    const TabNavigator = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "Explore") {
                            iconName = "zoom-in";
                        } else if (route.name === "User") {
                            iconName = "person";
                        }
                        return (
                            <View
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    transform: [{ translateY: -5 }],
                                }}>
                                <Icon
                                    name={iconName}
                                    color={focused ? primary : icon_unselected}
                                    size={40}
                                />
                            </View>
                        );
                    },
                    tabBarStyle: [
                        {
                            position: "absolute",
                            bottom: 30,
                            left: 20,
                            right: 20,
                            elevation: 0,
                            backgroundColor: black,
                            height: 80,
                            borderRadius: 20,
                            borderTopWidth: 0,
                        },
                    ],
                    tabBarActiveTintColor: primary,
                    tabBarInactiveTintColor: gray,
                    tabBarShowLabel: false,
                })}>
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Explore"
                    component={ExploreStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="User"
                    component={UserStack}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Tab"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Entry"
                    component={Entry}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Friends"
                    component={Friends}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AcceptFriends"
                    component={AcceptFriends}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Setting"
                    component={Setting}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Log"
                    component={Log}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                    options={backOption}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default TabScreen;
