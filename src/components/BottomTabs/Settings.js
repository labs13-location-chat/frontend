import React from 'react';

import { View, Text } from 'react-native';

export default class MenuSettings extends React.Component {
	static navigationOptions = {
		title: 'Settings',
		headerTransparent: true
	};

	render() {
		return (
			<View>
				<Text>Settings Screen</Text>
			</View>
		);
	}
}
