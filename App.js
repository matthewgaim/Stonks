import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainPage from "./src/screens/MainPage";

const navigator = createStackNavigator(
    {
        Main: MainPage
    },
    {
        initialRouteName: 'Main',
        defaultNavigationOptions:{
            title: 'Stonks'
        }
    }
);

const App = createAppContainer(navigator);

export default createAppContainer(navigator);