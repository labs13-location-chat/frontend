import React from 'react';

import Setting from './BottomTabs/Setting';
import JoinChat from './chatroom/JoinChat';
import Login from './Authenticate/Login';
import Register from './Authenticate/Register';
import ChatMap from '../components/chatroom/ChatMap';
import Camera from './BottomTabs/Camera';
import MyProfile from './BottomTabs/MyProfile';
import MenuSettings from './BottomTabs/Settings';
import Notifications from './BottomTabs/Notifications';
import Icon from 'react-native-vector-icons/Ionicons';
import { AsyncStorage, View, Text } from 'react-native';
import MessageRoom from './chatroom/messages/MessageRoom';
import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
	createBottomTabNavigator
} from 'react-navigation';

const Settings = createStackNavigator(
	{
		// Setting: { screen: Setting },
		MyProfile: { screen: MyProfile }
		// MenuSettings: { screen: MenuSettings },
		// Notifications: { screen: Notifications }
	},
	{
		navigationOptions: {
			tabBarLabel: 'Profile',
			tabBarIcon: <Icon name='md-settings' size={25} />
		},
		// initialRouteName: 'Setting',
		headerLayoutPreset: 'center',
		defaultNavigationOptions: {
			headerTitleStyle: {
				color: 'white',
				fontSize: 20,
				fontWeight: '400'
			},
			headerStyle: {
				backgroundColor: '#3EB1D6'
			}
			// headerLeft: <View></View>
		}
	}
);

const JoinChats = createStackNavigator(
	{
		JoinChat: { screen: JoinChat },
		Chatroom: { screen: MessageRoom }
	},
	{
		navigationOptions: {
			tabBarLabel: 'Chat',
			tabBarIcon: <Icon name='md-chatboxes' size={25} />
		},
		headerLayoutPreset: 'center',
		defaultNavigationOptions: {
			headerTitleStyle: {
				color: 'white',
				fontSize: 20,
				fontWeight: '400'
			},
			headerStyle: {
				backgroundColor: '#3EB1D6'
			}
			// headerLeft: <View></View>
		}
	}
);

const Cameras = createStackNavigator(
	{
		Camera: { screen: Camera }
	},
	{
		navigationOptions: {
			tabBarLabel: 'Camera',
			tabBarIcon: <Icon name='md-camera' size={25} />
		},
		headerLayoutPreset: 'center',
		defaultNavigationOptions: {
			headerTitleStyle: {
				color: 'black',
				fontSize: 20,
				fontWeight: '400'
			},
			headerStyle: {
				backgroundColor: 'white'
			}
			// headerLeft: <View></View>
		}
	}
);

const tabNavigator = createBottomTabNavigator(
	{ JoinChats, Cameras, Settings },
	{
		tabBarOptions: {
			activeTintColor: '#3EB1D6',
			labelStyle: {
				// color: 'white',
				fontSize: 14,
				fontWeight: '600'
			},
			keyboardHidesTabBar: true,
			style: {
				height: 50,
				padding: 5
				// backgroundColor: '#3EB1D6',
			}
		}
	}
);

const LoginScreen = createStackNavigator({
	Login: { screen: Login }
});

const LocalChat = createAppContainer(
	createSwitchNavigator(
		{
			AuthCheck: LoginScreen,
			App: tabNavigator
		}
		// {
		//     initialRouteName: 'AuthCheck',
		// }
	)
);
// const cat = createStackNavigator({
//     "ChatApp": { screen: ChatApp },
// })

// const LocalChat = createAppContainer(cat)
export default LocalChat;
