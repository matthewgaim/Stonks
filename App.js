import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainPage from "./src/screens/MainPage";
import ShowStock from "./src/screens/ShowStock";
import Signup from "./src/screens/Signup";
import Signin from "./src/screens/Signin";
import Placeholder from "./src/screens/Placeholder";

import {Provider as StockProvider} from "./src/context/StockContext";
import {Provider as AuthProvider} from "./src/context/AuthContext";

const navigator = createSwitchNavigator({
    Placeholder: Placeholder,
    Auth: createStackNavigator({
        Signup: Signup,
        Signin: Signin,
    }),
    Main: MainPage,
    Stock: ShowStock,
});

const App = createAppContainer(navigator);

export default () => {
    return (
        <AuthProvider>
            <StockProvider>
                <App />
            </StockProvider>
        </AuthProvider>
    );
};