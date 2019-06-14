import React from 'react';

import Setting from './BottomTabs/Setting';
import JoinChat from './chatroom/JoinChat'
import Login from './Authenticate/Login';
import Register from './Authenticate/Register';
import ChatMap from '../components/chatroom/ChatMap';
import Camera from './BottomTabs/Camera';
import MyProfile from './BottomTabs/MyProfile';
import ChatApp from '../components/chatroom/twilio/ChatApp';
import Icon from 'react-native-vector-icons/Ionicons';

import { AsyncStorage, View, Text } from 'react-native';
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
} from 'react-navigation';

const Settings = createStackNavigator({
    'Setting': { screen: Setting },
    'MyProfile': { screen: MyProfile },
    },
    {
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: <Icon name="md-settings" size={25}/>
        },
        initialRouteName: 'Setting',
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerTitleStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: '400',
            },
            headerStyle: {
                backgroundColor: '#3EB1D6',
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
            tabBarIcon: <Icon name="md-chatboxes" size={25}/>
        },
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerTitleStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: '400',
            },
            headerStyle: {
                backgroundColor: '#3EB1D6',
            },
            // headerLeft: <View></View>
        },
    }
)

const Cameras = createStackNavigator({
    'Camera': { screen: Camera },
    },
    {
        navigationOptions: {
            tabBarLabel: 'Camera',
            tabBarIcon: <Icon name="md-camera" size={25}/>
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

const tabNavigator = createBottomTabNavigator({ JoinChats, Cameras, Settings },
    {
        tabBarOptions: {
            activeTintColor: '#3EB1D6',
            labelStyle: {
                // color: 'white',
                fontSize: 14,
                fontWeight: '600'
            },
            style: {
                height: 60,
                padding: 5,
                // backgroundColor: '#3EB1D6',
            }
        }
    }
)

const LoginScreen = createStackNavigator({
    "Login": { screen: Login }
})

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
const LocalChat = createAppContainer(createSwitchNavigator (
    {
        AuthCheck: LoginScreen,
        App: tabNavigator,
    },
    // {
    //     initialRouteName: 'AuthCheck',
    // }
))
// const cat = createStackNavigator({
//     "ChatApp": { screen: ChatApp },
// })

// const LocalChat = createAppContainer(cat)
export default LocalChat;