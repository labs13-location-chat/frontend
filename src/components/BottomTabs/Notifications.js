import React from 'react';

import { View, Text } from 'react-native';

export default class Notifications extends React.Component {
	static navigationOptions = {
		title: 'Notifications',
		headerTransparent: true
	};

	render() {
		return (
			<View>
				<Text>Notifications Screen</Text>
			</View>
		);
	}
}
