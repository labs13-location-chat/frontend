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
    createBottomTabNavigator,
} from 'react-navigation';

// const AppStack = createStackNavigator({
//     'Landing': { screen: Landing },
//     'JoinChat': { screen: JoinChat }
//     },
//     {
//         initialRouteName: 'Landing',
        // headerLayoutPreset: 'center',
        // defaultNavigationOptions: {
        //     headerTitleStyle: {
        //         color: 'black',
        //         fontSize: 20,
        //         fontWeight: '400',
        //     },
        //     headerStyle: {
        //         backgroundColor: 'white',
        //     },
        //     // headerLeft: <View></View>
        // },
//     }
// )
const Landings = createStackNavigator({
    'Landing': { screen: Landing },
    },
        {
        navigationOptions: {
            tabBarLabel: 'Settings',
        },
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerTitleStyle: {
                color: 'black',
                fontSize: 20,
                fontWeight: '400',
            },
            headerStyle: {
                backgroundColor: 'white',
            },
            // headerLeft: <View></View>
        },
    }
)

const JoinChats = createStackNavigator({
    'JoinChat': { screen: JoinChat },
    },
        {
        navigationOptions: {
            tabBarLabel: 'Join Chat',
        },
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerTitleStyle: {
                color: 'black',
                fontSize: 20,
                fontWeight: '400',
            },
            headerStyle: {
                backgroundColor: 'white',
            },
            // headerLeft: <View></View>
        },
    }
)

const tabNavigator = createBottomTabNavigator({ JoinChats, Landings },
    {
        tabBarOptions: {
            labelStyle: {
                color: 'white',
                fontSize: 14,
                fontWeight: '600'
            },
            style: {
                height: 60,
                padding: 5,
                backgroundColor: '#3EB1D6',
            }
        }
    }
)

// const cat = createStackNavigator({
//     "JoinChat": { screen: JoinChat }
// })

// const AuthStack = createStackNavigator({
//     'Login': { screen: Login },
//     'Register': { screen: Register }
//     },
//     {
//         initialRouteName: 'Login',
//         headerLayoutPreset: 'center',
//         defaultNavigationOptions: {
//             headerTitleStyle: {
//                 color: 'black',
//                 fontSize: 20,
//                 fontWeight: '400',
//             },
//             headerStyle: {
//                 backgroundColor: 'white',
//             },
//             // headerLeft: <View></View>
//         },
//     }
// )

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
const LocalChat = createAppContainer(tabNavigator)
export default LocalChat;