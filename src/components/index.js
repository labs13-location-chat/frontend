import React from 'react'
import Setting from './BottomTabs/Setting';
import JoinChat from './chatroom/JoinChat';
import Login from './Authenticate/Login';
import Register from './Authenticate/Register';
import ChatMap from '../components/chatroom/ChatMap';
import Camera from './BottomTabs/Camera';
import MyProfile from './BottomTabs/MyProfile';
import MenuSettings from './BottomTabs/Settings';
import Notifications from './BottomTabs/Notifications';
import CreateChatroom from './chatroom/CreateChatroom'
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
		// navigationOptions: {
		// 	tabBarLabel: 'Profile',
		// 	tabBarIcon: <Icon name='md-settings' size={25} />
		// },
		initialRouteName: 'MyProfile',
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

const Chats = createStackNavigator(
	{
		JoinChat: { screen: JoinChat },
		Chatroom: { screen: MessageRoom }
	},
	{
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

const Create = createStackNavigator(
	{
		CreateChatroom: { screen: CreateChatroom }
	},
	{
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
	{ Chats, Create, Settings },
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let IconComponent = Icon;
				let iconName;
				if (routeName === 'Chats') {
					iconName = `md-chatboxes`;
				} else if (routeName === 'Create') {
					iconName = `md-add-circle-outline`;
				} else if (routeName === 'Settings') {
					iconName = 'md-settings';
				}
				return (
					<IconComponent
						name={iconName}
						size={25}
						color={tintColor}
					/>
				);
			}
		}),
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
Chats.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.index > 0) {
		tabBarVisible = false;
	}

	return {
		tabBarVisible
	};
};

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
export default LocalChat;