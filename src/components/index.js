import React from 'react';

import Landing from '../components/Landing';
import Login from './Authenticate/Login';
import Register from './Authenticate/Register';

import { AsyncStorage, View, Text } from 'react-native';
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
} from 'react-navigation';

const AppStack = createStackNavigator({
    'Landing': { screen: Landing },
})

const AuthStack = createStackNavigator({
    'Log in': { screen: Login },
    'Register': { screen: Register }
})

class AuthLoading extends React.Component {
    constructor() {
        super();
        this.fetchToken();
    }

    fetchToken = async () => {
        const token = await AsyncStorage.getItem("token");
        this.props.navigation.navigate(token ? 'App' : "Auth");
    };

    render() {
        return (
            <View>
                <Text>
                    Loading app....
                </Text>
            </View>
        )
    }
}

const LocalChat = createAppContainer(createSwitchNavigator (
    {
        AuthCheck: AuthLoading,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthCheck',
    }
))
export default LocalChat;