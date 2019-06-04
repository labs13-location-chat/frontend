import React from 'react';

import Landing from '../components/Landing';
import JoinChat from './chatroom/JoinChat'
import Login from './Authenticate/Login';
import Register from './Authenticate/Register';
import ChatMap from '../components/chatroom/ChatMap'

import { AsyncStorage, View, Text } from 'react-native';
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
} from 'react-navigation';

const AppStack = createStackNavigator({
    'Landing': { screen: Landing }
    // 'Join a Chat Room': { screen: JoinChat }
})

const cat = createStackNavigator({
    "Join a Chat Room": { screen: JoinChat }
})

const map = createStackNavigator({
    "Map": { screen: ChatMap }
})

// const AuthStack = createStackNavigator({
//     'Log in': { screen: Login },
//     'Register': { screen: Register }
// })

// class AuthLoading extends React.Component {
//     constructor() {
//         super();
//         this.fetchToken();
//     }

//     fetchToken = async () => {
//         const token = await AsyncStorage.getItem("token");
//         this.props.navigation.navigate(token ? 'App' : "Auth");
//     };

//     render() {
//         return (
//             <View>
//                 <Text>
//                     Loading app....
//                 </Text>
//             </View>
//         )
//     }
// }

// const LocalChat = createAppContainer(createSwitchNavigator (
//     {
//         AuthCheck: AuthLoading,
//         App: AppStack,
//         Auth: AuthStack,
//     },
//     {
//         initialRouteName: 'AuthCheck',
//     }
// ))
const LocalChat = createAppContainer(cat)

export default LocalChat;